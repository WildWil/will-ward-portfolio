import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  image?: string;
};

const AVATAR_COLORS = ["#0369A1", "#0E7490", "#4338CA", "#0F766E", "#7C3AED", "#B45309"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export const TestimonialsColumn = ({
  className = "",
  testimonials,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`tcol ${className}`}>
      <motion.div
        animate={{ translateY: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="tcol-track"
      >
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {testimonials.map(({ text, name, role, image }, i) => (
              <div className="tcard" key={i}>
                <div className="tcard-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="tcard-text">{text}</p>
                <div className="tcard-foot">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="tcard-avatar tcard-avatar-img"
                      onError={(e) => {
                        const el = e.currentTarget;
                        const fb = el.nextElementSibling as HTMLElement | null;
                        el.style.display = "none";
                        if (fb) fb.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span
                    className="tcard-avatar"
                    style={{ background: colorFor(name), display: image ? "none" : "flex" }}
                    aria-hidden="true"
                  >
                    {initials(name)}
                  </span>
                  <div>
                    <div className="tcard-name">{name}</div>
                    <div className="tcard-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
