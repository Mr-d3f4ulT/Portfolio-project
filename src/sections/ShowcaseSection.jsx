import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const useSimpleMotion = window.matchMedia(
      "(max-width: 768px), (prefers-reduced-motion: reduce)",
    ).matches;

    if (useSimpleMotion) return;

    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ].filter(Boolean);

    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.12 * (index + 1),
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            once: true,
          },
        },
      );
    });
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
    );
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* LEFT SIDE */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper">
              <img
                src="/images/project1.png"
                alt="Uber Project"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-content">
              <h2>
                On-Demand Rides Made Simple with a Powerful, User-Friendly App
                called Ryde
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with React Native, Expo, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/project2.png"
                  alt="Library Management Platform"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2>The Library Management Platform</h2>
            </div>

            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img
                  src="/images/project3.png"
                  alt="YC Directory App"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2>YC Directory - A Startup Showcase App</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
