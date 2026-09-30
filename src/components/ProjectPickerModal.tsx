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
import { Project } from '../data/mockData';
import { WmpColors } from '../framework/wmp/theme/colors';
import { WmpTheme } from '../framework/wmp/theme';
import { WmpProgress } from '../framework/wmp/components/WmpProgress';
import { WmpButton } from '../framework/wmp/components/WmpButton';

interface ProjectPickerModalProps {
  visible: boolean;
  projects: Project[];
  activeProjectId: string;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onCreateProject: (name: string, key: string, description: string) => void;
}

export const ProjectPickerModal: React.FC<ProjectPickerModalProps> = ({
  visible,
  projects,
  activeProjectId,
  onClose,
  onSelectProject,
  onCreateProject,
}) => {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = () => {
    if (!newName.trim() || !newKey.trim()) return;
    onCreateProject(newName.trim(), newKey.trim().toUpperCase(), newDesc.trim());
    setNewName('');
    setNewKey('');
    setNewDesc('');
    setShowNewProjectForm(false);
  };

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
            <View>
              <Text style={styles.headerSubtitle}>WORKMEPLUS - GESTOR DE PROYECTOS</Text>
              <Text style={styles.headerTitle}>Seleccionar Proyecto</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {showNewProjectForm ? (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Crear Nuevo Proyecto</Text>

              <Text style={styles.label}>Nombre del Proyecto *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Mi Nueva App"
                placeholderTextColor={WmpColors.textMuted}
                value={newName}
                onChangeText={(text) => {
                  setNewName(text);
                  if (!newKey) {
                    const cleanKey = text.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
                    setNewKey(cleanKey);
                  }
                }}
              />

              <Text style={styles.label}>Clave / Código (ej: WMP, MNA) *</Text>
              <TextInput
                style={styles.input}
                placeholder="MNA"
                placeholderTextColor={WmpColors.textMuted}
                autoCapitalize="characters"
                maxLength={6}
                value={newKey}
                onChangeText={setNewKey}
              />

              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.input}
                placeholder="Objetivo del proyecto..."
                placeholderTextColor={WmpColors.textMuted}
                value={newDesc}
                onChangeText={setNewDesc}
              />

              <View style={styles.formActions}>
                <WmpButton
                  title="Volver"
                  variant="ghost"
                  size="sm"
                  onPress={() => setShowNewProjectForm(false)}
                />
                <WmpButton
                  title="Guardar Proyecto"
                  variant="primary"
                  size="sm"
                  disabled={!newName.trim() || !newKey.trim()}
                  onPress={handleCreate}
                />
              </View>
            </View>
          ) : (
            <>
              <ScrollView style={styles.projectList} showsVerticalScrollIndicator={false}>
                {projects.map((proj) => {
                  const isActive = proj.id === activeProjectId;
                  const total = proj.tasks.length;
                  const done = proj.tasks.filter((t) => t.status === 'done').length;
                  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

                  return (
                    <TouchableOpacity
                      key={proj.id}
                      activeOpacity={0.8}
                      onPress={() => {
                        onSelectProject(proj.id);
                        onClose();
                      }}
                      style={[
                        styles.projectCard,
                        isActive && styles.projectCardActive,
                      ]}
                    >
                      <View style={styles.cardTop}>
                        <View style={styles.keyBadge}>
                          <Text style={styles.keyText}>{proj.key}</Text>
                        </View>
                        <View style={styles.infoCol}>
                          <View style={styles.nameRow}>
                            <Text style={styles.projectName} numberOfLines={1}>
                              {proj.name}
                            </Text>
                            {isActive && (
                              <View style={styles.activeTag}>
                                <Text style={styles.activeTagText}>ACTIVO</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.projectDesc} numberOfLines={1}>
                            {proj.description || 'Sin descripción'}
                          </Text>
                        </View>
                      </View>

                      {/* Progress and task stats */}
                      <View style={styles.cardBottom}>
                        <View style={styles.progressRow}>
                          <Text style={styles.statsText}>
                            {done}/{total} tareas listos
                          </Text>
                          <Text style={[styles.pctText, { color: pct === 100 ? WmpColors.status.done : WmpColors.primaryLight }]}>
                            {pct}%
                          </Text>
                        </View>
                        <WmpProgress value={pct} height={5} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.footer}>
                <WmpButton
                  title="+ Nuevo Proyecto"
                  variant="outline"
                  size="md"
                  onPress={() => setShowNewProjectForm(true)}
                  style={{ width: '100%' }}
                />
              </View>
            </>
          )}
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
  projectList: {
    maxHeight: 400,
  },
  projectCard: {
    backgroundColor: WmpColors.surfaceLight,
    borderRadius: WmpTheme.radius.md,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: WmpColors.border,
  },
  projectCardActive: {
    borderColor: WmpColors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  keyBadge: {
    backgroundColor: WmpColors.surface,
    borderWidth: 1,
    borderColor: WmpColors.primary,
    borderRadius: WmpTheme.radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 10,
    minWidth: 44,
    alignItems: 'center',
  },
  keyText: {
    color: WmpColors.primaryLight,
    fontWeight: '800',
    fontSize: 12,
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  projectName: {
    fontSize: 15,
    fontWeight: '700',
    color: WmpColors.textPrimary,
    flex: 1,
  },
  activeTag: {
    backgroundColor: WmpColors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: WmpTheme.radius.full,
    marginLeft: 6,
  },
  activeTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  projectDesc: {
    fontSize: 12,
    color: WmpColors.textSecondary,
    marginTop: 2,
  },
  cardBottom: {
    marginTop: 4,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  statsText: {
    fontSize: 11,
    color: WmpColors.textMuted,
  },
  pctText: {
    fontSize: 11,
    fontWeight: '700',
  },
  footer: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: WmpColors.border,
  },
  formContainer: {
    paddingVertical: 10,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: WmpColors.textPrimary,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: WmpColors.textSecondary,
    marginBottom: 6,
    marginTop: 8,
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
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
    gap: 10,
  },
});
