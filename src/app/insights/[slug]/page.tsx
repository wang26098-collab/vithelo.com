import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloInsightArticle } from "@/components/patterns/vithelo-insight-article";
import { localContentAdapter } from "@/lib/content";

export async function generateStaticParams() {
  return (await localContentAdapter.listPublishedB2BInsights()).map(
    ({ slug }) => ({ slug }),
  );
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await localContentAdapter.getB2BInsightBySlug(slug);

  return article
    ? { title: `${article.title} | VITHELO`, description: article.summary }
    : { title: "Insight Not Found | VITHELO" };
}

export default async function InsightPage(
  props: PageProps<"/insights/[slug]">,
) {
  const { slug } = await props.params;
  const [site, article, publishedArticles] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BInsightBySlug(slug),
    localContentAdapter.listPublishedB2BInsights(),
  ]);

  if (!article) notFound();

  const relatedArticles = publishedArticles.filter(
    (item) => item.slug !== article.slug,
  );

  return (
    <VitheloB2BSiteFrame content={site}>
      <VitheloInsightArticle
        article={article}
        relatedArticles={relatedArticles}
      />
    </VitheloB2BSiteFrame>
  );
}
