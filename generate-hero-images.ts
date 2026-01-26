import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = './public/images/hero-bg';

async function generateImages() {
  console.log('🎨 Generating hero background images for Tanjung Barat...\n');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const zai = await ZAI.create();

  const images = [
    {
      name: 'beranda',
      prompt: 'Modern Indonesian neighborhood in Jakarta, traditional houses mixed with modern buildings, clean streets, community atmosphere, warm morning light, vibrant colors, peaceful residential area, high quality photograph',
      size: '1440x720'
    },
    {
      name: 'profil',
      prompt: 'Modern Indonesian government office building, official kelurahan office, clean and professional, welcoming architecture, Indonesian flag, people coming and going, daytime, warm sunlight, high quality photograph',
      size: '1440x720'
    },
    {
      name: 'pelayanan',
      prompt: 'Friendly Indonesian government service counter, diverse staff helping citizens, modern office interior, clean and organized, welcoming atmosphere, customer service, professional yet approachable, high quality photograph',
      size: '1440x720'
    },
    {
      name: 'potensi-wisata',
      prompt: 'Beautiful Indonesian recreational park with lake, family-friendly, people enjoying activities, jogging track, green trees, modern playground, peaceful afternoon, sunny day, high quality photograph',
      size: '1440x720'
    },
    {
      name: 'berita',
      prompt: 'Modern Indonesian community newsroom, journalists working, digital screens showing news, professional media environment, Indonesian context, bright and modern, high quality photograph',
      size: '1440x720'
    },
    {
      name: 'kontak',
      prompt: 'Beautiful Indonesian neighborhood office building, contact center, welcoming entrance, people at information desk, modern facilities, clean and accessible, daytime, friendly atmosphere, high quality photograph',
      size: '1440x720'
    }
  ];

  for (const image of images) {
    try {
      console.log(`Generating ${image.name}...`);
      console.log(`  Prompt: ${image.prompt.substring(0, 80)}...`);

      const response = await zai.images.generations.create({
        prompt: image.prompt,
        size: image.size
      });

      if (!response.data || !response.data[0] || !response.data[0].base64) {
        throw new Error('Invalid response from image generation API');
      }

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');

      const outputPath = path.join(outputDir, `${image.name}.jpg`);
      fs.writeFileSync(outputPath, buffer);

      console.log(`  ✓ Saved to ${outputPath}`);
      console.log(`  Size: ${buffer.length} bytes\n`);

    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}\n`);
    }
  }

  console.log('\n✅ Image generation complete!');
  console.log('📁 Images saved to:', outputDir);
}

generateImages()
  .catch((error) => {
    console.error('❌ Error generating images:', error);
    process.exit(1);
  });
