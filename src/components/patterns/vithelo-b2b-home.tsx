import type { VitheloB2BHomeContent } from "@/content/schema";
import Link from "next/link";
import { VitheloMarketStage } from "@/components/patterns/vithelo-market-stage";
import { VitheloHomeMotion } from "@/components/motion/vithelo-home-motion";
import { VitheloInquiryReveal } from "@/components/motion/vithelo-inquiry-reveal";
import { VitheloHomeInquiryComposer } from "@/components/patterns/vithelo-home-inquiry-composer";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";
import { siteConfig } from "@/content/site-config";
import { buildEmailInquiryUrl, buildWhatsAppInquiryUrl } from "@/lib/inquiry";

type VitheloB2BHomeProps = {
  content: VitheloB2BHomeContent;
};

function DosageSection({ content }: VitheloB2BHomeProps) {
  return (<section aria-labelledby="dosage-title" className={`${styles.section} ${styles.dosageSection}`} data-layout="desktop-editorial-field" data-ui-stage="editorial-format-field" data-motion-intent="RELATE" id="dosage-forms">
    <p className={styles.kicker}>{content.dosage.kicker}</p><h2 className={styles.title} id="dosage-title">{content.dosage.title}</h2><p className={styles.copy}>{content.dosage.qualifier}</p>
    <div className={styles.dosageGrid} data-testid="dosage-grid">{content.dosage.items.map((item, index) => <article className={styles.dosageItem} data-format={item.name.toLowerCase().replaceAll(" ", "-")} data-motion-index={index} data-motion-role="collection-item" data-testid="dosage-item" key={item.name}><span className={styles.dosageIndex}>{String(index + 1).padStart(2, "0")}</span><div aria-hidden="true" className={styles.dosageShape} data-shape={index + 1} /><div className={styles.dosageCopy}><h3><Link href={`/products/${item.name.toLowerCase().replaceAll(" ", "-")}`}>{item.name}</Link></h3><p>{item.moq}</p></div></article>)}</div>
  </section>);
}

