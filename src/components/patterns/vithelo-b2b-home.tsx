import type { VitheloB2BHomeContent } from "@/content/schema";
import { VitheloMarketStage } from "@/components/patterns/vithelo-market-stage";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";

type VitheloB2BHomeProps = {
  content: VitheloB2BHomeContent;
};

type RequiredMedia = VitheloB2BHomeContent["gummy"]["media"];

function MediaRequirement({ media }: { media: RequiredMedia }) {
  return (
    <div
      aria-label={`${media.label}; ${media.width} by ${media.height} ${media.format}`}
      className={styles.media}
      data-media-status={media.status}
      role="img"
    >
      <span>
        {media.label} · {media.width} × {media.height} · {media.format}
      </span>
    </div>
  );
}

function VitheloB2BHome({ content }: VitheloB2BHomeProps) {
  const [formulaStrategy, sensoryDesign, packagingFit, projectReview] =
    content.development.notes;

  return (
    <main className={styles.homepage} data-content-status={content.dataStatus}>
      <section
        aria-labelledby="hero-title"
        className={styles.hero}
        data-media-status={content.hero.media.status}
        id="hero"
      >
        <div className={styles.heroMaterial} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.heroContent} data-testid="hero-copy">
          <div className={styles.heroEyebrow}>{content.hero.eyebrow}</div>
          <h1 id="hero-title">{content.hero.title}</h1>
          <p>{content.hero.copy}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={content.hero.primaryAction.href}>
              {content.hero.primaryAction.label}
            </a>
            <a className={styles.secondaryAction} href={content.hero.secondaryAction.href}>
              {content.hero.secondaryAction.label}
            </a>
          </div>
        </div>
        <p className={styles.heroAssetNote}>
          {content.hero.media.label} · {content.hero.media.width} × {content.hero.media.height} · {content.hero.media.format}
        </p>
      </section>

      <section aria-label="Manufacturing proof points" className={styles.proof} id="proof">
        <dl className={styles.proofGrid}>
          {content.proof.map((item) => (
            <div className={styles.proofItem} key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                {item.value}
                {item.suffix ? <span>{item.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="gummy-title" className={styles.section} id="gummy-stage">
        <p className={styles.kicker}>{content.gummy.kicker}</p>
        <h2 className={styles.title} id="gummy-title">
          {content.gummy.title}
        </h2>
        <div className={styles.rule} />
        <MediaRequirement media={content.gummy.media} />
        <div className={styles.featureRail}>
          {content.gummy.features.map((feature, index) => (
            <article key={feature.title}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <VitheloMarketStage market={content.market} />

      <section
        aria-labelledby="dosage-title"
        className={`${styles.section} ${styles.dosageSection}`}
        data-layout="desktop-4x2"
        id="dosage-forms"
      >
        <p className={styles.kicker}>{content.dosage.kicker}</p>
        <h2 className={styles.title} id="dosage-title">
          {content.dosage.title}
        </h2>
        <p className={styles.copy}>{content.dosage.qualifier}</p>
        <div className={styles.dosageGrid} data-testid="dosage-grid">
          {content.dosage.items.map((item, index) => (
            <article className={styles.dosageItem} data-testid="dosage-item" key={item.name}>
              <div aria-hidden="true" className={styles.dosageShape} data-shape={index + 1} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.moq}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="development-title"
        className={`${styles.section} ${styles.darkSection}`}
        id="custom-development"
      >
        <p className={styles.kicker}>{content.development.kicker}</p>
        <h2 className={styles.title} id="development-title">
          {content.development.title}
        </h2>
        <div className={styles.blueprint}>
          <div>
            {[formulaStrategy, sensoryDesign].map((note) => (
              <article className={styles.note} key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.copy}</p>
              </article>
            ))}
          </div>
          <div className={styles.blueprintCore}>
            <div>
              <span className={styles.index}>YOUR PRODUCT</span>
              <h3>{content.development.coreTitle}</h3>
              <p>{content.development.coreCopy}</p>
            </div>
          </div>
          <div>
            {[packagingFit, projectReview].map((note) => (
              <article className={styles.note} key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="manufacturing-title" className={styles.section} id="manufacturing">
        <p className={styles.kicker}>{content.manufacturing.kicker}</p>
        <h2 className={styles.title} id="manufacturing-title">
          {content.manufacturing.title}
        </h2>
        <MediaRequirement media={content.manufacturing.media} />
        <div className={styles.ledger}>
          {content.manufacturing.metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-title" className={styles.section} id="quality">
        <p className={styles.kicker}>{content.quality.kicker}</p>
        <h2 className={styles.title} id="quality-title">
          {content.quality.title}
        </h2>
        <div className={styles.qualityDocument}>
          <div className={styles.qualityIntro}>
            <p className={styles.kicker}>Batch Quality Record</p>
            <h3>{content.quality.recordTitle}</h3>
            <p className={styles.copy}>{content.quality.caveat}</p>
          </div>
          <div className={styles.qualityRows}>
            {content.quality.rows.map((row) => (
              <article className={styles.qualityRow} key={row.title}>
                <strong>{row.title}</strong>
                <span>{row.copy}</span>
                <em>{row.state}</em>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="runway-title"
        className={`${styles.section} ${styles.darkSection}`}
        id="project-runway"
      >
        <p className={styles.kicker}>{content.runway.kicker}</p>
        <h2 className={styles.title} id="runway-title">
          {content.runway.title}
        </h2>
        <div className={styles.runway}>
          {content.runway.steps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="channels-title" className={styles.section} id="company-fit">
        <p className={styles.kicker}>{content.channels.kicker}</p>
        <h2 className={styles.title} id="channels-title">
          {content.channels.title}
        </h2>
        <div className={styles.channelNetwork}>
          {content.channels.paths.map((path, index) => (
            <article className={styles.channelPath} data-path={index + 1} key={path.label}>
              <span className={styles.index}>{path.label}</span>
              <h3>{path.title}</h3>
              <p className={styles.copy}>{path.copy}</p>
            </article>
          ))}
          <div className={styles.channelNode}>
            VITHELO
            <br />
            Factory Partner
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-title"
        className={`${styles.section} ${styles.contactSection}`}
        data-contact-state={content.contact.status}
        id="contact"
      >
        <p className={styles.kicker}>{content.contact.kicker}</p>
        <h2 className={styles.title} id="contact-title">
          {content.contact.title}
        </h2>
        <div className={styles.contactGrid}>
          <div>
            <p className={styles.copy}>{content.contact.copy}</p>
            <form className={styles.projectForm}>
              <div className={styles.formField}>
                <label htmlFor="project-name">Name / Company</label>
                <input id="project-name" name="name" placeholder="Your name and company" type="text" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="project-format">Dosage Format</label>
                <select defaultValue={content.contact.formats[0]} id="project-format" name="format">
                  {content.contact.formats.map((format) => (
                    <option key={format}>{format}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formField}>
                <label htmlFor="project-brief">Project Brief</label>
                <input
                  id="project-brief"
                  name="brief"
                  placeholder="Formula, packaging and estimated volume"
                  type="text"
                />
              </div>
              <button aria-describedby="contact-pending" disabled type="button">
                Inquiry submission not configured
              </button>
            </form>
          </div>
          <div>
            <a aria-label="Email" className={styles.contactLink} href="#contact-pending">
              Email <span aria-hidden="true">→</span>
            </a>
            <a aria-label="WhatsApp" className={styles.contactLink} href="#contact-pending">
              WhatsApp <span aria-hidden="true">→</span>
            </a>
            <div className={styles.pending} id="contact-pending">
              {content.contact.pendingMessage}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export { VitheloB2BHome, type VitheloB2BHomeProps };
