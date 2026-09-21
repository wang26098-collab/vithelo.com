"use client";

import { useEffect } from "react";
import Link from "next/link";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          background: "#f4f4f0",
          color: "#191b1a",
          fontFamily: "Arial, sans-serif",
          margin: 0,
        }}
      >
        <main
          aria-live="assertive"
          role="alert"
          style={{ margin: "0 auto", maxWidth: 720, padding: "18vh 24px" }}
        >
          <p style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            VITHELO
          </p>
          <h1>The site could not load</h1>
          <p>Try the page again or return to the home page.</p>
          <button onClick={reset} type="button">
            Try again
          </button>
          <Link href="/" style={{ marginLeft: 16 }}>
            Return home
          </Link>
        </main>
      </body>
    </html>
  );
}
