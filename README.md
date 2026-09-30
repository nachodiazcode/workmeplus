# WorkMePlus (WMP) 🚀

**WorkMePlus (WMP)** es una aplicación móvil y web construida en **React Native + Expo + TypeScript**, inspirada en **Jira**, diseñada para organizar tus proyectos, monitorear sus estados de avance, calcular métricas de completitud y gestionar flujos ágiles.

Además, cuenta con su propio **Framework de Componentes y Etiquetas Personalizadas WMP (`<wmp-*>` y `Wmp.*`)**.

---

## 🎨 WMP UI Framework

El framework propio está ubicado en [`src/framework/wmp/`](./src/framework/wmp/):

| Componente | Etiqueta Personalizada | Uso |
|---|---|---|
| Tarjeta Jira | `<Wmp.Card>` / `<wmp-card>` | Tarjeta de tarea con código de ticket (ej: `WMP-101`), prioridad, progreso y responsable. |
| Columna Kanban | `<Wmp.Column>` / `<wmp-column>` | Columna de estado (Backlog, Por Hacer, En Proceso, Revisión, Listo). |
| Tablero General | `<Wmp.Board>` / `<wmp-board>` | Contenedor del tablero con desplazamiento horizontal. |
| Badge de Estado | `<Wmp.Badge>` / `<wmp-badge>` | Etiquetas de estado dinámicas con colores del sistema. |
| Barra de Progreso | `<Wmp.Progress>` / `<wmp-progress>` | Barra de avance porcentual con transiciones. |
| Botón de Acción | `<Wmp.Button>` / `<wmp-button>` | Botones estilizados (primary, secondary, outline, danger). |
| Métricas | `<Wmp.Metric>` / `<wmp-metric>` | Tarjetas de KPI (velocidad, avance %, tareas urgentes). |
| Avatar | `<Wmp.Avatar>` / `<wmp-avatar>` | Iniciales y colores automáticos por responsable. |
| Cabecera | `<Wmp.Header>` / `<wmp-header>` | Selector de proyecto y acciones rápidas. |

---

## 🚀 Cómo ejecutar la aplicación

Dentro del directorio del proyecto:

```bash
cd /Users/ignaciodiaz/Documents/Codex/2026-09-11/crea-una-imagen-de/apps/workmeplus
```

### 1. En el Navegador Web (Inmediato):
```bash
npm run web
```
Abre automáticamente tu navegador en `http://localhost:8081` para interactuar con la app.

### 2. En tu celular (iOS / Android):
```bash
npm run start
```
Escanea el código QR desde la aplicación **Expo Go** en tu iPhone o dispositivo Android.

---

## 📁 Estructura del Proyecto

```
workmeplus/
├── src/
│   ├── framework/wmp/          # 💎 Core del Framework WMP
│   │   ├── components/         # WmpCard, WmpBoard, WmpColumn, WmpBadge...
│   │   ├── theme/              # Paleta oscura Jira, sombras, radios y tipografía
│   │   ├── types.ts            # Tipos de TypeScript
│   │   ├── wmp-jsx.d.ts        # Declaraciones JSX globales para <wmp-*>
│   │   ├── jsx-runtime.ts      # Motor JSX para interceptar custom tags
│   │   └── index.ts            # Exportador central
│   ├── data/
│   │   └── mockData.ts         # Datos de tus proyectos (WorkMePlus, Templa, Sendero Azul, Lúpulos...)
│   └── components/
│       ├── TaskDetailModal.tsx # Modal para editar estado, prioridad y progreso de tareas
│       ├── NewTaskModal.tsx    # Modal para crear nuevos tickets
│       └── ProjectPickerModal.tsx # Selector y creador de proyectos
├── App.tsx                     # Pantalla principal con tablero Kanban y métricas
└── package.json
```
