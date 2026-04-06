<template>
  <div class="placeholder-view animate-fade-in">
    <h1>{{ title }}</h1>
    <p>Esta sección está en desarrollo.</p>
    <router-link to="/" class="back-link">Volver al Inicio</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => {
  if (route.path === '/reglas') return 'Reglas de la Quiniela'
  if (route.path === '/tabla-general') return 'Tabla General - Leaderboard'
  return 'Próximamente'
})
</script>

<style scoped>
.placeholder-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12rem 2rem;
  text-align: center;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

p {
  color: var(--text-secondary);
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.back-link {
  color: var(--primary-color);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
}
</style>
