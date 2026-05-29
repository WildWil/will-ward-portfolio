import { TypewriterEffectSmooth } from "./ui/TypewriterEffect";

const words = [
  { text: "Custom" },
  { text: "websites." },
  { text: "Honest" },
  { text: "computer" },
  { text: "repair.", className: "text-primary" },
];

export const HeroCTA = () => (
  <TypewriterEffectSmooth
    words={words}
    className="justify-start"
    cursorClassName="bg-primary"
  />
);
