import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WmpButtonProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';

export const WmpButton: React.FC<WmpButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  children,
}) => {
  let bg = WmpColors.primary;
  let textColor = '#FFFFFF';
  let border = 'transparent';

  switch (variant) {
    case 'secondary':
      bg = WmpColors.surfaceLight;
      textColor = WmpColors.textPrimary;
      border = WmpColors.border;
      break;
    case 'outline':
      bg = 'transparent';
      textColor = WmpColors.primaryLight;
      border = WmpColors.primary;
      break;
    case 'ghost':
      bg = 'transparent';
      textColor = WmpColors.textSecondary;
      break;
    case 'danger':
      bg = WmpColors.status.blocked;
      textColor = '#FFFFFF';
      break;
    case 'primary':
    default:
      bg = WmpColors.primary;
      textColor = '#FFFFFF';
      break;
  }

  const verticalPadding = size === 'sm' ? 6 : size === 'lg' ? 14 : 10;
  const horizontalPadding = size === 'sm' ? 12 : size === 'lg' ? 22 : 16;
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? WmpColors.surfaceLight : bg,
          borderColor: disabled ? WmpColors.border : border,
          paddingVertical: verticalPadding,
          paddingHorizontal: horizontalPadding,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: disabled ? WmpColors.textMuted : textColor,
              fontSize,
            },
            textStyle,
          ]}
        >
          {title || children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: WmpTheme.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
