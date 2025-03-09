export async function GET() {
    const baseUrl = "https://www.typingtunes.com";

    const pages = [
        "/", "/about", "/contact", "/custom", "/challenges",
        "/lessons", "/privacy", "/terms"
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
            .map((page) => `<url><loc>${baseUrl}${page}</loc></url>`)
            .join("")}
    </urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
