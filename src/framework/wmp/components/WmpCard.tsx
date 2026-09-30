import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WmpCardProps } from '../types';
import { WmpColors } from '../theme/colors';
import { WmpTheme } from '../theme';
import { WmpBadge } from './WmpBadge';
import { WmpProgress } from './WmpProgress';
import { WmpAvatar } from './WmpAvatar';
import { WmpTag } from './WmpTag';

export const WmpCard: React.FC<WmpCardProps> = ({
  code,
  title,
  description,
  status,
  priority,
  progress,
  assignee,
  tags,
  dueDate,
  selected = false,
  onPress,
  style,
  children,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.cardSelected,
        style,
      ]}
    >
      {/* If simple custom children are passed without standard props, render them directly */}
      {children && !title && !code ? (
        children
      ) : (
        <>
          {/* Card Header: Code & Priority */}
          <View style={styles.header}>
            <View style={styles.codeRow}>
              {code ? (
                <Text style={styles.codeText}>{code}</Text>
              ) : null}
              {status ? (
                <WmpBadge
                  variant="status"
                  value={status}
                  size="sm"
                  style={{ marginLeft: code ? 6 : 0 }}
                />
              ) : null}
            </View>

            {priority ? (
              <WmpBadge variant="priority" value={priority} size="sm" />
            ) : null}
          </View>

          {/* Title */}
          {title ? (
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          ) : null}

          {/* Optional Description */}
          {description ? (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          ) : null}

          {/* Optional Custom Content */}
          {children}

          {/* Progress Bar (if provided) */}
          {typeof progress === 'number' ? (
            <View style={styles.progressContainer}>
              <WmpProgress value={progress} height={4} showLabel />
            </View>
          ) : null}

          {/* Footer: Tags, Due Date & Assignee */}
          <View style={styles.footer}>
            <View style={styles.tagsContainer}>
              {tags && tags.slice(0, 2).map((t, idx) => (
                <WmpTag key={idx} label={t} />
              ))}
              {dueDate ? (
                <Text style={styles.dueDateText}>📅 {dueDate}</Text>
              ) : null}
            </View>

            {assignee?.name ? (
              <WmpAvatar name={assignee.name} size={24} />
            ) : null}
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: WmpColors.surface,
    borderRadius: WmpTheme.radius.md,
    padding: WmpTheme.spacing.md,
    marginBottom: WmpTheme.spacing.md,
    borderWidth: 1,
    borderColor: WmpColors.border,
    ...WmpTheme.shadows.card,
  },
  cardSelected: {
    borderColor: WmpColors.primary,
    backgroundColor: WmpColors.surfaceElevated,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    ...WmpTheme.typography.code,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: WmpColors.textPrimary,
    lineHeight: 20,
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: WmpColors.textSecondary,
    lineHeight: 17,
    marginBottom: 10,
  },
  progressContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  dueDateText: {
    fontSize: 10,
    color: WmpColors.textMuted,
    marginRight: 6,
  },
});
