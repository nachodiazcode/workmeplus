import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WmpMetricProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';

export const WmpMetric: React.FC<WmpMetricProps> = ({
  title,
  value,
  change,
  color = WmpColors.primary,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.indicator, { backgroundColor: color }]} />
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {change ? <Text style={styles.change}>{change}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: WmpColors.surface,
    borderRadius: WmpTheme.radius.md,
    padding: WmpTheme.spacing.md,
    borderWidth: 1,
    borderColor: WmpColors.border,
    minWidth: 110,
    flex: 1,
    marginHorizontal: 4,
    ...WmpTheme.shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    ...WmpTheme.typography.caption,
    fontSize: 11,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  change: {
    fontSize: 10,
    color: WmpColors.textMuted,
    marginTop: 2,
  },
});
