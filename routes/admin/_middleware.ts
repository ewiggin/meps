import { FreshContext } from '$fresh/server.ts';
import { getCookies } from '$std/http/cookie.ts';

export function handler(req: Request, ctx: FreshContext) {
    // Always login is excluded from cookies!
    if (req.url.includes('/admin/login')) {
        return ctx.next();
    }

    const cookies = getCookies(req.headers);
    if (!cookies || !cookies.auth) {
        return new Response('', {
            status: 303,
            headers: { Location: `/admin/login` },
        });
    }

    return ctx.next();
}
