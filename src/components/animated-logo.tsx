import React from 'react';

const AnimatedLogo = () => {
  return (
    <>
      <style jsx>{`
        .infinity-logo {
          width: 40px;
          height: 20px;
          overflow: visible;
        }

        .infinity-logo .track {
          stroke: rgba(160, 160, 160, 0.3);
          stroke-width: 4;
          fill: none;
        }

        .infinity-logo .progress {
          stroke: hsl(var(--accent));
          stroke-width: 4;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 70 210; /* A short dash (70) followed by a long gap (210) */
          animation: infinity-flow 3s linear infinite;
          filter: drop-shadow(0 0 3px hsl(var(--accent))) drop-shadow(0 0 8px hsl(var(--accent)));
        }

        @keyframes infinity-flow {
          0% {
            stroke-dashoffset: 280;
          }
          100% {
            stroke-dashoffset: -280;
          }
        }
      `}</style>
      <svg className="infinity-logo" viewBox="0 0 100 50">
        <path
          className="track"
          d="M 10 25 C 10 10 30 10 50 25 C 70 40 90 40 90 25 C 90 10 70 10 50 25 C 30 40 10 40 10 25 Z"
        />
        <path
          className="progress"
          d="M 10 25 C 10 10 30 10 50 25 C 70 40 90 40 90 25 C 90 10 70 10 50 25 C 30 40 10 40 10 25 Z"
        />
      </svg>
    </>
  );
};

export default AnimatedLogo;
