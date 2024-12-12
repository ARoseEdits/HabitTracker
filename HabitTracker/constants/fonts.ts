import {isIOS} from '../../HabitTracker/assets/utils/fontFamily.ts';

export const fontFamilies = {
//   MONTSERRAT: {
//     normal: isIOS() ? 'Montserrat-Regular' : 'MontserratRegular',
//     medium: isIOS() ? 'Montserrat-Medium' : 'MontserratMedium',
//     bold: isIOS() ? 'Montserrat-Bold' : 'MontserratBold',
//   },

  DarkerGrotesque: {
    normal: isIOS() ? 'DarkerGrotesque-Regular' : 'DarkerGrotesqueRegular',
    medium: isIOS() ? 'DarkerGrotesque-Medium' : 'DarkerGrotesqueMedium',
    bold: isIOS() ? 'DarkerGrotesque-SemiBold' : 'DarkerGrotesqueSemiBold',
  }
  // Adjust the above code to fit your chosen fonts' names
};

import {Platform} from 'react-native';

export const isIOS = () => {
  return Platform.OS === 'ios';
};