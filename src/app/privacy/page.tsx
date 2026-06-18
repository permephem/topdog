import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { business } from "@/lib/business";
import {
  privacyPolicyLastUpdated,
  privacySections,
} from "@/lib/privacy-policy";

export const metadata: Metadata = {
  title: `Privacy Policy | ${business.name}`,
  description: `Privacy policy for ${business.name} — how we handle information submitted through our website callback form.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#contact"
            className="text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
          >
            &larr; Back to contact
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted">
            Last updated: {privacyPolicyLastUpdated}
          </p>

          <div className="mt-10 space-y-10">
            {privacySections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-muted leading-relaxed">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {"list" in section && section.list && (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {"afterList" in section &&
                    section.afterList?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  {"contact" in section && section.contact && (
                    <ul className="space-y-2 text-foreground/90">
                      <li>
                        <span className="text-muted">Phone: </span>
                        <a
                          href={business.phoneHref}
                          className="font-semibold text-accent hover:text-accent-dark"
                        >
                          {business.phone}
                        </a>
                      </li>
                      <li>
                        <span className="text-muted">Address: </span>
                        {business.address.full}
                      </li>
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            This privacy policy is provided for general informational purposes
            and describes how we handle website form submissions. It is not
            legal advice. If you need advice for your specific situation,
            consult a qualified attorney.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
