import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WmpAvatarProps } from '../types';
import { WmpColors } from '../theme/colors';

const AVATAR_PALETTE = [
  '#2563EB', '#7C3AED', '#059669', '#D97706', '#DB2777', '#0891B2',
];

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

export const WmpAvatar: React.FC<WmpAvatarProps> = ({
  name,
  size = 28,
  color,
  style,
}) => {
  const bgColor = color || getColorForName(name);
  const initials = getInitials(name);
  const fontSize = Math.max(10, Math.floor(size * 0.42));

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: WmpColors.border,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
