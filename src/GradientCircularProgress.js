import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const GradientCircularProgress = () => (
  <>
    <svg width={0} height={0}>
      <defs>
        <linearGradient id="gold_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a853" />
          <stop offset="100%" stopColor="#f0c75e" />
        </linearGradient>
      </defs>
    </svg>
    <CircularProgress
      size={48}
      thickness={4}
      sx={{ "svg circle": { stroke: "url(#gold_gradient)" } }}
    />
  </>
);

export default GradientCircularProgress;
