import { business } from "./business";

export const whatToExpect = [
  {
    title: "Completion estimate up front",
    description:
      "Once we've diagnosed the issue, we give you a realistic finish date — not a vague \"we'll call you.\" Routine work is often same-day or next-day; major diesel jobs get a timeline based on parts and bay schedule.",
  },
  {
    title: "Progress updates while we work",
    description:
      "On longer jobs — injectors, head work, rebuilds — we keep you in the loop. You'll hear from us when we find something significant, when parts arrive, and if anything changes the timeline.",
  },
  {
    title: "Written estimate before major work",
    description:
      "We diagnose first, explain what we found in plain language, and email an estimate before significant repair. You approve the work and know the cost before we proceed.",
  },
] as const;

export const progressCommitment = [
  "A target completion date when your vehicle is checked in",
  "A call or text if we find something that changes the scope or timeline",
  "Photos on major diesel work when it helps explain what we found",
] as const;

export const whatWeWontDo = [
  {
    title: "No unnecessary upsells",
    description:
      "We diagnose first and recommend only what your vehicle actually needs. If it doesn't need fixing, we'll tell you.",
  },
  {
    title: "No mystery charges",
    description:
      "Major work gets a written estimate before we proceed. You'll know the cost and timeline before we turn a wrench.",
  },
  {
    title: "No runaround on diesel work",
    description:
      "Power Stroke, Cummins, and Duramax jobs are handled in our bays — not sent to another shop.",
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
    question: "I called but nobody answered — what should I do?",
    answer:
      "We're often under the hood and can't always get to the phone right away. Leave a callback request on this site with your number and vehicle details — we get an instant alert and call you back between jobs. For urgent breakdowns, leave a voicemail or select \"ASAP\" on the callback form.",
  },
  {
    question: "Why choose Top Dog over a dealership or another diesel shop?",
    answer:
      "We're a locally owned shop that specializes in Power Stroke, Cummins, and Duramax work. You talk directly to the team doing the repair — not a service writer pushing add-ons. We give completion estimates up front, keep you updated on progress, and our customers consistently mention honest pricing and no unnecessary upsells.",
  },
  {
    question: "Do you work on fleet and commercial vehicles?",
    answer:
      "Yes. We service work trucks, ranch rigs, contractor fleets, and commercial vehicles. If multiple trucks are down, call us — we'll prioritize getting your operation back up. Fleet billing options are available; ask when you call.",
  },
  {
    question: "What areas around Billings do you serve?",
    answer:
      "We're based on Niehenke Ave in Billings and regularly serve drivers from Laurel, Lockwood, Shepherd, Huntley, Worden, Park City, Columbus, Red Lodge, and across Yellowstone County. If you're in the Billings metro or nearby, we can help.",
  },
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
    question: "Will you keep me updated while my truck is in the shop?",
    answer:
      "Yes — that's what most customers care about, and we get it. You'll receive a completion estimate once we've inspected the vehicle. On longer jobs, we update you when we find something important, when parts come in, and if the timeline shifts. You're not left wondering where things stand.",
  },
  {
    question: "How long will my repair take?",
    answer:
      "Oil changes and routine maintenance are often same-day. Diagnostics usually take a few hours to a day depending on complexity. Major diesel work — injectors, turbos, head gaskets, rebuilds — depends on parts availability and shop schedule. We give you a realistic finish estimate after inspection, and we'll tell you right away if anything changes.",
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
