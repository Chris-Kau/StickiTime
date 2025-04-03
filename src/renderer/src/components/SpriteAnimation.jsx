import React, { useState, useEffect } from "react";
import spriteSheet from "../../../../resources/spritesheet.png"

const SpriteAnimation = () => {
  const [frame, setFrame] = useState(0);
  const frameWidth = 48;  // Width of each frame (adjust if needed)
  const frameHeight = 48; // Height of each frame
  const columns = 4; // Number of columns in the spritesheet
  const totalFrames = 16; // Total frames

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % totalFrames);
    }, 250); // Adjust speed (200ms per frame)

    return () => clearInterval(interval);
  }, []);

  const x = -(frame % columns) * frameWidth - 12;
  const y = -Math.floor(frame / columns) * frameHeight - 12;

  return (
    <div
      className="w-[24px] h-[24px] scale-150 bg-no-repeat"
      style={{
        backgroundImage: `url(${spriteSheet})`,
        backgroundPosition: `${x}px ${y}px`,
        backgroundSize: `${columns * frameWidth}px auto`,
        // clipPath: "inset(16px 18px 15px 18px)", // top right bottom left
      }}
    />
  );
};

export default SpriteAnimation;
