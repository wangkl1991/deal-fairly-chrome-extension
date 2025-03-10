import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconSizes = [16, 48, 128];
const outputDir = 'public';

// Create a blue square with "DF" text
async function generateIcon(size) {
  // Create a blue square
  const svgBuffer = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#3B82F6"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="${size * 0.5}"
        font-weight="bold" 
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="middle">DF</text>
    </svg>
  `);

  await sharp(svgBuffer)
    .png()
    .toFile(path.join(outputDir, `icon${size}.png`));
  
  console.log(`Generated icon${size}.png`);
}

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons for each size
Promise.all(iconSizes.map(size => generateIcon(size)))
  .then(() => console.log('All icons generated successfully!'))
  .catch(err => console.error('Error generating icons:', err)); 