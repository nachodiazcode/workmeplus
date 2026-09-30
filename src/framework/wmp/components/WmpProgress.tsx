import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WmpProgressProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';

export const WmpProgress: React.FC<WmpProgressProps> = ({
  value,
  height = 6,
  color,
  trackColor = WmpColors.surfaceLight,
  showLabel = false,
  style,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  // Dynamic progress color based on completion
  let activeColor = color;
  if (!activeColor) {
    if (clampedValue === 100) activeColor = WmpColors.status.done;
    else if (clampedValue > 50) activeColor = WmpColors.primary;
    else if (clampedValue > 20) activeColor = WmpColors.status.in_review;
    else activeColor = WmpColors.status.todo;
  }

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Progreso</Text>
          <Text style={[styles.valueText, { color: activeColor }]}>{clampedValue}%</Text>
        </View>
      )}
      <View style={[styles.track, { height, backgroundColor: trackColor }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedValue}%`,
              backgroundColor: activeColor,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelText: {
    ...WmpTheme.typography.caption,
  },
  valueText: {
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    width: '100%',
    borderRadius: WmpTheme.radius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: WmpTheme.radius.full,
  },
});
