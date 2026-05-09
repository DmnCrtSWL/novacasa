<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MatchCard from '../components/MatchCard.vue'
import { Timer, Trophy, ChevronRight } from 'lucide-vue-next'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const router = useRouter()
const route = useRoute()

// Countdown logic
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})
const countdownFinal = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const targetDate = new Date('2026-06-11T18:00:00').getTime()
const targetDateFinal = new Date('2026-07-19T12:00:00').getTime()

const updateCountdown = () => {
  const now = new Date().getTime()
  
  const distGroup = targetDate - now
  if (distGroup > 0) {
    countdown.value.days = Math.floor(distGroup / (1000 * 60 * 60 * 24))
    countdown.value.hours = Math.floor((distGroup % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    countdown.value.minutes = Math.floor((distGroup % (1000 * 60 * 60)) / (1000 * 60))
    countdown.value.seconds = Math.floor((distGroup % (1000 * 60)) / 1000)
  }

  const distFinal = targetDateFinal - now
  if (distFinal > 0) {
    countdownFinal.value.days = Math.floor(distFinal / (1000 * 60 * 60 * 24))
    countdownFinal.value.hours = Math.floor((distFinal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    countdownFinal.value.minutes = Math.floor((distFinal % (1000 * 60 * 60)) / (1000 * 60))
    countdownFinal.value.seconds = Math.floor((distFinal % (1000 * 60)) / 1000)
  }
}

const fetchPredictions = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const res = await fetch(`${API_BASE_URL}/api/predictions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (res.ok) {
      const data = await res.json()
      
      data.predictions.forEach(pred => {
        for (const md of matchdays.value) {
          const m = md.matches.find(m => m.id === pred.match_id)
          if (m) {
            m.homeScore = pred.home_score !== null ? pred.home_score : ''
            m.awayScore = pred.away_score !== null ? pred.away_score : ''
            break
          }
        }
      })
      
      if (data.champion_id) {
        selectedChampion.value = data.champion_id
      }
    }
  } catch (err) {
    console.error('Error fetching predictions:', err)
  }
}

let timer
onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
  
  // Set matchday from query param
  if (route.query.jornada) {
    const j = parseInt(route.query.jornada)
    if (!isNaN(j) && j >= 1 && j <= matchdays.value.length) {
      currentMatchdayIndex.value = j - 1
    }
  }
  
  if (isAuthenticated.value) {
    fetchPredictions()
  }
})

watch(() => route.query.jornada, (newJ) => {
  if (newJ) {
    const j = parseInt(newJ)
    if (!isNaN(j) && j >= 1 && j <= matchdays.value.length) {
      currentMatchdayIndex.value = j - 1
    }
  }
})

onUnmounted(() => {
  clearInterval(timer)
  if (toastTimer) clearTimeout(toastTimer)
  if (redirectTimer) clearTimeout(redirectTimer)
})

const isAuthenticated = ref(!!localStorage.getItem('token'))
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

const showKnockoutPhase = ref(false)

const qualifiedTeams = ref([
  { id: 1, name: 'México', logo: 'https://flagcdn.com/w160/mx.png' },
  { id: 2, name: 'Estados Unidos', logo: 'https://flagcdn.com/w160/us.png' },
  { id: 3, name: 'Brasil', logo: 'https://flagcdn.com/w160/br.png' },
  { id: 4, name: 'Argentina', logo: 'https://flagcdn.com/w160/ar.png' },
  { id: 5, name: 'Inglaterra', logo: 'https://flagcdn.com/w160/gb-eng.png' },
  { id: 6, name: 'Francia', logo: 'https://flagcdn.com/w160/fr.png' },
  { id: 7, name: 'España', logo: 'https://flagcdn.com/w160/es.png' },
  { id: 8, name: 'Alemania', logo: 'https://flagcdn.com/w160/de.png' },
  { id: 9, name: 'Portugal', logo: 'https://flagcdn.com/w160/pt.png' },
  { id: 10, name: 'Países Bajos', logo: 'https://flagcdn.com/w160/nl.png' },
  { id: 11, name: 'Uruguay', logo: 'https://flagcdn.com/w160/uy.png' },
  { id: 12, name: 'Colombia', logo: 'https://flagcdn.com/w160/co.png' },
  { id: 13, name: 'Croacia', logo: 'https://flagcdn.com/w160/hr.png' },
  { id: 14, name: 'Marruecos', logo: 'https://flagcdn.com/w160/ma.png' },
  { id: 15, name: 'Senegal', logo: 'https://flagcdn.com/w160/sn.png' },
  { id: 16, name: 'Japón', logo: 'https://flagcdn.com/w160/jp.png' }
])

const selectedChampion = ref(null)

const selectTeam = (teamId) => {
  selectedChampion.value = teamId
}

const isSaving = ref(false)

const toast = ref({ show: false, type: 'success', message: '' })
let toastTimer = null
let redirectTimer = null

const TOAST_LEAVE_DURATION = 250 // ms, must be > toast-slide leave transition (0.2s)

const scheduleRedirect = (path) => {
  if (redirectTimer) clearTimeout(redirectTimer)
  redirectTimer = setTimeout(() => {
    redirectTimer = null
    router.push(path)
  }, TOAST_LEAVE_DURATION)
}

const showToast = (type, message, redirectAfter = null) => {
  if (toastTimer) clearTimeout(toastTimer)
  if (redirectTimer) clearTimeout(redirectTimer)
  toast.value = { show: true, type, message, redirectAfter }
  toastTimer = setTimeout(() => {
    toast.value.show = false
    if (redirectAfter) scheduleRedirect(redirectAfter)
  }, 2500)
}

const closeToast = () => {
  const pendingRedirect = toast.value.redirectAfter
  if (toastTimer) clearTimeout(toastTimer)
  if (redirectTimer) clearTimeout(redirectTimer)
  toast.value.show = false
  if (pendingRedirect) scheduleRedirect(pendingRedirect)
}

const saveAll = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    showToast('error', 'Debes iniciar sesión para guardar tus pronósticos.')
    return
  }

  isSaving.value = true
  try {
    const allMatches = []
    matchdays.value.forEach(md => {
      md.matches.forEach(m => { allMatches.push(m) })
    })

    const res = await fetch(`${API_BASE_URL}/api/predictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ matches: allMatches, champion_id: selectedChampion.value })
    })

    if (!res.ok) throw new Error('Error al guardar en el servidor')

    if (currentMatchdayIndex.value === matchdays.value.length - 1 || showKnockoutPhase.value) {
      showToast('success', '¡Todas tus predicciones se han guardado con éxito!', '/mis-pronosticos')
    } else {
      showToast('success', '¡Tu progreso ha sido guardado!')
    }
  } catch (err) {
    console.error(err)
    showToast('error', 'Hubo un error al guardar tus pronósticos.')
  } finally {
    isSaving.value = false
  }
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
      

      <template v-if="!showKnockoutPhase">
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
          :disabled="isSaving"
        >
          {{ isSaving ? 'GUARDANDO...' : (currentMatchdayIndex === matchdays.length - 1 ? 'GUARDAR TODO' : 'GUARDAR PROGRESO') }}
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
      </template>

      <!-- KNOCKOUT PHASE SELECTION -->
      <template v-else>
        <div class="knockout-phase animate-fade-in">
          <div class="view-header">
            <div class="countdown-banner glass-card animate-fade-in">
              <div class="countdown-label">
                <Timer :size="20" class="text-green" />
                <span>FINAL EN:</span>
              </div>
              <div class="countdown-timer">
                <div class="timer-unit">
                  <span class="timer-value">{{ countdownFinal.days }}</span>
                  <span class="timer-desc">DÍAS</span>
                </div>
                <div class="timer-sep">:</div>
                <div class="timer-unit">
                  <span class="timer-value">{{ String(countdownFinal.hours).padStart(2, '0') }}</span>
                  <span class="timer-desc">HORAS</span>
                </div>
                <div class="timer-sep">:</div>
                <div class="timer-unit">
                  <span class="timer-value">{{ String(countdownFinal.minutes).padStart(2, '0') }}</span>
                  <span class="timer-desc">MINS</span>
                </div>
                <div class="timer-sep">:</div>
                <div class="timer-unit">
                  <span class="timer-value">{{ String(countdownFinal.seconds).padStart(2, '0') }}</span>
                  <span class="timer-desc">SEGS</span>
                </div>
              </div>
            </div>

            <div class="title-section">
              <h1 class="view-title">Fase Final - Campeón</h1>
              <p class="view-subtitle">Selecciona al equipo que crees que será el <strong class="highlight-text">Campeón del Mundo</strong> de entre los clasificados a la siguiente ronda.</p>
            </div>
          </div>

          <div class="teams-grid">
            <div 
              v-for="team in qualifiedTeams" 
              :key="team.id"
              class="team-card glass-card"
              :class="{ 'selected': selectedChampion === team.id }"
              @click="selectTeam(team.id)"
            >
              <img :src="team.logo" :alt="team.name" class="team-logo" />
              <span class="team-name">{{ team.name }}</span>
            </div>
          </div>

          <div class="actions-footer">
            <button 
              @click="saveAll" 
              class="btn-save-all"
              :disabled="!selectedChampion || isSaving"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedChampion || isSaving }"
            >
              {{ isSaving ? 'GUARDANDO...' : 'GUARDAR PRONÓSTICO FINAL' }}
            </button>
          </div>
        </div>
      </template>
    </div>

    <teleport to="body">
      <transition name="toast-slide">
        <div v-if="toast.show" class="toast-overlay" @click.self="closeToast">
          <div class="toast-card" :class="toast.type === 'success' ? 'toast-success' : 'toast-error'">
            <div class="toast-icon">
              <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <p class="toast-message">{{ toast.message }}</p>
            <button class="toast-close" @click="closeToast">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      </transition>
    </teleport>

  </div>
