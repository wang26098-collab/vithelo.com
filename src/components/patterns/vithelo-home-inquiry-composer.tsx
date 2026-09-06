"use client";

import { useMemo, useState } from "react";
import { buildEmailInquiryUrl, buildWhatsAppInquiryUrl } from "@/lib/inquiry";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";

type VitheloHomeInquiryComposerProps = {
  email: string;
  formats: string[];
  whatsapp: string;
};

function VitheloHomeInquiryComposer({
  email,
  formats,
  whatsapp,
}: VitheloHomeInquiryComposerProps) {
  const [brand, setBrand] = useState("");
  const [format, setFormat] = useState(formats[0] ?? "Nutrition product");
  const [volume, setVolume] = useState("");
  const [market, setMarket] = useState("");
  const [summary, setSummary] = useState("");

  const inquiryContext = useMemo(
    () => ({
      cooperationType: "OEM / ODM project",
      productWorld: format,
      market: market || "Not provided",
      summary: [
        `Brand or company: ${brand || "Not provided"}`,
        `Estimated volume: ${volume || "Not provided"}`,
        `Project summary: ${summary || "Not provided"}`,
      ].join("\n"),
    }),
    [brand, format, market, summary, volume],
  );

  return (
    <form
      aria-label="Prepare a project inquiry"
      className={styles.inquiryComposer}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className={styles.inquiryFields}>
        <label>
          <span>Your brand or company</span>
          <input onChange={(event) => setBrand(event.target.value)} placeholder="e.g. Northstar Labs" value={brand} />
        </label>
        <label>
          <span>Dosage form</span>
          <select onChange={(event) => setFormat(event.target.value)} value={format}>
            {formats.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Estimated volume</span>
          <input onChange={(event) => setVolume(event.target.value)} placeholder="e.g. 50,000 packs" value={volume} />
        </label>
        <label>
          <span>Primary market</span>
          <input onChange={(event) => setMarket(event.target.value)} placeholder="Country or region" value={market} />
        </label>
        <label className={styles.inquirySummaryField}>
          <span>Project summary</span>
          <textarea onChange={(event) => setSummary(event.target.value)} placeholder="Formula direction, packaging and target timing" value={summary} />
        </label>
      </div>
      <div className={styles.inquiryComposerActions}>
        <a className={styles.primaryAction} href={buildEmailInquiryUrl(email, inquiryContext)}>
          Continue by Email
        </a>
        <a
          className={styles.secondaryInquiryAction}
          href={buildWhatsAppInquiryUrl(whatsapp, inquiryContext)}
          rel="noreferrer"
          target="_blank"
        >
          Continue on WhatsApp
        </a>
      </div>
      <p className={styles.inquiryPrivacy}>Your information is not stored on this website.</p>
    </form>
  );
}

export { VitheloHomeInquiryComposer, type VitheloHomeInquiryComposerProps };
