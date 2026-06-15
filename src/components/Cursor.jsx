import React, { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const [hoverType, setHoverType] = useState("default"); // "default" | "hover" | "text"
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const match = window.matchMedia("(max-width: 768px)").matches || 
                    ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0);
      setIsMobile(match);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const mousePos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let reqId;
    const tick = () => {
      const ease = 0.15;
      ringPos.x += (mousePos.x - ringPos.x) * ease;
      ringPos.y += (mousePos.y - ringPos.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x - 18}px, ${ringPos.y - 18}px, 0)`;
      }
      reqId = requestAnimationFrame(tick);
    };
    reqId = requestAnimationFrame(tick);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest(".premium-card") ||
        target.closest(".interactive-3d-card") ||
        target.closest(".hover-trigger-3d")
      ) {
        setHoverType("hover");
      } else if (
        target.tagName === "P" || 
        target.tagName === "H1" || 
        target.tagName === "H2" || 
        target.tagName === "H3" || 
        target.tagName === "H4" ||
        target.tagName === "SPAN" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(reqId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          background-color: #0A0A0A;
          border-radius: 50%;
          pointer-events: none;
          z-index: 100;
          mix-blend-mode: difference;
          transition: width 0.2s, height 0.2s, background-color 0.2s;
        }
        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border: 1.5px solid #00C2FF;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99;
          transition: width 0.2s, height 0.2s, border-color 0.2s;
        }

        /* Hover states */
        .cursor-hover .custom-cursor-dot {
          width: 24px;
          height: 24px;
          background-color: #00C2FF;
        }
        .cursor-hover .custom-cursor-ring {
          width: 48px;
          height: 48px;
          border-color: #0A0A0A;
          transform: translate(-6px, -6px);
        }

        .cursor-text .custom-cursor-dot {
          width: 2px;
          height: 20px;
          border-radius: 0;
          background-color: #00C2FF;
        }
        .cursor-text .custom-cursor-ring {
          opacity: 0;
        }
      `}</style>
      <div className={`pointer-events-none hidden md:block cursor-${hoverType}`}>
        <div ref={dotRef} className="custom-cursor-dot" />
        <div ref={ringRef} className="custom-cursor-ring" />
      </div>
    </>
  );
}
