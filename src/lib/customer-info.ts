import { business } from "./business";

export const whatToExpect = [
  {
    title: "Walk-ins welcome",
    description:
      "No appointment needed for many services. For major diesel diagnostics, engine work, or fleet vehicles, calling ahead helps us plan bay time and get you in faster.",
  },
  {
    title: "Estimates before major work",
    description:
      "We diagnose the issue first, then email you an estimate before any significant repair. No surprises — you approve the work before we proceed.",
  },
  {
    title: "Turnaround that respects your time",
    description:
      "Routine maintenance is often same-day or next-day. Larger jobs — rebuilds, injector work, major diagnostics — take longer, and we'll give you a realistic timeline up front.",
  },
] as const;

export const trustDetails = [
  {
    title: "Payment methods",
    description:
      "We accept cash, checks, and major credit and debit cards. Fleet and commercial accounts — ask us about billing options.",
  },
  {
    title: "Warranty on repairs",
    description:
      "Qualifying parts and labor are backed by a warranty. We'll explain coverage on your estimate before work begins.",
  },
  {
    title: "Broke down or need a tow?",
    description: `Call us first at ${business.phone}. We can recommend local towing and schedule service once your vehicle arrives at the shop.`,
  },
] as const;

export const faqItems = [
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-ins are welcome during shop hours. If you're dealing with a major diesel issue, engine work, or need fleet service, calling ahead helps us reserve bay time and reduce your wait.",
  },
  {
    question: "Do you provide estimates before doing repairs?",
    answer:
      "Yes. We diagnose the problem, explain what we find in plain language, and email you an estimate before any significant repair. You decide whether to move forward.",
  },
  {
    question: "What diesel engines and trucks do you work on?",
    answer:
      "Power Stroke (including 6.0, 6.4, and 6.7), Cummins, Duramax, and other diesel platforms — plus gas trucks, SUVs, and daily drivers. If you're not sure we service your vehicle, call and ask.",
  },
  {
    question: "How long will my repair take?",
    answer:
      "Oil changes and routine maintenance are often handled quickly. Diagnostics and major repairs depend on the issue, parts availability, and shop schedule. We'll give you a realistic timeline once we've inspected the vehicle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Cash, checks, and major credit and debit cards. For fleet or commercial work, ask us about account billing options.",
  },
  {
    question: "Is there a warranty on your work?",
    answer:
      "Qualifying repairs include a parts and labor warranty. Coverage details are provided with your estimate — ask us if you have questions about a specific job.",
  },
  {
    question: "My truck broke down — what should I do?",
    answer: `Call us at ${business.phone} during shop hours. We can recommend local towing options and get you on the schedule once your vehicle is here. If you're safely off the road, note any warning lights, noises, or symptoms to share when you call.`,
  },
  {
    question: "What should I tell you when I call or request a callback?",
    answer:
      "Year, make, model, mileage if you know it, what's happening with the vehicle, and when the problem started. Warning lights, codes, or recent work help us prepare before you arrive.",
  },
] as const;
