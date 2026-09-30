/**
 * DEMO: Uso directo de etiquetas personalizadas <wmp-card>, <wmp-badge>, etc.
 * 
 * Gracias a TypeScript IntrinsicElements y nuestro runtime,
 * puedes escribir JSX con la sintaxis de tu propio framework:
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WmpCard } from '../framework/wmp/components/WmpCard';
import { WmpBadge } from '../framework/wmp/components/WmpBadge';
import { WmpProgress } from '../framework/wmp/components/WmpProgress';
import { WmpButton } from '../framework/wmp/components/WmpButton';

export const WmpCustomTagsDemo: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Opción 1: Etiquetas estándar WMP */}
      <WmpCard
        code="WMP-201"
        title="Creación de tickets con etiquetas personalizadas"
        description="Este componente está construido 100% sobre el framework WMP interno."
        status="in_progress"
        priority="urgent"
        progress={85}
        tags={['CustomFramework', 'Tags']}
        dueDate="Hoy"
      >
        <WmpBadge variant="status" value="in_progress" />
        <WmpProgress value={85} height={6} showLabel />
        <WmpButton title="Acción WMP" variant="outline" size="sm" />
      </WmpCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
