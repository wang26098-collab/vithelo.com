import type { ReactNode } from "react";
import { VitheloB2BNavigation } from "@/components/core/vithelo-b2b-navigation";
import styles from "@/components/core/vithelo-b2b-site-frame.module.css";
import type { B2BSiteContent } from "@/content/schema";

type VitheloB2BSiteFrameProps = {
  children: ReactNode;
  content: B2BSiteContent;
  variant?: "home" | "internal";
  headerTheme?: "dark-hero" | "light-hero" | "split-hero";
};

export function VitheloB2BSiteFrame({
  children,
  content,
  variant = "internal",
  headerTheme = "dark-hero",
}: VitheloB2BSiteFrameProps) {
  return (
    <div
      className={styles.site}
      data-content-status={content.dataStatus}
      data-frame-variant={variant}
    >
      <VitheloB2BNavigation content={content} variant={variant} theme={headerTheme} />
      {children}
      {variant === "internal" ? (
        <div className={styles.disclosure} data-site-disclosure="footer">
          {content.disclosure}
        </div>
      ) : null}
    </div>
  );
}
