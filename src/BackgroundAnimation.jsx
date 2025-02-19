import React from "react";
import "./BackgroundAnimation.css"; // Import CSS file for styles

const BackgroundAnimation = () => {
  return (
    <div className="area">
      <ul className="circles">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default BackgroundAnimation;
