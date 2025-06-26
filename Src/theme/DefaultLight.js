import { borders, colors, fontFamily, fontsSize } from '../Constants';

const DEFAULT_LIGHT_COLOR_THEME = {
  primaryBackground: colors.powderBlue,
  secondaryBackground: colors.white,
  inputBackground: colors.dimGray,
  primaryText: colors.white,
  secondaryText: colors.black,
  primaryButton: colors.royalBlue,
  disabledButton: colors.dimGray,
  bottomSheet: colors.royalBlue,
  primaryLoading: colors.white,
  secondaryLoading: colors.royalBlue,
  primaryIcon: colors.royalBlue,
  secondaryIcon: colors.white,
  errorText: colors.red,
  textBackground: colors.orange,
  expenseBackground: colors.gray,
  iconColor: colors.dimGray,
  modalBackScreenColor: colors.dimBlack,
  chatLightColor: colors.ligh,
};

const FONT_SET = {
  size: {
    xSmall: fontsSize.extraSmall,
    regular: fontsSize.regular,
    small: fontsSize.small,
    medium: fontsSize.medium,
    large: fontsSize.large,
    xLarge: fontsSize.extraLarge,
  },
  family: {
    regular: fontFamily.regular,
    medium: fontFamily.medium,
    semiBold: fontFamily.semiBold,
    bold: fontFamily.bold,
  },
};

const BORDER_RADIUS = {
  radius1: borders.radius1,
  radius2: borders.radius2,
  radius3: borders.radius3,
  radius4: borders.radius4,
  radius5: borders.radius5,
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

export const DEFAULT_LIGHT_THEME = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  size: FONT_SET.size,
  borders: BORDER_RADIUS,
  family: FONT_SET.family,
};
