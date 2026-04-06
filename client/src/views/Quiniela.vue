<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MatchCard from '../components/MatchCard.vue'
import { Timer, Trophy, ChevronRight } from 'lucide-vue-next'

// Countdown logic
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const targetDate = new Date('2026-06-11T18:00:00').getTime()

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }

  countdown.value.days = Math.floor(distance / (1000 * 60 * 60 * 24))
  countdown.value.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  countdown.value.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  countdown.value.seconds = Math.floor((distance % (1000 * 60)) / 1000)
}

let timer
onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const isAuthenticated = ref(false)
const isLoginMode = ref(true)

const authForm = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const handleAuthSubmit = () => {
  // Simple validation for registration passwords matching
  if (!isLoginMode.value && authForm.value.password !== authForm.value.confirmPassword) {
    alert('Las contraseñas no coinciden')
    return
  }
  // Authenticate user
  isAuthenticated.value = true
}

const toggleAuthMode = () => {
  isLoginMode.value = !isLoginMode.value
  // Reset form
  authForm.value = {
    name: '', username: '', email: '', phone: '', password: '', confirmPassword: ''
  }
}

const currentMatchdayIndex = ref(0)

const matchdays = ref([
  {
    title: 'Primera Fase',
    matches: [
      { id: 1, date: '11 de Junio, 2026', time: 'Estadio Azteca', home: 'México', away: 'Sudáfrica', homeLogo: 'https://flagcdn.com/w160/mx.png', awayLogo: 'https://flagcdn.com/w160/za.png', homeScore: '', awayScore: '' },
      { id: 2, date: '12 de Junio, 2026', time: 'SoFi Stadium', home: 'Estados Unidos', away: 'Paraguay', homeLogo: 'https://flagcdn.com/w160/us.png', awayLogo: 'https://flagcdn.com/w160/py.png', homeScore: '', awayScore: '' },
      { id: 3, date: '13 de Junio, 2026', time: 'MetLife Stadium', home: 'Brasil', away: 'Marruecos', homeLogo: 'https://flagcdn.com/w160/br.png', awayLogo: 'https://flagcdn.com/w160/ma.png', homeScore: '', awayScore: '' },
      { id: 4, date: '16 de Junio, 2026', time: 'Arrowhead Stadium', home: 'Argentina', away: 'Argelia', homeLogo: 'https://flagcdn.com/w160/ar.png', awayLogo: 'https://flagcdn.com/w160/dz.png', homeScore: '', awayScore: '' },
      { id: 5, date: '17 de Junio, 2026', time: 'NRG Stadium', home: 'Portugal', away: 'Rep. Democrática del Congo', homeLogo: 'https://flagcdn.com/w160/pt.png', awayLogo: 'https://flagcdn.com/w160/cd.png', homeScore: '', awayScore: '' },
      { id: 6, date: '17 de Junio, 2026', time: 'AT&T Stadium', home: 'Inglaterra', away: 'Croacia', homeLogo: 'https://flagcdn.com/w160/gb-eng.png', awayLogo: 'https://flagcdn.com/w160/hr.png', homeScore: '', awayScore: '' }
    ]
  },
  {
    title: 'Segunda Jornada',
    matches: [
      { id: 7, date: '18 de Junio, 2026', time: 'Estadio Akron', home: 'México', away: 'Corea del Sur', homeLogo: 'https://flagcdn.com/w160/mx.png', awayLogo: 'https://flagcdn.com/w160/kr.png', homeScore: '', awayScore: '' },
      { id: 8, date: '19 de Junio, 2026', time: 'Lincoln Financial Field', home: 'Brasil', away: 'Haití', homeLogo: 'https://flagcdn.com/w160/br.png', awayLogo: 'https://flagcdn.com/w160/ht.png', homeScore: '', awayScore: '' },
      { id: 9, date: '20 de Junio, 2026', time: 'NRG Stadium', home: 'Países Bajos', away: 'Suecia', homeLogo: 'https://flagcdn.com/w160/nl.png', awayLogo: 'https://flagcdn.com/w160/se.png', homeScore: '', awayScore: '' },
      { id: 10, date: '20 de Junio, 2026', time: 'BMO Field', home: 'Alemania', away: 'Costa de Marfil', homeLogo: 'https://flagcdn.com/w160/de.png', awayLogo: 'https://flagcdn.com/w160/ci.png', homeScore: '', awayScore: '' },
      { id: 11, date: '21 de Junio, 2026', time: 'Mercedes-Benz Stadium', home: 'España', away: 'Arabia Saudita', homeLogo: 'https://flagcdn.com/w160/es.png', awayLogo: 'https://flagcdn.com/w160/sa.png', homeScore: '', awayScore: '' },
      { id: 12, date: '22 de Junio, 2026', time: 'AT&T Stadium', home: 'Argentina', away: 'Austria', homeLogo: 'https://flagcdn.com/w160/ar.png', awayLogo: 'https://flagcdn.com/w160/at.png', homeScore: '', awayScore: '' }
    ]
  },
  {
    title: 'Tercera Jornada',
    matches: [
      { id: 13, date: '24 de Junio, 2026', time: 'Estadio Azteca', home: 'República Checa', away: 'México', homeLogo: 'https://flagcdn.com/w160/cz.png', awayLogo: 'https://flagcdn.com/w160/mx.png', homeScore: '', awayScore: '' },
      { id: 14, date: '24 de Junio, 2026', time: 'Hard Rock Stadium', home: 'Escocia', away: 'Brasil', homeLogo: 'https://flagcdn.com/w160/gb-sct.png', awayLogo: 'https://flagcdn.com/w160/br.png', homeScore: '', awayScore: '' },
      { id: 15, date: '26 de Junio, 2026', time: 'Estadio Akron', home: 'Uruguay', away: 'España', homeLogo: 'https://flagcdn.com/w160/uy.png', awayLogo: 'https://flagcdn.com/w160/es.png', homeScore: '', awayScore: '' },
      { id: 16, date: '26 de Junio, 2026', time: 'Gillette Stadium', home: 'Noruega', away: 'Francia', homeLogo: 'https://flagcdn.com/w160/no.png', awayLogo: 'https://flagcdn.com/w160/fr.png', homeScore: '', awayScore: '' },
      { id: 17, date: '27 de Junio, 2026', time: 'Hard Rock Stadium', home: 'Colombia', away: 'Portugal', homeLogo: 'https://flagcdn.com/w160/co.png', awayLogo: 'https://flagcdn.com/w160/pt.png', homeScore: '', awayScore: '' },
      { id: 18, date: '27 de Junio, 2026', time: 'AT&T Stadium', home: 'Jordania', away: 'Argentina', homeLogo: 'https://flagcdn.com/w160/jo.png', awayLogo: 'https://flagcdn.com/w160/ar.png', homeScore: '', awayScore: '' }
    ]
  }
])

