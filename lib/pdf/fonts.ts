import { Font } from '@react-pdf/renderer';

// Register system fonts for PDF generation
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
  ],
});

// Disable hyphenation for better text rendering
Font.registerHyphenationCallback((word: string) => [word]);

export const FONTS = {
  primary: 'Helvetica',
};
