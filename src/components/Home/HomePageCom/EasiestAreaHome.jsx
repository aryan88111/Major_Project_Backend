import React from "react";
import styles from "./Easiest.module.css";

function EasiestAreaHome() {
  return (
    <div className={styles["container"]}>
      <div className={styles["imageCont"]}>
        <img
          src="https://i.pinimg.com/736x/b4/75/9c/b4759cc4bfeef0456f58384f3865f35e.jpg"
          alt=""
        />
      </div>

      <div className={styles["headingCont"]}>
        <h1>The Easiest Method <br /> To Find a House</h1>
        <p>
          The easiest way to find your dream home, Say goodbye to complex
          searches and stress. Smart filters to match your preferences, Explore
          countless options with clarity and ease. From budget-friendly to
          luxurious spaces, Navigate with tools designed for simplicity. Your
          ideal house is just a few clicks away, Start your journey to a perfect
          home today.
        </p>
        <button>Try Now</button>
      </div>
    </div>
  );
}

export default EasiestAreaHome;
