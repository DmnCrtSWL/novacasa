<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <footer class="app-footer">
      <div class="footer-content glass-card">
        <div class="footer-info">
          <h3>Quiniela Mundialista Nova Casa 2026</h3>
          <p>© 2026 Todos los derechos reservados. El juego es para mayores de 18 años.</p>
        </div>
        <div class="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.app-footer {
  padding: 4rem 2rem 2rem;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
}

.footer-content {
  background: #f8fafc;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0;
  border: 1px solid var(--border-color);
}

.footer-info h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.footer-info p {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 2rem;
  }
}
</style>
