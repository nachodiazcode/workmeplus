import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WmpHeaderProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';
import { WmpButton } from './WmpButton';

export const WmpHeader: React.FC<WmpHeaderProps> = ({
  projectName,
  projectKey,
  onOpenProjects,
  onNewTask,
  style,
}) => {
  return (
    <View style={[styles.header, style]}>
      {/* Brand & Project Selector */}
      <View style={styles.leftSection}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>WMP</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onOpenProjects}
          style={styles.projectDropdown}
        >
          <View>
            <Text style={styles.sublabel}>PROYECTO ACTUAL</Text>
            <View style={styles.projectNameRow}>
              <Text style={styles.projectName} numberOfLines={1}>
                {projectName}
              </Text>
              <Text style={styles.projectKey}>({projectKey}) ▾</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View style={styles.rightSection}>
        {onNewTask ? (
          <WmpButton
            title="+ Crear"
            variant="primary"
            size="sm"
            onPress={onNewTask}
            style={styles.createButton}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WmpTheme.spacing.lg,
    paddingVertical: WmpTheme.spacing.md,
    backgroundColor: WmpColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: WmpColors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBadge: {
    backgroundColor: WmpColors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: WmpTheme.radius.sm,
    marginRight: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  projectDropdown: {
    flex: 1,
  },
  sublabel: {
    fontSize: 9,
    fontWeight: '700',
    color: WmpColors.textMuted,
    letterSpacing: 0.8,
  },
  projectNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 15,
    fontWeight: '700',
    color: WmpColors.textPrimary,
    maxWidth: 160,
  },
  projectKey: {
    fontSize: 12,
    color: WmpColors.primaryLight,
    fontWeight: '600',
    marginLeft: 6,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButton: {
    paddingHorizontal: 12,
  },
});
