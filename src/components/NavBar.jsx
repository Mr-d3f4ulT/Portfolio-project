import { useState, useEffect, useRef } from "react";

import { navLinks } from "../constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 10;

        if (isScrolled !== scrolledRef.current) {
          scrolledRef.current = isScrolled;
          setScrolled(isScrolled);
        }

        tickingRef.current = false;
      });
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll, { passive: true });

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo">
          Shivansh Pandey
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
