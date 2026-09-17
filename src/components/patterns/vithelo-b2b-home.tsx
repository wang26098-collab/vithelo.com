import type { VitheloB2BHomeContent, VitheloB2BHeroVideo } from "@/content/schema";
import Image from "next/image";
import Link from "next/link";
import { VitheloMarketStage } from "@/components/patterns/vithelo-market-stage";
import { VitheloHomeMotion } from "@/components/motion/vithelo-home-motion";
import { VitheloFormatWallMotion } from "@/components/motion/vithelo-format-wall-motion";
import { VitheloInquiryReveal } from "@/components/motion/vithelo-inquiry-reveal";
import { VitheloHomeInquiryComposer } from "@/components/patterns/vithelo-home-inquiry-composer";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";
import { siteConfig } from "@/content/site-config";
import { buildEmailInquiryUrl, buildWhatsAppInquiryUrl } from "@/lib/inquiry";

type VitheloB2BHomeProps = {
  content: VitheloB2BHomeContent;
};

function ProofCapabilityIcon({ index }: { index: number }) {
  const glyphs = [
    <g key="research">
      <path d="M9 3v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V3" />
      <path d="M8 14h8" />
    </g>,
    <g key="production">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </g>,
    <g key="quality">
      <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </g>,
    <g key="delivery">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </g>,
  ];

  return (
    <svg
      aria-hidden="true"
      className={styles.proofCapabilityIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      viewBox="0 0 24 24"
    >
      {glyphs[index]}
    </svg>
  );
}

function HeroVideo({ video }: { video: VitheloB2BHeroVideo }) {
  return (
    <video
      aria-hidden="true"
      autoPlay
      className={styles.heroVideo}
      data-testid="hero-video"
      data-hero-video-status={video.status}
      loop
      muted
      playsInline
      poster={video.poster}
      preload="metadata"
    >
      <source src={video.src} type="video/mp4" />
    </video>
  );
}

function CustomizationIcon({ index }: { index: number }) {
  const glyphs = [
    <g key="formula">
      <path d="M12 3c0 5.2-2.8 8.2-7 9 1.1 5.2 4.1 8 9 8 0-4.8-2.5-7.8-7-9 4.8-.8 7.6-3.8 8-8-1.2 0-2.2.2-3 .7" />
      <path d="M7 15c2-2.4 4.5-4.3 8-5.5" />
    </g>,
    <g key="format">
      <path d="m7.2 15.8 8.6-8.6a3.4 3.4 0 0 1 4.8 4.8L12 20.6a3.4 3.4 0 0 1-4.8-4.8Z" />
      <path d="m12.3 10.7 4.8 4.8M4.2 4.2l5.6 5.6M7 3l4 4M3 7l4 4" />
    </g>,
    <g key="taste">
      <path d="M12 3s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11Z" />
      <path d="M9 14c.4 1.5 1.4 2.3 3 2.5" />
    </g>,
    <g key="packaging">
      <path d="m4 8 8-4 8 4v9l-8 4-8-4V8Z" />
      <path d="m4 8 8 4 8-4M12 12v9M8 6l8 4" />
    </g>,
  ];

  return (
    <svg
      aria-hidden="true"
      className={styles.customizationNodeIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.35"
      viewBox="0 0 24 24"
    >
      {glyphs[index]}
    </svg>
  );
}

function DosageSection({ content }: VitheloB2BHomeProps) {
  return (
    <section
      aria-labelledby="dosage-title"
      className={`${styles.section} ${styles.dosageSection}`}
      data-layout="editorial-format-grid"
      data-motion-intent="RELATE"
      data-narrative-role="format-options"
      data-ui-stage="editorial-format-grid"
      id="dosage-forms"
    >
      <div className={styles.formatShell}>
        <div className={styles.formatIntro} data-format-intro>
          <div className={styles.formatHeading}>
            <p className={styles.kicker}>{content.dosage.kicker}</p>
            <h2 className={styles.title} data-format-title id="dosage-title">
              {content.dosage.title}
            </h2>
          </div>
          <p className={styles.formatQualifier}>{content.dosage.qualifier}</p>
          <Link className={styles.formatAllLink} href="/products">
            Explore all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.formatWall} data-testid="format-wall">
          {content.dosage.items.map((item, index) => (
            <article
              className={styles.formatProject}
              data-media-status={item.media.status}
              data-format-project
              data-motion-index={index}
              data-motion-role="format-item"
              data-testid="format-project"
              key={item.slug}
            >
              <Link
                aria-label={`Explore ${item.name}`}
                className={styles.formatLink}
                href={`/products/${item.slug}`}
              >
                <figure
                  className={styles.formatFigure}
                  data-format-media
                  data-testid="format-media"
                >
                  <span className={styles.formatMediaPlane} data-testid="format-media-plane">
                    <Image
                      alt={item.media.label}
                      fill
                      sizes="(max-width: 760px) calc(100vw - 48px), 50vw"
                      src={item.media.src!}
                      // The format wall is the page's primary visual comparison; treat these
                      // 8 images as LCP-critical so they download immediately instead of
                      // lazy-loading after the IntersectionObserver fires (which previously
                      // left a gray fallback visible for several seconds).
                      priority
                    />
                  </span>
                </figure>
                <div className={styles.formatMeta}>
                  <h3 data-format-label={item.name}>{item.name}</h3>
                  <div className={styles.formatTags} aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>Dosage format</span>
                  </div>
                  <span className={styles.formatCardAction} aria-hidden="true">
                    Explore <b>↗</b>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <VitheloFormatWallMotion />
    </section>
  );
}

function VitheloB2BHome({ content }: VitheloB2BHomeProps) {
  const inquiryContext = {
    cooperationType: "OEM / ODM project",
    productWorld: "Nutrition",
    market: "Not provided",
    summary:
      "Please share your product direction, preferred format, customization priorities, expected volume and target market.",
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
        data-narrative-role="positioning"
        data-ui-stage="image-led-hero"
        id="hero"
      >
        {content.hero.heroVideo ? <HeroVideo video={content.hero.heroVideo} /> : null}
        <div aria-hidden="true" className={styles.heroVeil} data-testid="hero-veil" />
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
          {content.hero.heroVideo?.label ?? content.hero.media.label} · {content.hero.heroVideo ? `${content.hero.heroVideo.width} × ${content.hero.heroVideo.height} · ${content.hero.heroVideo.durationSeconds}s loop · MP4` : `${content.hero.media.width} × ${content.hero.media.height} · ${content.hero.media.format}`}
        </p>
      </section>

      <section
        aria-labelledby="proof-title"
        className={styles.proof}
        data-layout="manufacturing-editorial-split"
        data-motion-intent="EXPLAIN"
        data-narrative-role="manufacturing-system"
        id="proof"
      >
        <div className={styles.proofPrimary}>
          <div className={styles.proofNarrative}>
            <p className={styles.kicker}>{content.proof.kicker}</p>
            <h2 className={styles.title} id="proof-title">{content.proof.title}</h2>
            <p className={styles.copy}>{content.proof.copy}</p>
            <Link className={styles.editorialAction} href={content.proof.action.href}>
              {content.proof.action.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className={styles.proofCapabilities} data-motion-role="workstream-ledger">
          {content.proof.workstreams.map((workstream, index) => (
            <article
              data-motion-role="proof-value"
              data-testid="manufacturing-workstream"
              key={workstream.title}
            >
              <ProofCapabilityIcon index={index} />
              <div>
                <h3>{workstream.title}</h3>
                <p>{workstream.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="capacity-boundary-title"
        className={`${styles.section} ${styles.capacityBoundarySection}`}
        data-layout="project-entry-routes"
        data-motion-intent="RELATE"
        data-narrative-role="project-entry"
        data-ui-stage="project-entry-routes"
        id="capacity-boundary"
      >
        <div className={styles.featuredIntro}>
          <div>
            <p className={styles.kicker}>{content.entryRoutes.kicker}</p>
            <h2 className={styles.title} id="capacity-boundary-title">{content.entryRoutes.title}</h2>
          </div>
          <p className={styles.featuredIntroCopy}>{content.entryRoutes.copy}</p>
          <Link className={styles.featuredAllLink} href={content.entryRoutes.action.href}>
            {content.entryRoutes.action.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className={styles.entryRouteGrid} data-testid="project-entry-routes">
          {content.entryRoutes.routes.map((route, index) => (
            <article
              className={styles.entryRoute}
              data-motion-index={index}
              data-motion-role="entry-route"
              data-testid="project-entry-route"
              key={route.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{route.title}</h3>
              <p>{route.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="customization-title"
        className={`${styles.section} ${styles.customizationSection}`}
        data-layout="customization-constellation"
        data-media-status={content.customization.media.status}
        data-motion-intent="EXPLAIN"
        data-narrative-role="product-definition"
        data-ui-stage="customization-constellation"
        id="gummy-stage"
      >
        <div className={styles.customizationLayout}>
          <div className={styles.customizationIntro}>
            <p className={styles.kicker}>{content.customization.kicker}</p>
            <h2 className={styles.title} id="customization-title">
              {content.customization.title}
            </h2>
            <p className={styles.customizationCopy}>{content.customization.copy}</p>
            <Link
              className={styles.customizationPrimaryAction}
              href={content.customization.action.href}
            >
              <span aria-hidden="true">→</span>
              {content.customization.action.label}
            </Link>
          </div>

          <div className={styles.customizationConstellation}>
            <figure
              className={styles.customizationVisual}
              data-motion-role="media"
              data-testid="customization-visual"
            >
              <Image
                alt={content.customization.media.label}
                fill
                sizes="(max-width: 760px) 100vw, 62vw"
                src={content.customization.media.src!}
              />
            </figure>
            <div aria-hidden="true" className={styles.customizationOrbit} />
            {content.customization.nodes.map((node, index) => (
              <article
                className={styles.customizationNode}
                data-motion-role="relation-item"
                data-node-index={index + 1}
                data-testid="customization-node"
                key={node.title}
              >
                <div className={styles.customizationNodeMark}>
                  <CustomizationIcon index={index} />
                </div>
                <div>
                  <h3>{node.title}</h3>
                  <p>{node.copy}</p>
                </div>
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
        data-narrative-role="project-path"
        id="project-runway"
      >
        <div className={styles.centerHeader}>
          <p className={styles.kicker}>{content.runway.kicker}</p>
          <h2 className={styles.title} id="runway-title">
            {content.runway.title}
          </h2>
          <p className={styles.runwayCopy}>{content.runway.copy}</p>
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
        <Link className={styles.runwayAction} href={content.runway.action.href}>
          {content.runway.action.label}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section
        aria-labelledby="brand-statement-title"
        className={`${styles.section} ${styles.brandStatementSection}`}
        data-media-status={content.statement.media.status}
        data-narrative-role="brand-statement"
        id="brand-statement"
      >
        <Image
          alt=""
          aria-hidden="true"
          className={styles.brandStatementMedia}
          fill
          sizes="100vw"
          src={content.statement.media.src}
        />
        <div aria-hidden="true" className={styles.brandStatementVeil} />
        <div className={styles.brandStatementCopy}>
          <h2 id="brand-statement-title">
            <span data-statement-line>
              {content.statement.title.split(" to the quiet peace")[0]}{" "}
            </span>
            <span data-statement-line>
              to the quiet peace{content.statement.title.split("to the quiet peace")[1]}
            </span>
          </h2>
          <p>{content.statement.supportingText}</p>
        </div>
      </section>

      <section
        aria-labelledby="contact-title"
        className={`${styles.contactSection} ${styles.contactRevealSection}`}
        data-contact-state="CONFIGURED"
        data-scene-status={content.contact.scene.status}
        data-layout="editorial-channel-split"
        data-narrative-role="inquiry"
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
        <ul className={styles.contactPrompts} aria-label="Useful details to prepare">
          {content.contact.prompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
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
