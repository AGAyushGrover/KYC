import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.DIGILOCKER_CLIENT_ID!;
  const redirectUri = process.env.DIGILOCKER_REDIRECT_URI!;
  const state = "demo-state";

  const authURL = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

  res.redirect(authURL);
}

