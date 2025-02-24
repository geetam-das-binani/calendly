import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { AuthConfig, nylas } from "@/lib/nylas";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export  async function GET (req: NextRequest) {
  const session = await requireUser();

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code)
    return NextResponse.json(
      { error: "no code found in url" },
      { status: 400 }
    );

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: AuthConfig.apiKey,
      clientId: AuthConfig.clientId,
      code,
      redirectUri: AuthConfig.redirectUri,
    });

    const { grantId, email } = response;
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grantEmail: email,
        grantId,
      },
    });
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "error exchanging code for token" },
      { status: 500 }
    );
  }
}
