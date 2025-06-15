export interface PrintFormat {
  id: string;
  name: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
  };
  photosPerSheet: number;
  photoSize: {
    width: number;
    height: number;
  };
  spacing: number;
  backgroundColor: string;
}

export const PRINT_FORMATS: PrintFormat[] = [
  {
    id: 'single',
    name: 'Single Photo',
    description: 'One photo at actual size',
    dimensions: { width: 413, height: 531 },
    photosPerSheet: 1,
    photoSize: { width: 413, height: 531 },
    spacing: 0,
    backgroundColor: '#ffffff'
  },
  {
    id: '4x6_sheet',
    name: '4×6 Sheet (4 photos)',
    description: '4 photos on a 4×6 inch sheet',
    dimensions: { width: 1200, height: 1800 }, // 4×6 inches at 300 DPI
    photosPerSheet: 4,
    photoSize: { width: 413, height: 531 },
    spacing: 40,
    backgroundColor: '#ffffff'
  },
  {
    id: '5x7_sheet',
    name: '5×7 Sheet (6 photos)',
    description: '6 photos on a 5×7 inch sheet',
    dimensions: { width: 1500, height: 2100 }, // 5×7 inches at 300 DPI
    photosPerSheet: 6,
    photoSize: { width: 413, height: 531 },
    spacing: 30,
    backgroundColor: '#ffffff'
  },
  {
    id: 'a4_sheet',
    name: 'A4 Sheet (8 photos)',
    description: '8 photos on an A4 sheet',
    dimensions: { width: 2480, height: 3508 }, // A4 at 300 DPI
    photosPerSheet: 8,
    photoSize: { width: 413, height: 531 },
    spacing: 50,
    backgroundColor: '#ffffff'
  },
  {
    id: 'wallet_size',
    name: 'Wallet Size Sheet (16 photos)',
    description: '16 small wallet-sized photos',
    dimensions: { width: 1800, height: 1200 }, // 6×4 inches at 300 DPI
    photosPerSheet: 16,
    photoSize: { width: 206, height: 265 }, // Half size
    spacing: 20,
    backgroundColor: '#ffffff'
  },
  {
    id: 'canon_selphy',
    name: 'Canon Selphy (4×6 inch) 6 photos',
    description: 'PR-108 / PR-54 / PR-1080V / KP-108IN / KP-72IN / KP-36IP',
    dimensions: { width: 1800, height: 1200 }, // 6×4 inches at 300 DPI
    photosPerSheet: 6,
    photoSize: { width: 413, height: 531 },
    spacing: 40,
    backgroundColor: '#ffffff'
  }
];

export function generatePrintSheet(
  photoDataURL: string,
  format: PrintFormat
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    canvas.width = format.dimensions.width;
    canvas.height = format.dimensions.height;

    // Fill background
    ctx.fillStyle = format.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      try {
        if (format.photosPerSheet === 1) {
          // Single photo - center it
          const x = (canvas.width - format.photoSize.width) / 2;
          const y = (canvas.height - format.photoSize.height) / 2;
          ctx.drawImage(img, x, y, format.photoSize.width, format.photoSize.height);
        } else {
          // Multiple photos - center grid
          const { photosPerRow, photosPerColumn } = calculateGridLayout(format);

          const totalWidth = photosPerRow * format.photoSize.width + (photosPerRow + 1) * format.spacing;
          const totalHeight = photosPerColumn * format.photoSize.height + (photosPerColumn + 1) * format.spacing;

          const startX = (canvas.width - totalWidth) / 2 + format.spacing;
          const startY = (canvas.height - totalHeight) / 2 + format.spacing;

          for (let row = 0; row < photosPerColumn; row++) {
            for (let col = 0; col < photosPerRow; col++) {
              const photoIndex = row * photosPerRow + col;
              if (photoIndex >= format.photosPerSheet) break;

              const x = startX + col * (format.photoSize.width + format.spacing);
              const y = startY + row * (format.photoSize.height + format.spacing);

              ctx.drawImage(img, x, y, format.photoSize.width, format.photoSize.height);
            }
          }
        }

        resolve(canvas.toDataURL('image/png', 1.0));
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = photoDataURL;
  });
}
function calculateGridLayout(format: PrintFormat): { photosPerRow: number; photosPerColumn: number } {
  const availableWidth = format.dimensions.width - format.spacing;
  const availableHeight = format.dimensions.height - format.spacing;
  
  const photoWithSpacing = {
    width: format.photoSize.width + format.spacing,
    height: format.photoSize.height + format.spacing
  };

  // Calculate optimal grid layout
  let bestLayout = { photosPerRow: 1, photosPerColumn: 1 };
  let minWaste = Infinity;

  for (let rows = 1; rows <= format.photosPerSheet; rows++) {
    const cols = Math.ceil(format.photosPerSheet / rows);
    
    const totalWidth = cols * photoWithSpacing.width;
    const totalHeight = rows * photoWithSpacing.height;
    
    if (totalWidth <= availableWidth && totalHeight <= availableHeight) {
      const waste = (availableWidth - totalWidth) + (availableHeight - totalHeight);
      if (waste < minWaste) {
        minWaste = waste;
        bestLayout = { photosPerRow: cols, photosPerColumn: rows };
      }
    }
  }

  return bestLayout;
}

export function getFormatById(id: string): PrintFormat | undefined {
  return PRINT_FORMATS.find(format => format.id === id);
}

export function getRecommendedFormat(photoSize: string): PrintFormat {
  // Default recommendation based on photo size
  if (photoSize.includes('35×45')) {
    return PRINT_FORMATS.find(f => f.id === '4x6_sheet') || PRINT_FORMATS[0];
  }
  return PRINT_FORMATS[0];
}
