// import React from 'react'
// import styles from './BottomImg.module.css';

// function BottomImg() {
//   return (
//     <div className={styles["container"]}>
//         <img src="bunch-key-icon-with-trinket-house-key-chain-with-two-keys-on-blue-background-vector-removebg-preview.png" alt="" className={styles["bunchKey"]} />
//         <img src="https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg" alt="" className={styles["plotImage"]} />
        
//     </div>
//   )
// }

// export default BottomImg
import React from "react";
import styles from "./BottomImg.module.css";

function BottomImg() {
  return (
    <div className={styles.container}>
      <img 
        src="bunch-key-icon-with-trinket-house-key-chain-with-two-keys-on-blue-background-vector-removebg-preview.png" 
        alt="Key Icon" 
        className={styles.bunchKey} 
        loading="lazy" // ✅ Lazy Loading for performance
      />
      <img 
        src="https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg" 
        alt="House Plot" 
        className={styles.plotImage} 
        loading="lazy" // ✅ Lazy Loading for performance
      />
    </div>
  );
}

export default BottomImg;
