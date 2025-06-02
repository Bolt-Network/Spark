import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_DIR = path.join(__dirname, 'public', 'assets', 'imgs', 'games');
const BACKGROUND_DIR = path.join(__dirname, 'public', 'assets', 'imgs', 'background');
const LOGOS_DIR = path.join(__dirname, 'public', 'assets', 'imgs', 'logos');

const SIZES = {
  s: { width: 100, height: 100 },
  m: { width: 220, height: 220 },
  l: { width: 340, height: 340 },
};

async function processDirectory(dir, sizes = null) {
  try {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await processDirectory(filePath, sizes);
      } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
        const outputFilePath = path.join(dir, path.basename(file, path.extname(file)) + '.webp');
        
        try {
          await fs.access(outputFilePath);
          console.log(`Skipping ${file}, WebP already exists`);
          continue;
        } catch (err) {
        }
        
        try {
          let image = sharp(filePath);
          
          if (sizes) {
            const metadata = await image.metadata();
            let size = 's';
            if (metadata.width >= 300 || metadata.height >= 300) {
              size = 'l';
            } else if (metadata.width >= 200 || metadata.height >= 200) {
              size = 'm';
            }
            
            image = image.resize({
              width: sizes[size].width,
              height: sizes[size].height,
              fit: 'cover',
            });
          }
          
          await image
            .webp({ quality: 80 })
            .toFile(outputFilePath);
          
          console.log(`Converted ${file} to WebP`);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${dir}:`, err);
  }
}

async function main() {
  console.log('Starting image optimization...');
  
  await processDirectory(GAMES_DIR, SIZES);
  
  await processDirectory(BACKGROUND_DIR);
  
  await processDirectory(LOGOS_DIR);
  
  console.log('Image optimization completed!');
}

main().catch(console.error); 