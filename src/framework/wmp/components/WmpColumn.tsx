import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { WmpColumnProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';

export const WmpColumn: React.FC<WmpColumnProps> = ({
  title,
  status,
  count = 0,
  color,
  onAddCard,
  children,
  style,
}) => {
  const columnColor = color || WmpColors.status[status] || WmpColors.primary;

  return (
    <View style={[styles.column, style]}>
      {/* Column Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.statusDot, { backgroundColor: columnColor }]} />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.countBadge, { backgroundColor: `${columnColor}25` }]}>
            <Text style={[styles.countText, { color: columnColor }]}>{count}</Text>
          </View>
        </View>

        {onAddCard ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onAddCard}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Column Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    width: 290,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: WmpTheme.radius.lg,
    borderWidth: 1,
    borderColor: WmpColors.border,
    padding: WmpTheme.spacing.md,
    marginRight: WmpTheme.spacing.md,
    maxHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: WmpTheme.spacing.md,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: WmpColors.borderSubtle,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: WmpColors.textPrimary,
    marginRight: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countBadge: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: WmpTheme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
  addButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: WmpColors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: WmpColors.border,
  },
  addButtonText: {
    color: WmpColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
