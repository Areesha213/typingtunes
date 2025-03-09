export async function GET() {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.typingtunes.com/sitemap.xml
`;

    return new Response(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
