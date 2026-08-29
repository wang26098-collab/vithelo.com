import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloContactPage } from "@/components/patterns/vithelo-contact-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start a Project | VITHELO",
  description: "Prepare a nutrition OEM or ODM project brief for VITHELO.",
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const [site, content] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BContactPage(),
  ]);
  const requestedFormat = firstValue(query.format)?.trim().slice(0, 120);
  const initialFormat = content.formats.includes(requestedFormat ?? "")
    ? requestedFormat
    : content.formats[0];
  const initialSubject = firstValue(query.subject)?.trim().slice(0, 120) ?? "";

  return (
    <VitheloB2BSiteFrame content={site}>
      <VitheloContactPage
        content={content}
        initialFormat={initialFormat}
        initialSubject={initialSubject}
      />
    </VitheloB2BSiteFrame>
  );
}
