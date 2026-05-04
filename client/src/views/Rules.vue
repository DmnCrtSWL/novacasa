<script setup>
import { ShieldAlert, Target, Award, Clock, Users } from 'lucide-vue-next'
</script>

<template>
  <div class="rules-view animate-fade-in">
    <div class="view-header">
      <div class="header-main">
        <h1 class="view-title">Reglas del Concurso</h1>
        <p class="view-subtitle">Todo lo que necesitas saber para participar y ganar en la quiniela.</p>
      </div>
    </div>

    <div class="rules-content">
      <div class="rules-grid">
        
        <div class="rule-card glass-card">
          <div class="icon-wrapper">
            <Users :size="24" class="icon" />
          </div>
          <h3>1. Participación y Registro</h3>
          <p>
            La participación está abierta a todos los usuarios registrados en la plataforma. Para que tus pronósticos sean válidos, debes haber completado tu registro antes de la fecha límite del torneo. Cada usuario tiene derecho a una sola cuenta. El uso de múltiples cuentas para inflar puntuaciones resultará en descalificación automática.
          </p>
        </div>

        <div class="rule-card glass-card">
          <div class="icon-wrapper">
            <Target :size="24" class="icon" />
          </div>
          <h3>2. Sistema de Puntuación</h3>
          <p>
            El sistema de puntos está diseñado para premiar la precisión de tus pronósticos. Recibirás <strong>2 puntos</strong> si aciertas el marcador exacto del partido. Si no aciertas el marcador pero logras predecir correctamente al ganador o si el partido termina en empate, recibirás <strong>1 punto</strong>. Adicionalmente, el participante que logre atinar al <strong>equipo campeón</strong> del torneo sumará un total de <strong>3 puntos extras</strong> a su clasificación final. Si fallas tus condiciones, no sumarás puntos (0 puntos).
          </p>
        </div>

        <div class="rule-card glass-card">
          <div class="icon-wrapper">
            <Clock :size="24" class="icon" />
          </div>
          <h3>3. Cierre de Pronósticos</h3>
          <p>
            Todos los pronósticos deben ser ingresados o modificados a más tardar <strong>60 minutos antes</strong> del pitazo inicial de cada partido. Una vez que este tiempo se haya cumplido, el sistema bloqueará automáticamente la edición de resultados para ese encuentro. Las predicciones guardadas después de este plazo no serán tomadas en cuenta.
          </p>
        </div>

        <div class="rule-card glass-card">
          <div class="icon-wrapper">
            <Award :size="24" class="icon" />
          </div>
          <h3>4. Premiación y Empates</h3>
          <p>
            Al finalizar el torneo, los usuarios que ocupen las tres primeras posiciones de la Tabla General serán declarados ganadores. En el caso de que dos o más participantes terminen con la misma cantidad de puntos, el desempate se realizará tomando en consideración al usuario que haya registrado sus pronósticos primero en el sistema.
          </p>
        </div>

        <div class="rule-card glass-card">
          <div class="icon-wrapper">
            <ShieldAlert :size="24" class="icon" />
          </div>
          <h3>5. Integridad del Juego</h3>
          <p>
            Cualquier intento de manipulación del sistema, aprovechamiento de errores en la plataforma, o comportamiento antideportivo será penalizado. Los administradores se reservan el derecho de modificar las reglas, anular puntuaciones sospechosas y tomar decisiones finales e inapelables sobre el desarrollo del concurso para garantizar una competencia justa.
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.rules-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
}

.view-header {
  margin-bottom: 4rem;
}

.view-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.view-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.rules-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.rules-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.rule-card {
  padding: 2rem;
  background: white;
  border-left: 4px solid var(--primary-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rule-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
}

.rule-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.rule-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
}

@media (min-width: 768px) {
  .rules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Make the first rule card span both columns if we have an odd number */
  .rule-card:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .rules-view {
    padding: 6rem 1rem 3rem;
  }
  .view-title {
    font-size: 2.25rem;
  }
}
</style>