</template>

<style scoped>
.quiniela-view {
  max-width: 1300px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
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

.btn-save-all:hover:not(:disabled) {
  background: #f8fafc;
  border-color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.btn-save-all:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


/* Knockout Phase */
.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}

.team-card.selected {
  border-color: var(--primary-color);
  background: rgba(0, 104, 71, 0.05);
  box-shadow: 0 10px 25px rgba(0, 104, 71, 0.15);
}

.team-logo {
  width: 80px;
  height: 53px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.team-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
  text-align: center;
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

<style>
.toast-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(3px);
}

.toast-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  max-width: 380px;
  width: calc(100% - 2rem);
  border-left: 5px solid;
  position: relative;
}

.toast-success { border-color: #006847; }
.toast-error   { border-color: #CE1126; }

.toast-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-success .toast-icon { background: rgba(0, 104, 71, 0.1); color: #006847; }
.toast-error   .toast-icon { background: rgba(206, 17, 38, 0.1); color: #CE1126; }

.toast-icon svg { width: 18px; height: 18px; }

.toast-message {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #9a9aaa;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  padding: 0;
}

.toast-close:hover { background: #f0f0f0; color: #1a1a2e; }
.toast-close svg   { width: 14px; height: 14px; }

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: opacity 0.2s ease;
}

.toast-slide-enter-active .toast-card,
.toast-slide-leave-active .toast-card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
}

.toast-slide-enter-from .toast-card,
.toast-slide-leave-to .toast-card {
  transform: scale(0.92);
  opacity: 0;
}
</style>