const nextMatchday = () => {
  if (currentMatchdayIndex.value < matchdays.value.length - 1) {
    currentMatchdayIndex.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevMatchday = () => {
  if (currentMatchdayIndex.value > 0) {
    currentMatchdayIndex.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const saveAll = () => {
  alert('¡Todas tus predicciones se han guardado con éxito!')
}
</script>

<template>
  <div class="quiniela-view animate-fade-in">
    
    <!-- AUTHENTICATION FORM -->
    <div v-if="!isAuthenticated" class="auth-wrapper">
      <div class="auth-card glass-card">
        <div class="auth-header">
          <h2 class="auth-title">
            <span class="text-green">Qui</span>niela <span class="text-red">Nova</span>
          </h2>
          <p class="auth-subtitle">{{ isLoginMode ? 'Inicia Sesión para participar' : 'Regístrate para jugar' }}</p>
        </div>
        
        <form @submit.prevent="handleAuthSubmit" class="auth-form">
          <template v-if="!isLoginMode">
            <div class="form-row">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" v-model="authForm.name" required placeholder="Tu nombre" />
              </div>
              <div class="form-group">
                <label>Usuario</label>
                <input type="text" v-model="authForm.username" required placeholder="Tu usuario" />
              </div>
            </div>
          </template>

          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Correo Electrónico</label>
              <input type="email" v-model="authForm.email" required placeholder="correo@ejemplo.com" />
            </div>
            <template v-if="!isLoginMode">
              <div class="form-group" style="flex: 1;">
                <label>Teléfono</label>
                <input type="tel" v-model="authForm.phone" required placeholder="10 dígitos" />
              </div>
            </template>
          </div>

          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Contraseña</label>
              <input type="password" v-model="authForm.password" required placeholder="********" />
            </div>
            <template v-if="!isLoginMode">
              <div class="form-group" style="flex: 1;">
                <label>Confirmar Contraseña</label>
                <input type="password" v-model="authForm.confirmPassword" required placeholder="********" />
              </div>
            </template>
          </div>

          <button type="submit" class="btn-auth-submit">
            {{ isLoginMode ? 'ENTRAR' : 'REGISTRARSE' }}
          </button>
        </form>

        <div class="auth-footer">
          <p v-if="isLoginMode">
            ¿No tienes cuenta? <button type="button" class="btn-text" @click="toggleAuthMode">Regístrate aquí</button>
          </p>
          <p v-else>
            ¿Ya tienes cuenta? <button type="button" class="btn-text" @click="toggleAuthMode">Inicia Sesión</button>
          </p>
        </div>
      </div>
    </div>

    <!-- QUINIELA FLOW -->
    <div v-else class="quiniela-content">
      <!-- Progress Indicator -->
      <div class="progress-bar-container">
        <div 
          class="progress-bar-fill"
          :style="{ width: ((currentMatchdayIndex + 1) / matchdays.length * 100) + '%' }"
        ></div>
      </div>

    <div class="view-header">
      <div class="countdown-banner glass-card animate-fade-in">
        <div class="countdown-label">
          <Timer :size="20" class="text-green" />
          <span>INICIANDO EN:</span>
        </div>
        <div class="countdown-timer">
          <div class="timer-unit">
            <span class="timer-value">{{ countdown.days }}</span>
            <span class="timer-desc">DÍAS</span>
          </div>
          <div class="timer-sep">:</div>
          <div class="timer-unit">
            <span class="timer-value">{{ String(countdown.hours).padStart(2, '0') }}</span>
            <span class="timer-desc">HORAS</span>
          </div>
          <div class="timer-sep">:</div>
          <div class="timer-unit">
            <span class="timer-value">{{ String(countdown.minutes).padStart(2, '0') }}</span>
            <span class="timer-desc">MINS</span>
          </div>
          <div class="timer-sep">:</div>
          <div class="timer-unit">
            <span class="timer-value">{{ String(countdown.seconds).padStart(2, '0') }}</span>
            <span class="timer-desc">SEGS</span>
          </div>
        </div>
      </div>
      
      <div class="title-section">
        <h1 class="view-title">Quiniela Mundialista</h1>
        <p class="view-subtitle">
          Realiza tus predicciones para la Fase de Grupos - 
          <strong class="highlight-text">{{ matchdays[currentMatchdayIndex].title }}</strong>
        </p>
      </div>
    </div>

    <!-- Matchday Pages -->
    <div class="matchday-wrapper">
      <transition name="slide-fade" mode="out-in">
        <div :key="currentMatchdayIndex" class="matchday-container">
          <div class="matches-grid">
            <MatchCard 
              v-for="match in matchdays[currentMatchdayIndex].matches" 
              :key="match.id" 
              :match="match" 
            />
          </div>
        </div>
      </transition>
    </div>

    <div class="actions-footer">
      <button 
        v-if="currentMatchdayIndex > 0" 
        @click="prevMatchday" 
        class="btn-secondary"
      >
        ANTERIOR
      </button>

      <button 
        @click="saveAll" 
        class="btn-save-all"
      >
        {{ currentMatchdayIndex === matchdays.length - 1 ? 'GUARDAR TODO' : 'GUARDAR PROGRESO' }}
      </button>

      <button 
        v-if="currentMatchdayIndex < matchdays.length - 1" 
        @click="nextMatchday" 
        class="btn-primary btn-next-flow"
      >
        SIGUIENTE JORNADA
        <ChevronRight :size="20" />
      </button>
    </div>
    </div>
  </div>
</template>

<style scoped>
.quiniela-view {
  max-width: 1300px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
  min-height: 100vh;
}

/* Authentication Styles (Green, White, Red) */
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.auth-card {
  width: 100%;
  max-width: 500px;
  padding: 3rem;
  background: white;
  border-top: 4px solid #006847;
  border-bottom: 4px solid #CE1126;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}

.auth-header {
  margin-bottom: 2.5rem;
}

.auth-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.text-green { color: #006847; }
.text-red { color: #CE1126; }

.auth-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-row > * {
  flex: 1 1 calc(50% - 0.5rem);
  min-width: 200px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group input {
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #006847;
  box-shadow: 0 0 0 3px rgba(0, 104, 71, 0.1);
}

.btn-auth-submit {
  background: linear-gradient(135deg, #006847, #004d35);
  color: white;
  border: none;
  padding: 1.25rem;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-auth-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 104, 71, 0.2);
}

.auth-footer {
  margin-top: 2rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.btn-text {
  color: #CE1126;
  font-weight: 700;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.btn-text:hover {
  color: #a80e1f;
}

/* Base Styles */
.progress-bar-container {
  width: 100%;
  height: 6px;
  background: var(--border-color);
  margin-bottom: 3rem;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-header {
  margin-bottom: 4rem;
  text-align: left;
}

.view-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.view-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.highlight-text {
  color: var(--primary-color);
}

/* Countdown Styles */
.countdown-banner {
  margin-bottom: 3rem;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 6px solid #006847;
  background: rgba(255, 255, 255, 0.8);
}

.countdown-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.countdown-timer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.timer-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}

.timer-value {
  font-size: 2.25rem;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  color: var(--text-primary);
  line-height: 1;
}

.timer-desc {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 1px;
  margin-top: 0.25rem;
}

.timer-sep {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--border-color);
  margin-bottom: 1.25rem;
}

.title-section {
  margin-top: 1rem;
}

.btn-next-flow {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 3.5rem;
}

.matchday-wrapper {
  min-height: 50vh; /* keeps layout stable during transitions */
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
}

.actions-footer {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-color);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  padding: 1.25rem 3rem;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
}

.btn-secondary:hover {
  border-color: var(--text-primary);
  background: var(--bg-secondary);
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1.25rem 4rem;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px var(--primary-glow);
}

.btn-save-all {
  background: white;
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  padding: 1.25rem 3rem;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
}

.btn-save-all:hover {
  background: #f8fafc;
  border-color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

@media (max-width: 768px) {
  .view-title {
    font-size: 2.25rem;
  }
  .actions-footer {
    flex-direction: column-reverse;
  }
  .btn-primary, .btn-secondary, .btn-save-all {
    width: 100%;
  }
}
</style>
