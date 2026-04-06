<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="mexican-bar"></div>
  <nav class="navbar animate-fade-in">
    <div class="nav-container header-white">
      <router-link to="/" class="logo">
        <img src="/logo.png" alt="Nova Casa Logo" class="nav-logo-img" />
      </router-link>

      <div class="nav-links">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/mis-pronosticos" class="nav-link">Mis Pronósticos</router-link>
        <router-link to="/tabla-general" class="nav-link">Tabla General</router-link>
        <router-link to="/reglas" class="nav-link">Reglas</router-link>
      </div>

      <div class="nav-actions">
        <button v-if="!isMenuOpen" class="mobile-menu" @click="toggleMenu">
          <Menu :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <div v-if="isMenuOpen" class="mobile-overlay" @click="closeMenu"></div>
    <div :class="['mobile-drawer', { 'is-open': isMenuOpen }]">
      <button class="close-drawer" @click="closeMenu">
        <X :size="28" />
      </button>
      <div class="mobile-drawer-content">
        <router-link to="/" class="mobile-nav-link" @click="closeMenu">Inicio</router-link>
        <router-link to="/mis-pronosticos" class="mobile-nav-link" @click="closeMenu">Mis Pronósticos</router-link>
        <router-link to="/tabla-general" class="mobile-nav-link" @click="closeMenu">Tabla General</router-link>
        <router-link to="/reglas" class="mobile-nav-link" @click="closeMenu">Reglas</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.mexican-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 2001;
  background: linear-gradient(to right, #006847 33.33%, #ffffff 33.33%, #ffffff 66.66%, #CE1126 66.66%);
}

.navbar {
  position: fixed;
  top: 1.5rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2000;
  padding: 0 1rem;
}

.nav-container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  border-radius: 0;
}

.header-white {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.nav-logo-img {
  height: 45px;
  width: auto;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.nav-link:hover, .router-link-active {
  color: var(--primary-color);
}

.nav-actions {
  display: flex;
  align-items: center;
}

.mobile-menu {
  display: none;
  z-index: 1002;
  transition: all 0.3s ease;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: white;
  z-index: 2005;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  padding: 6rem 2rem 2rem;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
}

.close-drawer {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: var(--text-primary);
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.close-drawer:hover {
  color: var(--primary-color);
  transform: rotate(90deg);
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1004;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.mobile-drawer.is-open {
  right: 0;
}

.mobile-drawer-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mobile-nav-link {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.mobile-nav-link:hover, .mobile-nav-link.router-link-active {
  color: var(--primary-color);
  padding-left: 10px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .mobile-menu {
    display: block;
    color: var(--text-primary);
    padding: 0.5rem;
  }
  .nav-container {
    padding: 0.75rem 1.5rem;
  }
}
</style>
