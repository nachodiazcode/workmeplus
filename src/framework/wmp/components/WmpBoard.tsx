import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WmpBoardProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';

export const WmpBoard: React.FC<WmpBoardProps> = ({
  title,
  subtitle,
  projectCode,
  children,
  style,
}) => {
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
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>
      ) : null}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.columnsContainer}
      >
        {children}
      </ScrollView>
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
  columnsContainer: {
    paddingHorizontal: WmpTheme.spacing.lg,
    paddingVertical: WmpTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
