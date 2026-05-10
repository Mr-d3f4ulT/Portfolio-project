import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const TechCard = ({ tech, children }) => (
  <div className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg">
    <div className="tech-card-animated-bg" />
    <div className="tech-card-content">
      <div className="tech-icon-wrapper">{children}</div>
      <div className="padding-x w-full">
        <p>{tech.name}</p>
      </div>
    </div>
  </div>
);

const StaticTechIcon = ({ tech }) => (
  <img src={tech.imgPath} alt={tech.name} loading="lazy" decoding="async" />
);

const TechStack = () => {
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo(
      "#skills .tech-card",
      {
        y: 36,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
          once: true,
        },
      },
    );
  }, [prefersReducedMotion]);

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackImgs.map((tech) => (
            <TechCard key={tech.name} tech={tech}>
              <StaticTechIcon tech={tech} />
            </TechCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
