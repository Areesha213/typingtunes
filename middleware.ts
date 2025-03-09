import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    res.headers.set(
        "Content-Security-Policy",
        `default-src 'self'; 
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.typingtunes.com https://www.googletagmanager.com https://www.google-analytics.com; 
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
        font-src 'self' https://fonts.gstatic.com; 
        img-src 'self' data: https://www.google-analytics.com; 
        media-src 'self' https://files.freemusicarchive.org;
        connect-src 'self' https://www.google-analytics.com;`
    );

    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    return res;
}

export const config = {
    matcher: "/:path*",
};
