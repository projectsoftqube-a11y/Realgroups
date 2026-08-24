import { NextResponse } from "next/server";

/**
 * Returns 410 Gone for WordPress URLs that have no equivalent on the new site.
 *
 * 410 rather than 404 on purpose: it tells Google the URL is permanently gone
 * and should be dropped from the index, which happens far faster than the
 * repeated re-crawling a 404 invites. These are all pages that should never
 * have been public:
 *
 *   /team/<name>          9 theme demo profiles (Lorem Ipsum, "Lexicon + Ion")
 *   /hello-world          the default WordPress post
 *   /category/*           the "Uncategorized" archive
 *   /author/*             the admin author archive
 *   /work-category/*      taxonomy terms duplicating the project names
 *   /journal-category/*   the same for brochures
 *
 * Note the matcher is `/team/:slug+`, not `/team` — /team is a real page.
 */
export function middleware() {
  return new NextResponse(
    "410 Gone — this page has been permanently removed.",
    { status: 410, headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

export const config = {
  matcher: [
    "/team/:slug+",
    "/hello-world",
    "/category/:path*",
    "/author/:path*",
    "/work-category/:path*",
    "/journal-category/:path*",
    "/comments/:path*",
    "/xmlrpc.php",
  ],
};
