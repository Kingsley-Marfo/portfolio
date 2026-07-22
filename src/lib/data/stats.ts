export type Stat = { value: number; suffix?: string; prefix?: string; label: string };

/** Headline numbers shown on the home page. Edit freely as things grow. */
export const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Production projects shipped" },
  { value: 15, suffix: "+", label: "Technologies worked with" },
  { value: 100, suffix: "%", label: "Full-stack ownership" },
  { value: 2, suffix: "+", label: "Years writing code" },
];
