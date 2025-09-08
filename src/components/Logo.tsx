import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'landing';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeMultiplier = {
    sm: 0.35,      // Bigger for corners/headers in other pages
    md: 0.5,       // Medium for general use
    lg: 0.7,       // Large for emphasis
    landing: 0.8   // Big for landing page
  };

  const scale = sizeMultiplier[size];
  const logoColor = '#3F6ED7';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Exact SVG Logo - Blue Version */}
      <svg 
        width={319 * scale} 
        height={287 * scale} 
        viewBox="0 0 319.000000 287.000000"
        preserveAspectRatio="xMidYMid meet"
        style={{ marginBottom: showText ? `${10 * scale}px` : 0 }}
      >
        <g 
          transform={`translate(0.000000,287.000000) scale(${0.1 * scale},-${0.1 * scale})`}
          fill={logoColor} 
          stroke="none"
        >
          {/* Top-left large parallelogram */}
          <path d="M981 2691 c-11 -7 -288 -965 -316 -1091 -5 -23 -1 -35 19 -55 l25
-25 548 0 c421 0 554 3 573 13 28 14 19 -15 209 663 67 237 121 441 121 452 0
53 15 52 -598 52 -312 0 -573 -4 -581 -9z"/>
          
          {/* Top-right small parallelogram */}
          <path d="M2168 2173 c-21 -24 -170 -559 -166 -597 5 -53 23 -56 333 -56 203 0
287 4 305 13 21 11 33 44 101 287 43 151 78 289 78 306 2 63 -3 64 -336 64
-273 0 -301 -2 -315 -17z"/>
          
          {/* Bottom-left small parallelogram */}
          <path d="M598 1328 c-9 -8 -50 -136 -96 -302 -72 -255 -80 -292 -69 -315 l12
-26 312 -3 312 -2 15 22 c17 27 166 550 166 584 0 53 -7 54 -334 54 -227 0
-306 -3 -318 -12z"/>
          
          {/* Bottom-right large parallelogram */}
          <path d="M1401 1327 c-17 -21 -313 -1085 -309 -1115 6 -51 10 -52 595 -52 393
0 549 3 568 12 19 8 29 25 40 62 8 28 36 130 64 226 223 789 234 830 217 856
l-16 24 -574 0 c-465 0 -576 -3 -585 -13z"/>
        </g>
      </svg>
      
      {/* Khutwa Text - Times New Roman, same blue color, perfectly centered */}
      {showText && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <h1 
            style={{
              color: logoColor,
              fontSize: `${Math.max(12, 45 * scale)}px`,
              fontFamily: 'Times, "Times New Roman", serif',
              fontWeight: 'normal',
              letterSpacing: '0',
              margin: 0,
              textAlign: 'center',
              display: 'block',
              width: 'fit-content'
            }}
          >
            Khutwa
          </h1>
        </div>
      )}
    </div>
  );
};