import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import NumberFlow from "@number-flow/react";
import { counterItems } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const [started, setStarted] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#counter",
      start: "top bottom",
      onEnter: () => setStarted(true),
      onEnterBack: () => setStarted(true),
      once: true,
    });
  }, []);

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center neon-card"
          >
            <div className="counter-number text-white-50 text-5xl font-bold mb-2">
              <NumberFlow
                value={started ? item.value : 0}
                suffix={item.suffix}
                transformTiming={{ duration: 2500, easing: "ease-out" }}
              />
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