function VitheloB2BHome({ content }: VitheloB2BHomeProps) {
  const inquiryContext = {
    cooperationType: "OEM / ODM project",
    productWorld: "Nutrition",
    market: "Not provided",
    summary: "Please share your format, formula, packaging, volume and target timing.",
  };
  const emailHref =
    siteConfig.contact.email.status === "CONFIGURED"
      ? buildEmailInquiryUrl(siteConfig.contact.email.value, inquiryContext)
      : "#contact-pending";
  const whatsappHref =
    siteConfig.contact.whatsapp.status === "CONFIGURED"
      ? buildWhatsAppInquiryUrl(siteConfig.contact.whatsapp.e164, inquiryContext)
      : "#contact-pending";
  const whatsappDisplay =
    siteConfig.contact.whatsapp.status === "CONFIGURED"
      ? siteConfig.contact.whatsapp.e164.replace(
          /^86(\d{3})(\d{4})(\d{4})$/,
          "+86 $1 $2 $3",
        )
      : "WhatsApp unavailable";

  return (
    <main className={styles.homepage} data-content-status={content.dataStatus} data-vithelo-home>
      <VitheloHomeMotion />
      <section
        aria-labelledby="hero-title"
        className={styles.hero}
        data-media-status={content.hero.media.status}
        data-ui-stage="image-led-hero"
        id="hero"
      >
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

      <section aria-labelledby="proof-title" className={styles.proof} id="proof">
        <div className={styles.proofIntro}>
          <div className={styles.proofCopy}>
            <p className={styles.kicker}>{content.proof.kicker}</p>
            <h2 className={styles.title} id="proof-title">{content.proof.title}</h2>
            <p className={styles.copy}>{content.proof.copy}</p>
          </div>
          <div className={styles.proofSource}>
            <strong>{content.proof.summary}</strong>
            <p>{content.proof.sourceBoundary}</p>
          </div>
        </div>
        <div className={styles.proofLedger}>
          {content.proof.items.map((item) => (
            <article className={styles.proofItem} key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </article>
          ))}
        </div>
        <p className={styles.proofLinks}>
          <Link href="/manufacturing">Explore Manufacturing</Link>
          <Link href="/quality">Review Quality &amp; R&amp;D</Link>
        </p>
      </section>

      <section
        aria-labelledby="capacity-boundary-title"
        className={`${styles.section} ${styles.capacityBoundarySection}`}
        data-motion-intent="EXPLAIN"
        data-ui-stage="capability-boundary-map"
        id="capacity-boundary"
      >
        <div className={styles.capacityBoundaryIntro}>
          <div>
            <p className={styles.kicker}>{content.capacity.kicker}</p>
            <h2 className={styles.title} id="capacity-boundary-title">{content.capacity.title}</h2>
          </div>
          <p className={styles.copy}>{content.capacity.sourceBoundary}</p>
        </div>
        <div className={styles.capabilityMap} data-motion-role="capacity-process">
          {content.capacity.steps.map((step, index) => (
            <article
              className={styles.capabilityBoundaryItem}
              data-testid="capability-boundary-item"
              data-value-state="pending"
              key={step.label}
            >
              <span className={styles.capabilityBoundaryIndex}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.label}</h3>
              <p>{step.copy}</p>
              <span className={styles.capabilityBoundaryStatus}>Pending verification</span>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="gummy-title"
        className={`${styles.section} ${styles.gummySection}`}
        data-media-status={content.gummy.media.status}
        data-ui-stage="gummy-image-atelier"
        data-motion-intent="RELATE"
        id="gummy-stage"
      >
        <div className={styles.centerHeader}>
          <p className={styles.kicker}>{content.gummy.kicker}</p>
          <h2 className={styles.title} id="gummy-title">
            {content.gummy.title}
          </h2>
        </div>
        <div className={styles.gummyAtelier}>
          <div
            aria-label={`${content.gummy.media.label}; ${content.gummy.media.width} by ${content.gummy.media.height} ${content.gummy.media.format}`}
            className={styles.gummyImageStage}
            data-media-status={content.gummy.media.status}
            data-motion-role="media"
            role="img"
          >
            <span>
              {content.gummy.media.label} · {content.gummy.media.width} × {content.gummy.media.height}
            </span>
          </div>
          <div className={styles.gummyFeatureRail}>
            {content.gummy.features.map((feature, index) => (
              <article data-motion-role="relation-item" key={feature.title}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VitheloMarketStage market={content.market} />

      <DosageSection content={content} />

      <section
        aria-labelledby="runway-title"
        className={`${styles.section} ${styles.darkSection} ${styles.runwaySection}`}
        data-ui-stage="runway-timeline-stage"
        data-motion-intent="EXPLAIN"
        id="project-runway"
      >
        <div className={styles.centerHeader}>
          <p className={styles.kicker}>{content.runway.kicker}</p>
          <h2 className={styles.title} id="runway-title">
            {content.runway.title}
          </h2>
        </div>
        <div className={styles.runway} data-motion-role="process-line">
          {content.runway.steps.map((step, index) => (
            <article
              data-motion-index={index}
              data-motion-role="process-step"
              key={step.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="contact-title"
        className={`${styles.contactSection} ${styles.contactRevealSection}`}
        data-contact-state="CONFIGURED"
        data-scene-status={content.contact.scene.status}
        data-layout="editorial-channel-split"
        id="contact"
      >
        <VitheloInquiryReveal image={content.contact.scene.src}>
        <div className={styles.contactIntroGrid}>
          <div className={styles.contactIntro}>
            <p className={styles.kicker}>{content.contact.kicker}</p>
            <h2 className={styles.title} id="contact-title">
              {content.contact.title}
            </h2>
            <p className={styles.copy}>{content.contact.copy}</p>
          </div>
          <div
            aria-label="Direct inquiry channels"
            className={styles.contactChannels}
          >
            <a
              aria-label={`Email ${siteConfig.contact.email.value}`}
              className={styles.contactChannelCard}
              href={emailHref}
            >
              <span className={styles.contactChannelIndex}>01 · Email</span>
              <strong>{siteConfig.contact.email.value}</strong>
              <span className={styles.contactChannelAction}>
                Open mail <span aria-hidden="true">→</span>
              </span>
            </a>
            <a
              aria-label={`WhatsApp ${whatsappDisplay}`}
              className={styles.contactChannelCard}
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              <span className={styles.contactChannelIndex}>02 · WhatsApp</span>
              <strong>{whatsappDisplay}</strong>
              <span className={styles.contactChannelAction}>
                Open chat <span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </div>
        </VitheloInquiryReveal>
        <div className={styles.contactDetails}>
        {siteConfig.contact.email.status === "CONFIGURED" &&
        siteConfig.contact.whatsapp.status === "CONFIGURED" ? (
          <VitheloHomeInquiryComposer
            email={siteConfig.contact.email.value}
            formats={content.contact.formats}
            whatsapp={siteConfig.contact.whatsapp.e164}
          />
        ) : null}
        <div className={styles.brandSignature} data-motion-role="signature">
          <strong>Made for what comes next.</strong>
          <span>VITHELO · PRIVATE-LABEL NUTRITION MANUFACTURING</span>
        </div>
        </div>
      </section>

    </main>
  );
}

export { VitheloB2BHome, type VitheloB2BHomeProps };
