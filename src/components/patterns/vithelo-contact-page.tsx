import Link from "next/link";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BContactPage } from "@/content/schema";
import { siteConfig } from "@/content/site-config";
import { buildEmailInquiryUrl, buildWhatsAppInquiryUrl } from "@/lib/inquiry";

type Props = {
  content: B2BContactPage;
  initialFormat?: string;
  initialSubject?: string;
};

export function VitheloContactPage({
  content,
  initialFormat = content.formats[0],
  initialSubject = "",
}: Props) {
  const [name, email, market, format, formula, packaging, volume, brief] =
    content.fields;
  const inquiryContext = {
    cooperationType: "OEM / ODM project",
    productWorld: initialFormat,
    market: "Not provided",
    summary: initialSubject || "Please share your formula, packaging, volume and target timing.",
  };
  const emailConfig = siteConfig.contact.email;
  const whatsappConfig = siteConfig.contact.whatsapp;
  const emailHref =
    emailConfig.status === "CONFIGURED"
      ? buildEmailInquiryUrl(emailConfig.value, inquiryContext)
      : undefined;
  const whatsappHref =
    whatsappConfig.status === "CONFIGURED"
      ? buildWhatsAppInquiryUrl(whatsappConfig.e164, inquiryContext)
      : undefined;

  return (
    <main
      className={`${styles.page} ${styles.contactPage}`}
      data-contact-state="CONFIGURED"
      data-content-status={content.dataStatus}
      data-ui-stage="contact-premium-brief"
    >
      <section data-header-hero className={`${styles.hero} ${styles.contactHero}`}>
        <p className={styles.kicker}>{content.hero.kicker}</p>
        <h1>{content.hero.title}</h1>
        <p className={styles.lede}>{content.hero.copy}</p>
      </section>
      <section className={styles.contactGrid}>
        <fieldset
          aria-describedby="contact-status"
          aria-label="Project requirements"
          disabled
        >
          <label>
            {name}
            <input name="name" type="text" />
          </label>
          <label>
            {email}
            <input name="email" type="email" />
          </label>
          <label>
            {market}
            <input name="market" type="text" />
          </label>
          <label>
            {format}
            <select defaultValue={initialFormat} name="format">
              {content.formats.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            {formula}
            <input name="formula" type="text" />
          </label>
          <label>
            {packaging}
            <input name="packaging" type="text" />
          </label>
          <label>
            {volume}
            <input name="volume" type="text" />
          </label>
          <label>
            {brief}
            <textarea defaultValue={initialSubject} name="brief" />
          </label>
        </fieldset>
        <aside>
          <div className={styles.contactRow}>
            <a
              aria-label="Email"
              href={emailHref}
            >
              Email
            </a>
            <strong>{emailConfig.status}</strong>
          </div>
          <div className={styles.contactRow}>
            <a
              aria-label="WhatsApp"
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
            <strong>{whatsappConfig.status}</strong>
          </div>
          <p id="contact-status">
            Email and WhatsApp are available. The project brief form is not configured for submission.
          </p>
          <p>
            Not sure what to include?{" "}
            <Link href="/insights/what-information-to-include-in-an-rfq">
              Read the RFQ preparation guide.
            </Link>
          </p>
          <button disabled type="button">
            Inquiry submission not configured
          </button>
        </aside>
      </section>
    </main>
  );
}
