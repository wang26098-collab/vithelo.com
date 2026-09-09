"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BProductsPage } from "@/content/schema";

export function VitheloGummiesDetail({ format }: { format: B2BProductsPage["formats"][number] }) {
  const [galleryView, setGalleryView] = useState("MAIN");
  const [direction, setDirection] = useState("");
  const [stage, setStage] = useState("");
  const [openPanel, setOpenPanel] = useState<string | null>("overview");
  const galleryLabel = galleryView === "MAIN" ? "Gummy format demonstration image" : `${galleryView.toLowerCase()} gummy format reference image`;

  return <main className={styles.formatDetailPage}>
    <div className={styles.formatCrumb}><Link href="/products">Products</Link><span aria-hidden="true"> / </span>Gummies / Format detail</div>
    <section className={styles.formatDetailTop}>
      <div className={styles.formatGallery}><div className={styles.formatThumbs}>{["MAIN", "FORM", "PACK", "SCENE"].map((view) => <button key={view} type="button" aria-pressed={galleryView === view} className={galleryView === view ? styles.formatThumbActive : undefined} onClick={() => setGalleryView(view)}>{view}</button>)}</div><figure className={styles.formatHeroMedia}><Image src="/media/b2b/format-gummies.png" alt={galleryLabel} fill priority sizes="(max-width: 760px) 100vw, 34vw" /><div className={styles.formatMediaOverlay}><span>{galleryView}</span><span>01 / 04</span></div><figcaption>Approved format asset · DEMO_ONLY</figcaption></figure></div>
      <article className={styles.formatDetailInfo}><p className={styles.kicker}>DOSAGE FORM MANUFACTURING</p><h1>Gummies<br />for your next line.</h1><span className={styles.formatStatus}>DEMO_ONLY</span><p className={styles.formatLead}>{format.fit}. Align the intended experience, formula direction and packaging route before inquiry.</p><div className={styles.formatFacts}><div><span>Format</span><b>{format.name}</b></div><div><span>Project status</span><b>Demo route</b></div><div><span>Route</span><b>Formula · shape · pack</b></div></div><div className={styles.formatTrust}><span>01</span><p>One brief from format choice to inquiry.</p></div></article>
      <aside className={styles.formatInquiry}><p className={styles.kicker}>OEM / ODM ROUTE</p><h2>Build this format into your project.</h2><p>Start with a direction. Final feasibility requires approved project inputs.</p><label htmlFor="gummy-direction">Health direction</label><select id="gummy-direction" value={direction} onChange={(event) => setDirection(event.target.value)}><option value="">Choose a direction</option><option>Sports Performance</option><option>Women’s Health</option><option>Sleep &amp; Rest</option><option>Cognitive Focus</option><option>Beauty From Within</option><option>Pet Health</option></select><label htmlFor="gummy-stage">Project stage</label><select id="gummy-stage" value={stage} onChange={(event) => setStage(event.target.value)}><option value="">Choose a stage</option><option>Early concept</option><option>Formula direction ready</option><option>Packaging direction ready</option></select><Link className={styles.formatPrimaryAction} href="/contact">Start an OEM / ODM inquiry →</Link><Link className={styles.formatSecondaryAction} href="/contact">Add format to project brief</Link><div className={styles.formatDirect}><span>Direct inquiry</span><a href="mailto:wang26098@gmail.com">Email VITHELO →</a><a href="https://wa.me/8618272369556">WhatsApp VITHELO →</a></div></aside>
    </section>
    <section className={styles.formatDetailLower}><div><button className={styles.formatDisclosure} type="button" onClick={() => setOpenPanel(openPanel === "overview" ? null : "overview")}><span>Format overview</span><span>{openPanel === "overview" ? "−" : "+"}</span></button>{openPanel === "overview" && <p>Gummy projects can align formula, texture, shape, flavor, color and packaging in one development brief.</p>}</div><div><button className={styles.formatDisclosure} type="button" onClick={() => setOpenPanel(openPanel === "customization" ? null : "customization")}><span>Customization options</span><span>{openPanel === "customization" ? "−" : "+"}</span></button>{openPanel === "customization" && <ul>{format.customization.map((item) => <li key={item}>{item}</li>)}</ul>}</div><div><button className={styles.formatDisclosure} type="button" onClick={() => setOpenPanel(openPanel === "packaging" ? null : "packaging")}><span>Packaging direction</span><span>{openPanel === "packaging" ? "−" : "+"}</span></button>{openPanel === "packaging" && <p>{format.packaging}. Production inputs remain DEMO_ONLY until verified.</p>}</div></section><div className={styles.formatDetailCta}><span>Ready to discuss a format and direction?</span><Link href="/contact">Start your project inquiry →</Link></div>
  </main>;
}
