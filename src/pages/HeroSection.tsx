import React from "react";
import { motion } from "framer-motion";
import "../styles/HeroSection.css"; // Import CSS file

const HeroPage: React.FC = () => {
  return (
    <section className="hero-container">
      {/* Animated Name */}
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Hi, I'm <span className="shining-text">Jaisheel Polimera</span>
      </motion.h1>

      {/* Subtitle with Slide-Up Animation */}
      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        A Passionate <span className="highlight">Full Stack Developer</span>
      </motion.p>

      {/* CTA Button with Hover Animation */}
      <motion.a
        href="#Projects"
        className="cta-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        View My Work
      </motion.a>
    </section>
  );
};

export default HeroPage;
