import { type APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog")

  return rss({
    title: "PHL Code Club Blog",
    description: "Event recaps, projects, and thoughts from the organizers of the PHL Code Club",
    site: context.site ?? "https://phlcode.club",
    items: posts.map(({ id, rendered, data: { title, pubDate, summary } }) => ({
      title,
      pubDate,
      description: summary,
      link: `/blog/${id}`,
      content: rendered?.html
    })),
    customData: `<language>en-us</language>`,
  });
}
