import React from "react";
import { TestimonialsColumn, type Testimonial } from "./ui/TestimonialsColumn";
import { motion } from "motion/react";

// Real Google reviews for Will Ward IT (text kept faithful, lightly tidied).
const testimonials: Testimonial[] = [
  {
    text: "Will is brilliant, polite, and extremely knowledgeable. He patiently makes sure you understand what he's doing. The most informed and reasonably priced repair technician in Mount Pleasant, and he is quick, very quick. I highly recommend him.",
    name: "Linda Kaufmann",
    role: "Google review",
    image: "/reviews/linda-kaufmann.png",
  },
  {
    text: "Will is a skilled and knowledgeable computer specialist. He recently shredded some old hard drives for us using state of the art technology. His services are reasonably priced. We highly recommend Will for all your computer needs.",
    name: "Betsy Karpf",
    role: "Google review",
    image: "/reviews/betsy-karpf.png",
  },
  {
    text: "Will is a very professional and hard working individual. I strongly recommend him to anyone with computer troubles, from small problems like WiFi not working to big things like putting a computer together. He is honest with everything and prices accordingly.",
    name: "Ben Mueller",
    role: "Google review",
    image: "/reviews/ben-mueller.png",
  },
  {
    text: "Reasonable price. Fixed a finicky printer in record time. Highly recommend!",
    name: "Robert Baldwin",
    role: "Google review",
    image: "/reviews/robert-baldwin.png",
  },
  {
    text: "Will is very reliable.",
    name: "Aiden Stokes",
    role: "Google review",
    image: "/reviews/aiden-stokes.png",
  },
  {
    text: "Very good business. Will is such a nice kid.",
    name: "Jacob Watts",
    role: "Google review",
    image: "/reviews/jacob-watts.png",
  },
];

// Give each column the full set in a different rotation, so every column is
// dense and varied — reviews stream continuously instead of the same one or
// two looping back in quickly.
const rotate = (arr: Testimonial[], n: number) => [...arr.slice(n), ...arr.slice(0, n)];
const columns: Testimonial[][] = [
  testimonials,
  rotate(testimonials, 2),
  rotate(testimonials, 4),
];

export const TestimonialsSection = () => (
  <section className="treviews" id="reviews">
    <div className="treviews-inner">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="treviews-head"
      >
        <span className="treviews-label">Reviews</span>
        <h2 className="treviews-title">What people say</h2>
        <p className="treviews-sub">
          Real 5-star Google reviews from computer repair customers around Mount Pleasant.
        </p>
      </motion.div>

      <div className="treviews-cols">
        <TestimonialsColumn testimonials={columns[0]} duration={66} />
        <TestimonialsColumn testimonials={columns[1]} className="tcol-md" duration={77} />
        <TestimonialsColumn testimonials={columns[2]} className="tcol-lg" duration={71} />
      </div>

      <div className="treviews-cta">
        <a
          href="https://share.google/nxhCQB9l7DoTD76EQ"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          See all reviews on Google
        </a>
      </div>
    </div>
  </section>
);
