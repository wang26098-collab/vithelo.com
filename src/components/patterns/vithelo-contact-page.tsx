import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BContactPage } from "@/content/schema";

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

  return (
    <main
      className={styles.page}
      data-contact-state={content.status}
      data-content-status={content.dataStatus}
    >
      <section className={styles.hero}>
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
            <span>Email</span>
            <strong>NOT_CONFIGURED</strong>
          </div>
          <div className={styles.contactRow}>
            <span>WhatsApp</span>
            <strong>NOT_CONFIGURED</strong>
          </div>
          <p id="contact-status">{content.pendingMessage}</p>
          <button disabled type="button">
            Inquiry submission not configured
          </button>
        </aside>
      </section>
    </main>
  );
}
