import { NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "./utils/i18n";
import withAuth from "next-auth/middleware";
import { NextRequestWithAuth } from "next-auth/middleware";

export function middleware(request: NextRequestWithAuth){
    const newLocaleURL = getLocaleUrlToRedirect(request);

    if(newLocaleURL){
        return NextResponse.redirect(newLocaleURL);
    }

    if (/\/[a-z]{2}\/user.*/.test(request.nextUrl.pathname)) {
        return withAuth(request);
      }
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};