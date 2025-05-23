import { glob } from "node:glob";
import path from "node:path";

export async function getPublicFiles(subdirectory) {
  const pattern = path.join(process.cwd(), "public", subdirectory, "**/*");
  const files = await glob(pattern, { nodir: true });

  return files.map((file) => {
    // Convert absolute path to relative public path
    const relativePath = path.relative(
      path.join(process.cwd(), "public"),
      file,
    );
    return "/" + relativePath.replace(/\\/g, "/"); // Ensure forward slashes
  });
}
