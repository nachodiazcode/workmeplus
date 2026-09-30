import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { WmpColors } from '../framework/wmp/theme/colors';
import { WmpTheme } from '../framework/wmp/theme';
import { WmpButton } from '../framework/wmp/components/WmpButton';
import { WmpStatus, WmpPriority } from '../framework/wmp/types';
import { Task } from '../data/mockData';

interface NewTaskModalProps {
  visible: boolean;
  projectKey: string;
  nextIndex: number;
  initialStatus?: WmpStatus;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
}

const ALL_STATUSES: { key: WmpStatus; label: string }[] = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'todo', label: 'Por Hacer' },
  { key: 'in_progress', label: 'En Proceso' },
  { key: 'in_review', label: 'Revisión' },
  { key: 'done', label: 'Listo' },
];

const ALL_PRIORITIES: { key: WmpPriority; label: string }[] = [
  { key: 'urgent', label: 'Urgente' },
  { key: 'high', label: 'Alta' },
  { key: 'medium', label: 'Media' },
  { key: 'low', label: 'Baja' },
];

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  visible,
  projectKey,
  nextIndex,
  initialStatus = 'todo',
  onClose,
  onCreateTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<WmpStatus>(initialStatus);
  const [priority, setPriority] = useState<WmpPriority>('medium');
  const [tagInput, setTagInput] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;

    const code = `${projectKey}-${nextIndex}`;
    const tags = tagInput
      ? tagInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['WMP'];

    const newTask: Task = {
      id: `task-${Date.now()}`,
      code,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      progress: status === 'done' ? 100 : status === 'in_progress' ? 40 : 0,
      assignee: { name: 'Ignacio Díaz' },
      tags,
      dueDate: 'Esta semana',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreateTask(newTask);
    setTitle('');
    setDescription('');
    setTagInput('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerSubtitle}>NUEVA TAREA / ISSUE</Text>
              <Text style={styles.headerTitle}>
                Crear en {projectKey} ({projectKey}-{nextIndex})
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text style={styles.label}>Título de la Tarea *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Integrar API de autenticación"
              placeholderTextColor={WmpColors.textMuted}
              value={title}
              onChangeText={setTitle}
            />

            {/* Description */}
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Detalles sobre requerimientos, criterios de aceptación..."
              placeholderTextColor={WmpColors.textMuted}
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />

            {/* Status */}
            <Text style={styles.label}>Estado Inicial</Text>
            <View style={styles.pillRow}>
              {ALL_STATUSES.map((s) => {
                const isActive = status === s.key;
                const color = WmpColors.status[s.key];
                return (
                  <TouchableOpacity
                    key={s.key}
                    onPress={() => setStatus(s.key)}
                    style={[
                      styles.pill,
                      {
                        borderColor: isActive ? color : WmpColors.border,
                        backgroundColor: isActive ? `${color}25` : WmpColors.surfaceLight,
                      },
                    ]}
                  >
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

            {/* Priority */}
            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.pillRow}>
              {ALL_PRIORITIES.map((p) => {
                const isActive = priority === p.key;
                const color = WmpColors.priority[p.key];
                return (
                  <TouchableOpacity
                    key={p.key}
                    onPress={() => setPriority(p.key)}
                    style={[
                      styles.pill,
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

            {/* Tags */}
            <Text style={styles.label}>Etiquetas (separadas por coma)</Text>
            <TextInput
              style={styles.input}
              placeholder="UI, Core, Backend, Bug"
              placeholderTextColor={WmpColors.textMuted}
              value={tagInput}
              onChangeText={setTagInput}
            />
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <WmpButton
              title="Cancelar"
              variant="ghost"
              size="md"
              onPress={onClose}
              style={{ marginRight: 8 }}
            />
            <WmpButton
              title="Crear Tarea"
              variant="primary"
              size="md"
              disabled={!title.trim()}
              onPress={handleCreate}
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
    maxWidth: 520,
    maxHeight: '90%',
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
  headerSubtitle: {
    ...WmpTheme.typography.caption,
    fontSize: 10,
    letterSpacing: 0.8,
  },
  headerTitle: {
    ...WmpTheme.typography.titleMedium,
    marginTop: 2,
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
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: WmpColors.textSecondary,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: WmpColors.surfaceLight,
    borderWidth: 1,
    borderColor: WmpColors.border,
    borderRadius: WmpTheme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: WmpColors.textPrimary,
    fontSize: 14,
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: WmpTheme.radius.full,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: WmpColors.border,
  },
});
