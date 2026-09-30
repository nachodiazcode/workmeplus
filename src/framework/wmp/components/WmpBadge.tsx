import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WmpBadgeProps, WmpStatus, WmpPriority } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';

const STATUS_LABELS: Record<WmpStatus, string> = {
  backlog: 'Backlog',
  todo: 'Por Hacer',
  doing: 'En curso',
  in_progress: 'En Proceso',
  in_review: 'Revisión',
  done: 'Listo',
  blocked: 'Bloqueado',
};

const PRIORITY_LABELS: Record<WmpPriority, string> = {
  urgent: 'Urgente',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
  lowest: 'Muy Baja',
};

export const WmpBadge: React.FC<WmpBadgeProps> = ({
  label,
  variant = 'custom',
  value,
  color,
  bgColor,
  size = 'md',
  style,
  textStyle,
  children,
}) => {
  let displayColor = color || WmpColors.textSecondary;
  let displayBg = bgColor || 'rgba(148, 163, 184, 0.12)';
  let displayText = label || (typeof children === 'string' ? children : '');

  if (variant === 'status' && value) {
    const statusKey = value as WmpStatus;
    displayColor = WmpColors.status[statusKey] || WmpColors.textSecondary;
    displayBg = WmpColors.statusBg[statusKey] || displayBg;
    if (!displayText) {
      displayText = STATUS_LABELS[statusKey] || value;
    }
  } else if (variant === 'priority' && value) {
    const priorityKey = value as WmpPriority;
    displayColor = WmpColors.priority[priorityKey] || WmpColors.textSecondary;
    displayBg = WmpColors.priorityBg[priorityKey] || displayBg;
    if (!displayText) {
      displayText = PRIORITY_LABELS[priorityKey] || value;
    }
  }

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: displayBg,
          borderColor: `${displayColor}40`,
          paddingHorizontal: isSmall ? 6 : 9,
          paddingVertical: isSmall ? 2 : 4,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: displayColor,
            fontSize: isSmall ? 10 : 11,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {displayText || children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: WmpTheme.radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
