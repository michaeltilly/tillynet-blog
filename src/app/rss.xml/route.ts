import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = "https://blog.tillynet.com";

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.title} - TillyNet technical blog]]></description>
      ${post.frontmatter.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TillyNet</title>
    <link>${siteUrl}</link>
    <description>Network engineering portfolio, cloud infrastructure labs, and technical blog by Michael Tillman.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
