// data/sampleData.ts

import { DataItem } from "@/types/dataTypes";

export const sampleData: DataItem[] = [
  {
    id: 1,
    title: "Morning Yoga Flow",
    description:
      "Start your day with a gentle yoga flow designed to awaken your body and focus your mind.",
    file: "AudioSamples/sample-3s.mp3",
    price: 20.0,
  },
  {
    id: 2,
    title: "Sleep Meditation Journey",
    description:
      "A soothing guided meditation to help you release the day’s tension and drift into deep sleep.",
    file: "AudioSamples/sample-6s.mp3",
    price: 20.0,
  },
  {
    id: 3,
    title: "Midday Reset Breathwork",
    description:
      "This 10-minute audio guides you through calming breathwork to reset and recharge your energy mid-day.",
    file: "AudioSamples/sample-9s.mp3",
    price: 20.0,
  },
  {
    id: 4,
    title: "Evening Meditation for Stress Relief",
    description:
      "A calming evening practice that helps melt away stress and prepare your mind for restful sleep.",
    file: "AudioSamples/sample-15s.mp3",
    price: 20.0,
  },
];
