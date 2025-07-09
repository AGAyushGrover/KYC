import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;

  const tokenURL = "https://digilocker.meripehchaan.gov.in/public/oauth2/1/token";
  const clientId = process.env.DIGILOCKER_CLIENT_ID!;
  const clientSecret = process.env.DIGILOCKER_CLIENT_SECRET!;
  const redirectUri = process.env.DIGILOCKER_REDIRECT_URI!;

  try {
    const tokenRes = await fetch(tokenURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Token exchange failed", details: err });
  }
}
