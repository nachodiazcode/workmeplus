import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// WMP Custom Framework
import {
  Wmp,
  WmpColors,
  WmpTheme,
  WmpStatus,
  WmpPriority,
  useResponsive,
} from './src/framework/wmp';

// Mock Data & Modals
import { INITIAL_PROJECTS, Project, Task } from './src/data/mockData';
import { TaskDetailModal } from './src/components/TaskDetailModal';
import { NewTaskModal } from './src/components/NewTaskModal';
import { ProjectPickerModal } from './src/components/ProjectPickerModal';

const COLUMNS: { id: WmpStatus; title: string; color: string }[] = [
  { id: 'backlog', title: 'Backlog', color: WmpColors.status.backlog },
  { id: 'todo', title: 'Por Hacer', color: WmpColors.status.todo },
  { id: 'in_progress', title: 'En Proceso', color: WmpColors.status.in_progress },
  { id: 'in_review', title: 'En Revisión', color: WmpColors.status.in_review },
  { id: 'done', title: 'Listo', color: WmpColors.status.done },
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-1');

  // Modals & Filters
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<WmpStatus>('todo');
  const [isProjectPickerOpen, setIsProjectPickerOpen] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'urgent' | 'in_progress' | 'done'>('all');

  // Responsive Layout
  const { isMobile, metricsColumns } = useResponsive();

  // Active Project
  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || projects[0];
  }, [projects, activeProjectId]);

  // Project Metrics Calculation
  const metrics = useMemo(() => {
    const tasks = activeProject.tasks;
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === 'done').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const urgent = tasks.filter((t) => t.priority === 'urgent' && t.status !== 'done').length;
    const progressPct = total > 0 ? Math.round((done / total) * 100) : 0;

    return { total, done, inProgress, urgent, progressPct };
  }, [activeProject]);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return activeProject.tasks.filter((t) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.code.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Filter Mode match
      if (filterMode === 'urgent') return t.priority === 'urgent';
      if (filterMode === 'in_progress') return t.status === 'in_progress';
      if (filterMode === 'done') return t.status === 'done';
      return true;
    });
  }, [activeProject, searchQuery, filterMode]);

  // Quick Advance Status (Backlog -> Todo -> In Progress -> Review -> Done)
  const advanceTaskStatus = (taskId: string) => {
    const statusOrder: WmpStatus[] = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          tasks: proj.tasks.map((task) => {
            if (task.id !== taskId) return task;
            const currentIndex = statusOrder.indexOf(task.status);
            const nextStatus = statusOrder[Math.min(currentIndex + 1, statusOrder.length - 1)];
            const newProgress = nextStatus === 'done' ? 100 : nextStatus === 'in_progress' ? 50 : task.progress;
            return {
              ...task,
              status: nextStatus,
              progress: newProgress,
            };
          }),
        };
      })
    );
  };

  // Update Task Status
  const handleUpdateStatus = (taskId: string, newStatus: WmpStatus) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          tasks: proj.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: newStatus, progress: newStatus === 'done' ? 100 : t.progress }
              : t
          ),
        };
      })
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Update Task Priority
  const handleUpdatePriority = (taskId: string, newPriority: WmpPriority) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          tasks: proj.tasks.map((t) => (t.id === taskId ? { ...t, priority: newPriority } : t)),
        };
      })
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, priority: newPriority } : null));
    }
  };

  // Update Task Progress
  const handleUpdateProgress = (taskId: string, newProgress: number) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          tasks: proj.tasks.map((t) => (t.id === taskId ? { ...t, progress: newProgress } : t)),
        };
      })
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, progress: newProgress } : null));
    }
  };

  // Delete Task
  const handleDeleteTask = (taskId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          tasks: proj.tasks.filter((t) => t.id !== taskId),
        };
      })
    );
  };

  // Create Task
  const handleCreateTask = (newTask: Task) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          tasks: [newTask, ...proj.tasks],
        };
      })
    );
  };

  // Create Project
  const handleCreateProject = (name: string, key: string, description: string) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      key,
      name,
      description,
      version: 'v1.0.0',
      lead: 'Ignacio Díaz',
      tasks: [],
    };
    setProjects((prev) => [...prev, newProj]);
    setActiveProjectId(newProj.id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* 1. Header con WMP Framework */}
      <Wmp.Header
        projectName={activeProject.name}
        projectKey={activeProject.key}
        onOpenProjects={() => setIsProjectPickerOpen(true)}
        onNewTask={() => {
          setNewTaskStatus('todo');
          setIsNewTaskOpen(true);
        }}
      />

      <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
        {/* 2. Métricas del Proyecto (Jira Velocity & Progress) */}
        <View style={[styles.metricsRow, isMobile && styles.metricsRowMobile]}>
          <Wmp.Metric
            title="Avance Total"
            value={`${metrics.progressPct}%`}
            change={`${metrics.done} de ${metrics.total} completadas`}
            color={metrics.progressPct === 100 ? WmpColors.status.done : WmpColors.primaryLight}
            style={isMobile ? styles.metricCardMobile : undefined}
          />
          <Wmp.Metric
            title="En Proceso"
            value={metrics.inProgress}
            change="En desarrollo activo"
            color={WmpColors.status.in_progress}
            style={isMobile ? styles.metricCardMobile : undefined}
          />
          <Wmp.Metric
            title="Urgentes"
            value={metrics.urgent}
            change={metrics.urgent > 0 ? 'Atención requerida' : 'Sin bloqueos'}
            color={metrics.urgent > 0 ? WmpColors.status.blocked : WmpColors.textMuted}
            style={isMobile ? styles.metricCardMobile : undefined}
          />
        </View>

        {/* 3. Barra de Búsqueda y Filtros Rápidos */}
        <View style={[styles.filterSection, isMobile && { paddingHorizontal: WmpTheme.spacing.md }]}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder={isMobile ? 'Buscar tarea...' : 'Buscar por título, código (WMP-101) o etiqueta...'}
              placeholderTextColor={WmpColors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearSearch}>✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPills}
          >
            <TouchableOpacity
              onPress={() => setFilterMode('all')}
              style={[styles.filterPill, filterMode === 'all' && styles.filterPillActive]}
            >
              <Text style={[styles.filterPillText, filterMode === 'all' && styles.filterPillTextActive]}>
                Todos ({activeProject.tasks.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilterMode('urgent')}
              style={[styles.filterPill, filterMode === 'urgent' && styles.filterPillActive]}
            >
              <Text style={[styles.filterPillText, filterMode === 'urgent' && styles.filterPillTextActive]}>
                🔥 Urgentes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilterMode('in_progress')}
              style={[styles.filterPill, filterMode === 'in_progress' && styles.filterPillActive]}
            >
              <Text style={[styles.filterPillText, filterMode === 'in_progress' && styles.filterPillTextActive]}>
                ⚡ En Proceso
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilterMode('done')}
              style={[styles.filterPill, filterMode === 'done' && styles.filterPillActive]}
            >
              <Text style={[styles.filterPillText, filterMode === 'done' && styles.filterPillTextActive]}>
                ✅ Listos
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* 4. Tablero Kanban con Framework WMP */}
        <Wmp.Board
          title="Tablero Kanban"
          subtitle="Desliza horizontalmente para ver todos los estados"
          projectCode={activeProject.key}
        >
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.status === col.id);

            return (
              <Wmp.Column
                key={col.id}
                id={col.id}
                title={col.title}
                status={col.id}
                count={columnTasks.length}
                color={col.color}
                onAddCard={() => {
                  setNewTaskStatus(col.id);
                  setIsNewTaskOpen(true);
                }}
              >
                {columnTasks.length === 0 ? (
                  <View style={styles.emptyColumn}>
                    <Text style={styles.emptyColumnText}>Sin tareas aquí</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setNewTaskStatus(col.id);
                        setIsNewTaskOpen(true);
                      }}
                      style={styles.addFirstBtn}
                    >
                      <Text style={styles.addFirstBtnText}>+ Agregar tarea</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  columnTasks.map((task) => (
                    <Wmp.Card
                      key={task.id}
                      id={task.id}
                      code={task.code}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      priority={task.priority}
                      progress={task.progress}
                      assignee={task.assignee}
                      tags={task.tags}
                      dueDate={task.dueDate}
                      onPress={() => setSelectedTask(task)}
                    >
                      {/* Botón rápido para avanzar de estado */}
                      {task.status !== 'done' && (
                        <View style={styles.cardActions}>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => advanceTaskStatus(task.id)}
                            style={styles.advanceBtn}
                          >
                            <Text style={styles.advanceBtnText}>Avanzar estado ➔</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Wmp.Card>
                  ))
                )}
              </Wmp.Column>
            );
          })}
        </Wmp.Board>
      </ScrollView>

      {/* Modales Interactivos */}
      <TaskDetailModal
        visible={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdatePriority={handleUpdatePriority}
        onUpdateProgress={handleUpdateProgress}
        onDeleteTask={handleDeleteTask}
      />

      <NewTaskModal
        visible={isNewTaskOpen}
        projectKey={activeProject.key}
        nextIndex={activeProject.tasks.length + 101}
        initialStatus={newTaskStatus}
        onClose={() => setIsNewTaskOpen(false)}
        onCreateTask={handleCreateTask}
      />

      <ProjectPickerModal
        visible={isProjectPickerOpen}
        projects={projects}
        activeProjectId={activeProjectId}
        onClose={() => setIsProjectPickerOpen(false)}
        onSelectProject={setActiveProjectId}
        onCreateProject={handleCreateProject}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WmpColors.background,
  },
  mainScroll: {
    flex: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: WmpTheme.spacing.lg,
    paddingTop: WmpTheme.spacing.md,
    justifyContent: 'space-between',
  },
  filterSection: {
    paddingHorizontal: WmpTheme.spacing.lg,
    paddingVertical: WmpTheme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WmpColors.surface,
    borderWidth: 1,
    borderColor: WmpColors.border,
    borderRadius: WmpTheme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: WmpColors.textPrimary,
    fontSize: 13,
  },
  clearSearch: {
    color: WmpColors.textMuted,
    fontSize: 14,
    paddingHorizontal: 6,
  },
  filterPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: WmpTheme.radius.full,
    backgroundColor: WmpColors.surfaceLight,
    borderWidth: 1,
    borderColor: WmpColors.border,
  },
  filterPillActive: {
    backgroundColor: WmpColors.primary,
    borderColor: WmpColors.primaryLight,
  },
  filterPillText: {
    fontSize: 12,
    color: WmpColors.textSecondary,
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  emptyColumn: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: WmpColors.borderSubtle,
    borderStyle: 'dashed',
    borderRadius: WmpTheme.radius.md,
  },
  emptyColumnText: {
    color: WmpColors.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  addFirstBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: WmpTheme.radius.sm,
    backgroundColor: WmpColors.surfaceLight,
  },
  addFirstBtnText: {
    color: WmpColors.primaryLight,
    fontSize: 11,
    fontWeight: '600',
  },
  cardActions: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: WmpColors.borderSubtle,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  advanceBtn: {
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: WmpTheme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  advanceBtnText: {
    color: WmpColors.primaryLight,
    fontSize: 11,
    fontWeight: '600',
  },
  // ─── Responsive Mobile Overrides ───
  metricsRowMobile: {
    flexDirection: 'column',
    paddingHorizontal: WmpTheme.spacing.md,
  },
  metricCardMobile: {
    marginHorizontal: 0,
    marginBottom: 8,
  },
});
