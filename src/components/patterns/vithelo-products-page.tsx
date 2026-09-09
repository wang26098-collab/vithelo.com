"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import { filterProductDiscovery } from "@/lib/product-discovery";
import type { B2BProductsPage } from "@/content/schema";

export function VitheloProductsPage({ content }: { content: B2BProductsPage }) {
  const [format, setFormat] = useState<(typeof content.discovery.formats)[number]["slug"] | "all">("all");
  const [directions, setDirections] = useState<(typeof content.discovery.healthDirections)[number]["slug"][]>([]);
  const results = useMemo(() => filterProductDiscovery(content.discovery.items, { format, healthDirections: directions }), [content.discovery.items, directions, format]);
  const toggleDirection = (slug: (typeof content.discovery.healthDirections)[number]["slug"]) => setDirections((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);

  return (
    <main className={`${styles.page} ${styles.productsPage}`} data-content-status={content.dataStatus} data-ui-stage="products-left-filter">
      <section className={`${styles.hero} ${styles.productsHero}`} data-header-hero><p className={styles.kicker}>{content.hero.kicker}</p><h1>Find the format for what comes next.</h1><p className={styles.lede}>Explore product formats and market directions, then move into the format detail that fits your next nutrition line.</p></section>
      <div className={styles.healthDirectionBar}>{content.discovery.healthDirections.map((item) => <button key={item.slug} type="button" aria-pressed={directions.includes(item.slug)} onClick={() => toggleDirection(item.slug)}>{item.name}</button>)}</div>
      <section className={styles.discoveryLayout} aria-label="Product discovery">
        <aside className={styles.discoveryRail} aria-label="Product filters"><h2>Format</h2><fieldset><legend>Choose one</legend><div className={styles.formatList}><button type="button" aria-pressed={format === "all"} onClick={() => setFormat("all")}>All formats</button>{content.discovery.formats.map((item) => <button type="button" key={item.slug} aria-pressed={format === item.slug} onClick={() => setFormat(item.slug)}>{item.name}</button>)}</div></fieldset><button type="button" className={styles.discoveryClear} onClick={() => { setFormat("all"); setDirections([]); }}>Clear all filters</button></aside>
        <div className={styles.discoveryResults}><div className={styles.discoveryHeader}><div><p className={styles.kicker}>PRODUCT DISCOVERY</p><h2>Matching directions</h2></div><span aria-live="polite">{results.length} results · DEMO_ONLY</span></div>{results.length ? <div className={styles.discoveryGrid}>{results.map((item) => <Link key={item.id} href={`/products/${item.formatSlug}`} className={styles.discoveryCard}><div className={styles.discoveryMedia}>{item.media?.status === "FREE_COMMERCIAL" ? <Image src={item.media.src} alt={item.media.alt} fill sizes="(max-width: 760px) 100vw, 28vw" /> : <span>IMAGE PLACEHOLDER<br />{item.formatName} product / lifestyle still</span>}</div><p className={styles.kicker}>{item.formatName} · {item.dataStatus}</p><h3>{item.title}</h3><p>{item.descriptor}</p><span className={styles.discoveryCardAction}>Explore format →</span></Link>)}</div> : <div className={styles.discoveryEmpty} role="status"><h3>No current route matches.</h3><p>Clear a filter to view the available demonstration directions.</p><button type="button" onClick={() => { setFormat("all"); setDirections([]); }}>Clear filters</button></div>}<div className={styles.discoveryCta}><span>Have a specific product direction in mind?</span><Link href="/contact">Start an OEM / ODM inquiry →</Link></div></div>
      </section>
    </main>
  );
}
