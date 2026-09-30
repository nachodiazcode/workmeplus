import { WmpColors } from './colors';

export const WmpTheme = {
  colors: WmpColors,
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  typography: {
    titleLarge: {
      fontSize: 22,
      fontWeight: '700' as const,
      color: WmpColors.textPrimary,
      letterSpacing: -0.5,
    },
    titleMedium: {
      fontSize: 17,
      fontWeight: '600' as const,
      color: WmpColors.textPrimary,
      letterSpacing: -0.3,
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: WmpColors.textSecondary,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '500' as const,
      color: WmpColors.textMuted,
    },
    code: {
      fontSize: 11,
      fontWeight: '700' as const,
      color: WmpColors.primaryLight,
      letterSpacing: 0.5,
    },
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
    modal: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 10,
    },
  },
};
