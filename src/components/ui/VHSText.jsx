'use client';

import { useState, useEffect } from 'react';

const FONT_SIZE = 220;
const START_X = 250;
const CHAR_SPACING = 160;
const LINE_GAP = FONT_SIZE * 1.3;

function burstRect(lineIdx, char, charIdx) {
  const x = START_X + charIdx * CHAR_SPACING;
  if (char === ' ') return null;
  const delay = (0.4 + lineIdx * 0.8 + charIdx * 0.1).toFixed(1);
  const y = 20 + lineIdx * LINE_GAP;
  return (
      <rect key={`b-${lineIdx}-${charIdx}`} x={x} y={y} width="130" height={FONT_SIZE} fill="url(#static)" opacity="0">
      <animate attributeName="opacity" values="0; 1; 0" dur="0.1s" begin={`${delay}s`} fill="freeze" />
    </rect>
  );
}

function rgbText(lineIdx, char, charIdx, color) {
  const x = START_X + charIdx * CHAR_SPACING;
  if (char === ' ') return null;
  const delay = (0.5 + lineIdx * 0.8 + charIdx * 0.1).toFixed(1);
    const fillMap = { red: '#C8965A', green: '#F0EEE8', cyan: '#C8965A' };
  const dur = color === 'green' ? 0.2 : color === 'red' ? 0.8 : 0.7;
  const repeatIdx = (lineIdx * 0.8 + charIdx * 0.1 + (color === 'cyan' ? 0.05 : 0)).toFixed(2);

  const attrs = color === 'green'
    ? {
        opacity: { values: '0;1', dur: '0.1s', begin: `${delay}s`, fill: 'freeze' },
        dx: { values: '0; 1; 0; -1; 0', dur: '0.2s', begin: `${delay}s` }
      }
    : {
        opacity: { values: '0; 0.8; 0.5; 0.8; 0', dur: `${dur}s`, begin: `${repeatIdx}s` },
        dx: { values: color === 'red' ? '-1; 1; -2; 1; -1' : '1; -1; 2; -1; 1', dur: '0.5s', begin: `${repeatIdx}s` }
      };

  const baseline = 20 + lineIdx * LINE_GAP + FONT_SIZE * 0.8;
  return (
      <text key={`t-${lineIdx}-${color}-${charIdx}`} x={x} y={baseline} fill={fillMap[color]} font-size={FONT_SIZE} font-family="Fraunces, serif" font-weight="700" text-anchor="middle" opacity="0">
      {char}
      <animate attributeName="opacity" values={attrs.opacity.values} dur={attrs.opacity.dur} begin={attrs.opacity.begin} repeatCount={attrs.opacity.fill ? undefined : 'indefinite'} fill={attrs.opacity.fill || undefined} />
      <animate attributeName="dx" values={attrs.dx.values} dur={attrs.dx.dur} begin={attrs.dx.begin} repeatCount="indefinite" />
    </text>
  );
}

function AnimatedContent({ lines }) {
  const maxLen = Math.max(...lines.map((l) => l.length));
  const totalW = START_X + maxLen * CHAR_SPACING + 130;
  const totalH = 20 + lines.length * LINE_GAP + 20;
  return (
    <g>
      {lines.map((line, li) =>
        line.split('').map((c, ci) => burstRect(li, c, ci))
      )}
      <g font-size={FONT_SIZE} font-family="Fraunces, serif" font-weight="700" text-anchor="middle" filter="url(#wobble)">
        {['red', 'green', 'cyan'].map((color) =>
          lines.map((line, li) =>
            line.split('').map((c, ci) => rgbText(li, c, ci, color))
          )
        )}
      </g>
    </g>
  );
}

function VHSText({ text, className = '' }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setKey((k) => k + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  const lines = Array.isArray(text) ? text : [text];
  const maxLen = Math.max(...lines.map((l) => l.length));
  const totalW = START_X + maxLen * CHAR_SPACING + 130;
  const totalH = 20 + lines.length * LINE_GAP + 20;

  return (
    <svg key={key} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${totalW} ${totalH}`} className={`w-full h-auto ${className}`} role="img" aria-label={lines.join(' ')}>
      <defs>
        <filter id="staticFilter">
          <feTurbulence baseFrequency="0.9" numOctaves="1" seed="2" stitchTiles="stitch" type="fractalNoise" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        </filter>
        <pattern id="static" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" filter="url(#staticFilter)" />
        </pattern>
        <filter id="wobble">
          <feTurbulence baseFrequency="0.005 0.001" numOctaves="1" seed="5" type="fractalNoise">
            <animate attributeName="seed" values="1; 10; 1" dur="2s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <rect width={totalW} height={totalH} fill="transparent" />

      <AnimatedContent lines={lines} />

    </svg>
  );
}

export default VHSText;
