import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WmpBoardProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

export const WmpBoard: React.FC<WmpBoardProps> = ({
  title,
  subtitle,
  projectCode,
  children,
  style,
}) => {
  const { isMobile, boardLayout } = useResponsive();

  const dynamicSubtitle = subtitle
    ? isMobile
      ? 'Desliza verticalmente entre estados'
      : subtitle
    : undefined;

  return (
    <View style={[styles.container, style]}>
      {title ? (
        <View style={styles.header}>
          <View>
            <View style={styles.titleRow}>
              {projectCode ? (
                <View style={styles.codeBadge}>
                  <Text style={styles.codeText}>{projectCode}</Text>
                </View>
              ) : null}
              <Text style={styles.title}>{title}</Text>
            </View>
            {dynamicSubtitle ? <Text style={styles.subtitle}>{dynamicSubtitle}</Text> : null}
          </View>
        </View>
      ) : null}

      {boardLayout === 'horizontal' ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.columnsHorizontal}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.columnsVertical}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WmpColors.background,
  },
  header: {
    paddingHorizontal: WmpTheme.spacing.lg,
    paddingTop: WmpTheme.spacing.md,
    paddingBottom: WmpTheme.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  codeBadge: {
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: WmpTheme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.4)',
    marginRight: 8,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: WmpColors.primaryLight,
  },
  title: {
    ...WmpTheme.typography.titleMedium,
  },
  subtitle: {
    ...WmpTheme.typography.caption,
  },
  columnsHorizontal: {
    paddingHorizontal: WmpTheme.spacing.lg,
    paddingVertical: WmpTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  columnsVertical: {
    paddingHorizontal: WmpTheme.spacing.md,
    paddingVertical: WmpTheme.spacing.sm,
  },
});
