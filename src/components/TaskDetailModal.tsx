import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Task } from '../data/mockData';
import { WmpColors } from '../framework/wmp/theme/colors';
import { WmpTheme } from '../framework/wmp/theme';
import { WmpBadge } from '../framework/wmp/components/WmpBadge';
import { WmpProgress } from '../framework/wmp/components/WmpProgress';
import { WmpButton } from '../framework/wmp/components/WmpButton';
import { WmpStatus, WmpPriority } from '../framework/wmp/types';

interface TaskDetailModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdateStatus: (taskId: string, newStatus: WmpStatus) => void;
  onUpdatePriority: (taskId: string, newPriority: WmpPriority) => void;
  onUpdateProgress: (taskId: string, newProgress: number) => void;
  onDeleteTask: (taskId: string) => void;
}

const ALL_STATUSES: { key: WmpStatus; label: string }[] = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'todo', label: 'Por Hacer' },
  { key: 'in_progress', label: 'En Proceso' },
  { key: 'in_review', label: 'Revisión' },
  { key: 'done', label: 'Listo' },
  { key: 'blocked', label: 'Bloqueado' },
];

const ALL_PRIORITIES: { key: WmpPriority; label: string }[] = [
  { key: 'urgent', label: 'Urgente' },
  { key: 'high', label: 'Alta' },
  { key: 'medium', label: 'Media' },
  { key: 'low', label: 'Baja' },
];

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible,
  task,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
  onUpdateProgress,
  onDeleteTask,
}) => {
  if (!task) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleInfo}>
              <Text style={styles.codeText}>{task.code}</Text>
              <WmpBadge variant="status" value={task.status} size="sm" />
              <WmpBadge variant="priority" value={task.priority} size="sm" style={{ marginLeft: 6 }} />
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Title & Description */}
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDescription}>{task.description || 'Sin descripción detallada.'}</Text>

            {/* Progress Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>Progreso de la tarea</Text>
                <Text style={styles.sectionValue}>{task.progress}%</Text>
              </View>
              <WmpProgress value={task.progress} height={8} />

              <View style={styles.progressPresets}>
                {[0, 25, 50, 75, 100].map((p) => (
                  <TouchableOpacity
                    key={p}
                    onPress={() => onUpdateProgress(task.id, p)}
                    style={[
                      styles.presetBtn,
                      task.progress === p && styles.presetBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.presetText,
                        task.progress === p && styles.presetTextActive,
                      ]}
                    >
                      {p}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Change Status */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Cambiar Estado (Flujo Jira)</Text>
              <View style={styles.pillGrid}>
                {ALL_STATUSES.map((s) => {
                  const isActive = task.status === s.key;
                  const color = WmpColors.status[s.key];
                  return (
                    <TouchableOpacity
                      key={s.key}
                      onPress={() => onUpdateStatus(task.id, s.key)}
                      style={[
                        styles.statusPill,
                        {
                          borderColor: isActive ? color : WmpColors.border,
                          backgroundColor: isActive ? `${color}25` : WmpColors.surfaceLight,
                        },
                      ]}
                    >
                      <View style={[styles.dot, { backgroundColor: color }]} />
                      <Text
                        style={[
                          styles.pillText,
                          { color: isActive ? '#FFFFFF' : WmpColors.textSecondary, fontWeight: isActive ? '700' : '500' },
                        ]}
                      >
                        {s.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Change Priority */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Prioridad</Text>
              <View style={styles.pillGrid}>
                {ALL_PRIORITIES.map((p) => {
                  const isActive = task.priority === p.key;
                  const color = WmpColors.priority[p.key];
                  return (
                    <TouchableOpacity
                      key={p.key}
                      onPress={() => onUpdatePriority(task.id, p.key)}
                      style={[
                        styles.priorityPill,
                        {
                          borderColor: isActive ? color : WmpColors.border,
                          backgroundColor: isActive ? `${color}25` : WmpColors.surfaceLight,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          { color: isActive ? color : WmpColors.textSecondary, fontWeight: isActive ? '700' : '500' },
                        ]}
                      >
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Details info */}
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>👤 Responsable: <Text style={{ color: WmpColors.textPrimary }}>{task.assignee.name}</Text></Text>
              <Text style={styles.metaText}>📅 Entrega: <Text style={{ color: WmpColors.textPrimary }}>{task.dueDate}</Text></Text>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <WmpButton
              title="Eliminar"
              variant="danger"
              size="sm"
              onPress={() => {
                onDeleteTask(task.id);
                onClose();
              }}
            />
            <WmpButton
              title="Cerrar"
              variant="secondary"
              size="sm"
              onPress={onClose}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '85%',
    backgroundColor: WmpColors.surface,
    borderRadius: WmpTheme.radius.xl,
    borderWidth: 1,
    borderColor: WmpColors.border,
    padding: 20,
    ...WmpTheme.shadows.modal,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: WmpColors.border,
  },
  titleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    ...WmpTheme.typography.code,
    fontSize: 13,
    marginRight: 8,
  },
  closeBtn: {
    padding: 6,
  },
  closeBtnText: {
    color: WmpColors.textSecondary,
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    flexGrow: 0,
  },
  taskTitle: {
    ...WmpTheme.typography.titleMedium,
    fontSize: 18,
    marginBottom: 8,
  },
  taskDescription: {
    ...WmpTheme.typography.bodyMedium,
    marginBottom: 18,
  },
  section: {
    marginBottom: 18,
    backgroundColor: WmpColors.surfaceLight,
    padding: 12,
    borderRadius: WmpTheme.radius.md,
    borderWidth: 1,
    borderColor: WmpColors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionLabel: {
    ...WmpTheme.typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionValue: {
    fontSize: 13,
    fontWeight: '700',
    color: WmpColors.primaryLight,
  },
  progressPresets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  presetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: WmpTheme.radius.sm,
    backgroundColor: WmpColors.surface,
    borderWidth: 1,
    borderColor: WmpColors.border,
  },
  presetBtnActive: {
    borderColor: WmpColors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.3)',
  },
  presetText: {
    fontSize: 11,
    color: WmpColors.textSecondary,
    fontWeight: '600',
  },
  presetTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: WmpTheme.radius.full,
    borderWidth: 1,
  },
  priorityPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: WmpTheme.radius.full,
    borderWidth: 1,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  pillText: {
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: WmpColors.border,
  },
  metaText: {
    fontSize: 12,
    color: WmpColors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: WmpColors.border,
  },
});
