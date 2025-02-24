import { AuthConfig, nylas } from "@/lib/nylas";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: AuthConfig.clientId,
    redirectUri: AuthConfig.redirectUri,
  });

  return NextResponse.redirect(authUrl);
}
