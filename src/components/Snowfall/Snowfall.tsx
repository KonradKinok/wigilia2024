import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import "./Snowfall.css";

const Snowfall: React.FC = () => {
  const snowContainerRef = useRef<HTMLDivElement>(null);
  const [isTabActive, setIsTabActive] = useState(true);

  const particlesPerThousandPixels = 0.1;
  const fallSpeed = 1.25;
  const pauseWhenNotActive = true;
  const maxSnowflakes = 200;

  // Stabilizujemy referencję do tablicy snowflakes
  const snowflakes = useMemo<HTMLDivElement[]>(() => [], []);

  const resetSnowflake = useCallback(
    (snowflake: HTMLDivElement) => {
      const size = Math.random() * 5 + 1;
      const viewportWidth = window.innerWidth - size;
      const viewportHeight = window.innerHeight;

      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * viewportWidth}px`;
      snowflake.style.top = `-${size}px`;

      const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
      snowflake.style.animationDuration = `${animationDuration}s`;
      snowflake.style.animationTimingFunction = "linear";
      snowflake.style.animationName =
        Math.random() < 0.5 ? "fall" : "diagonal-fall";

      setTimeout(() => {
        const currentTop = parseFloat(snowflake.style.top || "0");
        if (currentTop < viewportHeight) {
          resetSnowflake(snowflake);
        } else {
          snowflake.remove();
          const index = snowflakes.indexOf(snowflake);
          if (index !== -1) snowflakes.splice(index, 1);
        }
      }, animationDuration * 1000);
    },
    [fallSpeed, snowflakes]
  );

  const createSnowflake = useCallback(() => {
    if (snowflakes.length < maxSnowflakes) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflakes.push(snowflake);
      snowContainerRef.current?.appendChild(snowflake);
      resetSnowflake(snowflake);
    }
  }, [maxSnowflakes, snowflakes, resetSnowflake]);

  const generateSnowflakes = useCallback(() => {
    const numberOfParticles =
      Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
      particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;

    const snowflakeInterval = setInterval(() => {
      if (isTabActive && snowflakes.length < maxSnowflakes) {
        requestAnimationFrame(createSnowflake);
      }
    }, interval);

    return () => clearInterval(snowflakeInterval);
  }, [
    isTabActive,
    maxSnowflakes,
    particlesPerThousandPixels,
    createSnowflake,
    snowflakes,
  ]);

  const handleVisibilityChange = useCallback(() => {
    if (!pauseWhenNotActive) return;

    setIsTabActive(!document.hidden);
  }, [pauseWhenNotActive]);

  useEffect(() => {
    const cleanup = generateSnowflakes();

    const handleResize = () => {
      cleanup();
      setTimeout(generateSnowflakes, 1000);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cleanup();
    };
  }, [generateSnowflakes, handleVisibilityChange]);

  return <div className="snow-container" ref={snowContainerRef}></div>;
};

export default Snowfall;
