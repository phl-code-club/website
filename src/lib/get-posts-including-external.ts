import { getCollection, type CollectionEntry } from "astro:content";
import Parser, { type Output } from "rss-parser";
const parser = new Parser();

type PostListItem = {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  summary?: string;
  author?: string | CollectionEntry<"organizers">;
  external: boolean;
};

type ExtraKeys = {
  url: string;
  author?: CollectionEntry<"organizers">;
};

export async function getPostsIncludingExternal() {
  const organizers = await getCollection("organizers").then((org) =>
    org.reduce<Record<string, any>>((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {}),
  );

  const external = await getCollection("external_blogs");
  const results = await Promise.allSettled(
    external.map((b) =>
      parser.parseURL(b.data.feedURL).then((result) => ({
        ...result,
        items: result.items.map((item) => ({
          ...item,
          url: b.data.feedURL,
          author: b.data.author && organizers[b.data.author.id],
        })),
      })),
    ),
  );
  const { success: feeds, error: feedErrors } = results.reduce<{
    success: Output<ExtraKeys>[];
    error: Error[];
  }>(
    (acc, curr, i) => {
      switch (curr.status) {
        case "fulfilled":
          acc.success.push(curr.value);
          break;
        case "rejected":
          acc.error.push(
            new Error(`Error fetching URL: ${external[i].data.feedURL}`, {
              cause: curr.reason,
            }),
          );
      }
      return acc;
    },
    { success: [], error: [] },
  );

  if (feedErrors.length > 0) {
    console.error(
      `There were ${feedErrors.length} error fetching external blogs: ${JSON.stringify(feedErrors)}`,
    );
  }

  const feedPosts = feeds
    .flatMap<Output<ExtraKeys>["items"][0]>((feed) => feed.items)
    .map<PostListItem | null>(
      ({ guid, title, link, pubDate, summary, creator, author }) =>
        guid && title && link && pubDate
          ? {
            id: guid,
            title,
            link,
            summary,
            pubDate: new Date(pubDate),
            external: true,
            author: author ?? creator,
          }
          : null,
    )
    .filter((item): item is PostListItem => !!item);

  // Get all entries from a collection.
  // Requires the name of the collection as an argument.
  const posts = await getCollection("blog").then((posts) =>
    posts
      .map<PostListItem>((p) => ({
        id: p.id,
        title: p.data.title,
        link: `/blog/${p.id}`,
        pubDate: p.data.pubDate,
        external: false,
        author: organizers[p.data.author.id],
      }))
      .concat(feedPosts)
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
  );
  return posts
}
