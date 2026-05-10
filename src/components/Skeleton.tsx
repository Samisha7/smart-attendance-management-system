"use client";

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width, 
  height, 
  borderRadius,
  circle 
}) => {
  const style: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: circle ? '50%' : borderRadius || '8px',
  };

  return (
    <div className={`skeleton ${className}`} style={style}>
      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            #f1f5f9 25%,
            #e2e8f0 50%,
            #f1f5f9 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
          position: relative;
          overflow: hidden;
          min-height: 1rem;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Skeleton;
