import { business } from "./business";

export const privacyPolicyLastUpdated = "June 17, 2026";

export const privacySections = [
  {
    title: "Introduction",
    body: [
      `${business.name} ("we," "us," or "our") respects your privacy. This policy explains how we handle personal information collected through our website, including our callback request form.`,
      `This policy applies to information submitted at our website. It does not cover information you provide in person at our shop, by phone, or through other channels outside this site.`,
    ],
  },
  {
    title: "Information we collect",
    body: [
      "When you use our callback request form, we may collect:",
    ],
    list: [
      "Your name",
      "Your phone number",
      "Your preferred time to be called back",
      "Optional details about your vehicle or repair issue",
    ],
    afterList: [
      "We do not ask for payment information through this website form.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "We use the information you submit only to:",
    ],
    list: [
      "Respond to your callback or service inquiry",
      "Contact you about the vehicle or issue you described",
      "Schedule or coordinate shop service, when applicable",
    ],
    afterList: [
      "We do not sell your personal information. We do not use your phone number for marketing texts or promotional calls unless you separately give us permission to do so.",
    ],
  },
  {
    title: "How your information is shared",
    body: [
      "Your callback request is received by our shop team. To deliver form submissions to us, we use third-party services: email delivery (Resend) and, when configured, SMS alerts to shop staff (Twilio). Those providers process your submission only to notify us so we can call you back.",
      "We may also share information if required by law, to protect our rights, or to respond to valid legal requests.",
      "We do not share your information with advertisers or data brokers.",
    ],
  },
  {
    title: "How long we keep your information",
    body: [
      "We retain callback requests only as long as needed to respond to your inquiry and maintain reasonable business records related to shop operations. When information is no longer needed, we delete it or keep it only as required for legal, accounting, or operational purposes.",
    ],
  },
  {
    title: "Cookies and website data",
    body: [
      "Our website is designed primarily as an informational site. We do not use third-party advertising cookies or sell browsing data.",
      "Like most websites, our hosting provider may process standard technical information (such as IP address and browser type) in server logs for security and performance. Any optional site preferences stored in your browser remain on your device.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You are not required to use the callback form. You may contact us directly by phone instead.",
      "If you would like to ask what information we have from a website submission, request correction, or ask us to delete information that is not required to be retained, contact us using the details below.",
    ],
  },
  {
    title: "Children's privacy",
    body: [
      "Our website is not directed to children under 13, and we do not knowingly collect personal information from children through this site.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this privacy policy from time to time. When we do, we will revise the \"Last updated\" date at the top of this page.",
    ],
  },
  {
    title: "Contact us",
    body: [
      `If you have questions about this privacy policy or how we handle your information, contact ${business.name}:`,
    ],
    contact: true,
  },
] as const;
