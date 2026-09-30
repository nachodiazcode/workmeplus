import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { WmpColumnProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

export const WmpColumn: React.FC<WmpColumnProps> = ({
  title,
  status,
  count = 0,
  color,
  onAddCard,
  children,
  style,
}) => {
  const { isMobile, isDesktop, columnWidth } = useResponsive();
  const columnColor = color || WmpColors.status[status] || WmpColors.primary;

  // On mobile, some columns start expanded by default
  const defaultExpanded = !isMobile || status === 'in_progress' || status === 'todo' || status === 'doing';
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    if (isMobile) setExpanded((prev) => !prev);
  };

  const dynamicColumnStyle = isMobile
    ? {
        width: '100%' as const,
        marginRight: 0,
        marginBottom: 10,
      }
    : {
        width: typeof columnWidth === 'number' ? columnWidth : 290,
        marginRight: WmpTheme.spacing.md,
      };

  return (
    <View style={[styles.column, dynamicColumnStyle, style]}>
      {/* Column Header */}
      <TouchableOpacity
        activeOpacity={isMobile ? 0.7 : 1}
        onPress={toggleExpanded}
        style={styles.header}
      >
        <View style={styles.titleRow}>
          <View style={[styles.statusDot, { backgroundColor: columnColor }]} />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.countBadge, { backgroundColor: `${columnColor}25` }]}>
            <Text style={[styles.countText, { color: columnColor }]}>{count}</Text>
          </View>
          {isMobile ? (
            <Text style={styles.chevron}>{expanded ? '▾' : '▸'}</Text>
          ) : null}
        </View>

        {onAddCard ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation();
              onAddCard();
            }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>

      {/* Column Content — collapsible on mobile */}
      {expanded ? (
        isMobile ? (
          <View style={styles.contentContainerMobile}>
            {children}
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            {children}
          </ScrollView>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: WmpTheme.radius.lg,
    borderWidth: 1,
    borderColor: WmpColors.border,
    padding: WmpTheme.spacing.md,
    maxHeight: undefined,
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
  chevron: {
    color: WmpColors.textMuted,
    fontSize: 14,
    marginLeft: 6,
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
  contentContainerMobile: {
    paddingBottom: 8,
  },
});
