import { useEffect, useRef } from "react";
import PropTypes from "prop-types";


const ProgressBar = ({ duration = 5, barPlay, barStop}) => {
  const barRef = useRef(null);
  useEffect(() => {
    if (!barPlay || !barRef.current) return;
    let startTime = null;
    const startWidth = 0;
    const endWidth = 100;

    function frame(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = (timestamp - startTime) / (duration * 1000);

      if (progress >= 1) {
        barRef.current.style.width = "100%";
        barStop()
      } else {
        let width = startWidth + progress * (endWidth - startWidth);
        barRef.current.style.width = width + "%";
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }, [barPlay, duration, barStop]); // Re-run animation if duration changes

  return (
    <div id="barContainer" /* style={styles.progressContainer */>
      <div ref={barRef} id='bar' /* style={styles.progressBar} */></div>
    </div>
  );
};

ProgressBar.propTypes = {
  duration: PropTypes.number,
  barPlay: PropTypes.func,
  barStop: PropTypes.func,
};

export default ProgressBar;
