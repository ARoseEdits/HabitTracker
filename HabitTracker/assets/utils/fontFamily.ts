import {fontFamilies} from '../../fonts.js';

export const getFontFamily = (
  isLTR: boolean,
  weight: 'normal' | 'medium' | 'bold',
) => {
  const selectedFontFamily = isLTR
    ? fontFamilies.DarkerGrotesque
  return selectedFontFamily[weight];
};