'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface TokenResponse {
  access_token?: string;
  error?: string;
  [key: string]: any;
}

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [data, setData] = useState<TokenResponse | null>(null);

  useEffect(() => {
    if (code) {
      fetch("/api/digilocker-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((json) => setData(json));
    }
  }, [code]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Authenticating with DigiLocker...</h2>
      {data && (
        <pre style={{ whiteSpace: "pre-wrap", textAlign: "left", maxWidth: "600px", margin: "auto" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
