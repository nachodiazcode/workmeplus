import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WmpTagProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';

export const WmpTag: React.FC<WmpTagProps> = ({
  label,
  color = WmpColors.textSecondary,
  onPress,
  style,
}) => {
  const Container = onPress ? TouchableOpacity : TouchableOpacity;

  return (
    <Container
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      style={[
        styles.tag,
        {
          borderColor: WmpColors.border,
          backgroundColor: WmpColors.surfaceLight,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color }]}>#{label}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: WmpTheme.radius.sm,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '500',
  },
});
