const { createCanvas } = require('canvas');
const fs = require('fs');

// Create canvas
const size = 180;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Center point
const cx = size / 2;
const cy = size / 2;

// Create radial gradient background
const bgGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
bgGradient.addColorStop(0, '#14b8a6'); // Teal
bgGradient.addColorStop(0.5, '#06b6d4'); // Cyan
bgGradient.addColorStop(1, '#3b82f6'); // Blue

// Draw background circle
ctx.fillStyle = bgGradient;
ctx.beginPath();
ctx.arc(cx, cy, 90, 0, Math.PI * 2);
ctx.fill();

// Draw outer ring
ctx.strokeStyle = 'rgba(20, 184, 166, 0.6)';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.arc(cx, cy, 75, 0, Math.PI * 2);
ctx.stroke();

// Draw middle circle
const midGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
midGradient.addColorStop(0, 'rgba(6, 182, 212, 0.9)');
midGradient.addColorStop(1, 'rgba(59, 130, 246, 1)');
ctx.fillStyle = midGradient;
ctx.beginPath();
ctx.arc(cx, cy, 60, 0, Math.PI * 2);
ctx.fill();

// Draw inner glow
const innerGradient = ctx.createRadialGradient(cx * 0.7, cy * 0.7, 0, cx, cy, 45);
innerGradient.addColorStop(0, 'rgba(20, 184, 166, 0.8)');
innerGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)');
innerGradient.addColorStop(1, 'rgba(59, 130, 246, 0.4)');
ctx.fillStyle = innerGradient;
ctx.beginPath();
ctx.arc(cx, cy, 45, 0, Math.PI * 2);
ctx.fill();

// Draw "L" text
ctx.font = 'bold 48px Arial, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Text shadow
ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
ctx.fillText('L', cx + 2, cy + 2);

// Main text
ctx.fillStyle = 'white';
ctx.fillText('L', cx, cy);

// Draw orbiting dots
const dots = [
  { x: 155, y: 90, color: '#14b8a6' },
  { x: 45, y: 35, color: '#06b6d4' },
  { x: 45, y: 145, color: '#3b82f6' }
];

dots.forEach(dot => {
  // Glow
  ctx.fillStyle = dot.color + '40';
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
  ctx.fill();

  // Dot
  ctx.fillStyle = dot.color;
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
  ctx.fill();
});

// Save PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/apple-icon.png', buffer);
console.log('✓ Created apple-icon.png with teal-to-blue gradient theme');
