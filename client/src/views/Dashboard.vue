<script setup>
import { ref, onMounted, computed } from 'vue'
import { Trophy, CheckCircle, ChevronRight, Star } from 'lucide-vue-next'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'


const matchSchedule = [
  // JORNADA 1
  { id: 1, jornada: '1', date: 'Jun 11', home: 'México', away: 'Sudáfrica', homeLogo: 'mx', awayLogo: 'za' },
  { id: 2, jornada: '1', date: 'Jun 12', home: 'Estados Unidos', away: 'Paraguay', homeLogo: 'us', awayLogo: 'py' },
  { id: 3, jornada: '1', date: 'Jun 13', home: 'Brasil', away: 'Marruecos', homeLogo: 'br', awayLogo: 'ma' },
  { id: 4, jornada: '1', date: 'Jun 16', home: 'Argentina', away: 'Argelia', homeLogo: 'ar', awayLogo: 'dz' },
  { id: 5, jornada: '1', date: 'Jun 17', home: 'Portugal', away: 'RD Congo', homeLogo: 'pt', awayLogo: 'cd' },
  { id: 6, jornada: '1', date: 'Jun 17', home: 'Inglaterra', away: 'Croacia', homeLogo: 'gb-eng', awayLogo: 'hr' },
  
  // JORNADA 2
  { id: 7, jornada: '2', date: 'Jun 18', home: 'México', away: 'Corea del Sur', homeLogo: 'mx', awayLogo: 'kr' },
  { id: 8, jornada: '2', date: 'Jun 19', home: 'Brasil', away: 'Haití', homeLogo: 'br', awayLogo: 'ht' },
  { id: 9, jornada: '2', date: 'Jun 20', home: 'Países Bajos', away: 'Suecia', homeLogo: 'nl', awayLogo: 'se' },
  { id: 10, jornada: '2', date: 'Jun 20', home: 'Alemania', away: 'Costa Marfil', homeLogo: 'de', awayLogo: 'ci' },
  { id: 11, jornada: '2', date: 'Jun 21', home: 'España', away: 'Arabia Saudita', homeLogo: 'es', awayLogo: 'sa' },
  { id: 12, jornada: '2', date: 'Jun 22', home: 'Argentina', away: 'Austria', homeLogo: 'ar', awayLogo: 'at' },

  // JORNADA 3
  { id: 13, jornada: '3', date: 'Jun 24', home: 'República Checa', away: 'México', homeLogo: 'cz', awayLogo: 'mx' },
  { id: 14, jornada: '3', date: 'Jun 24', home: 'Escocia', away: 'Brasil', homeLogo: 'gb-sct', awayLogo: 'br' },
  { id: 15, jornada: '3', date: 'Jun 26', home: 'Uruguay', away: 'España', homeLogo: 'uy', awayLogo: 'es' },
  { id: 16, jornada: '3', date: 'Jun 26', home: 'Noruega', away: 'Francia', homeLogo: 'no', awayLogo: 'fr' },
  { id: 17, jornada: '3', date: 'Jun 27', home: 'Colombia', away: 'Portugal', homeLogo: 'co', awayLogo: 'pt' },
  { id: 18, jornada: '3', date: 'Jun 27', home: 'Jordania', away: 'Argentina', homeLogo: 'jo', awayLogo: 'ar' },
]

const predictions = ref(matchSchedule.map(m => ({
  ...m,
  prediction: 'Pendiente',
  status: 'Sin completar'
})))
const totalMatches = ref(matchSchedule.length)
const completedMatches = ref(0)

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    // Fetch matches and predictions in parallel
    const [matchesRes, predsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/matches`),
      fetch(`${API_BASE_URL}/api/predictions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ])
    
    if (matchesRes.ok && predsRes.ok) {
      const matchesData = await matchesRes.json()
      const predsData = await predsRes.json()
      const userPreds = predsData.predictions || []

      if (!Array.isArray(matchesData)) {
        console.warn('matchesData is not an array:', matchesData)
        return
      }

      predictions.value = (matchesData || []).map(match => {
        if (!match) return null;
        const found = userPreds.find(p => p && p.match_id === match.id)
        
        // Format real result
        let realResult = 'Pendiente'
        if (match.home_score_real !== undefined && match.home_score_real !== null && 
            match.away_score_real !== undefined && match.away_score_real !== null) {
          realResult = `${match.home_score_real} - ${match.away_score_real}`
        }

        return {
          id: match.id || Math.random(),
          jornada: match.jornada || '?',
          date: match.date_text || '',
          home: match.home_team || '?',
          away: match.away_team || '?',
          homeLogo: match.home_logo || '',
          awayLogo: match.away_logo || '',
          prediction: found ? `${found.home_score} - ${found.away_score}` : 'Pendiente',
          realResult: realResult,
          status: found ? 'Guardado' : 'Sin completar'
        }
      }).filter(p => p !== null)

      completedMatches.value = userPreds.length
      totalMatches.value = matchesData.length
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err)
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div class="dashboard-view animate-fade-in">
    <div class="view-header">
      <div class="header-main">
        <h1 class="view-title">Mis Pronósticos</h1>
        <p class="view-subtitle">Revisa el historial de tus predicciones para la Copa del Mundo 2026.</p>
      </div>
      
      <div class="stats-cards">
        <div class="stat-card glass-card">
          <Trophy :size="20" class="stat-icon" />
          <div class="stat-content">
            <span class="stat-value">{{ completedMatches }} / {{ totalMatches }}</span>
            <span class="stat-label">Predicciones Completas</span>
          </div>
        </div>
        <div class="stat-card glass-card">
          <Star :size="20" class="stat-icon stat-icon-champion" />
          <div class="stat-content">
            <span class="stat-value">N/D</span>
            <span class="stat-label">Campeón Seleccionado</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Predictions Table -->
    <div class="table-container glass-card">
      <table class="predictions-table">
        <thead>
          <tr>
            <th>JORNADA</th>
            <th class="desktop-only">FECHA</th>
            <th>PARTIDO</th>
            <th class="text-center">PRONÓSTICO</th>
            <th class="text-center">RESULTADO</th>
            <th class="text-right">ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pred in predictions" :key="pred.id" class="table-row">
            <td class="jornada-cell">
              <span class="jornada-badge">{{ pred.jornada }}</span>
            </td>
            <td class="date-cell-wrapper">
              <div class="date-cell">
                <span>{{ pred.date }}</span>
              </div>
            </td>
            <td class="match-cell-wrapper">
              <div class="match-cell">
                <div class="team">
                  <img :src="`https://flagcdn.com/w40/${pred.homeLogo}.png`" :alt="pred.home" class="flag">
                  <span class="team-name desktop-only">{{ pred.home }}</span>
                </div>
                <span class="vs">-</span>
                <div class="team">
                  <span class="team-name desktop-only">{{ pred.away }}</span>
                  <img :src="`https://flagcdn.com/w40/${pred.awayLogo}.png`" :alt="pred.away" class="flag">
                </div>
              </div>
            </td>
            <td class="text-center">
              <span class="prediction-value">{{ pred.prediction }}</span>
            </td>
            <td class="text-center">
              <span class="real-result-value" :class="{ 'pending': pred.realResult === 'Pendiente' }">
                {{ pred.realResult }}
              </span>
            </td>
            <td class="text-right">
              <div 
                class="status-cell clickable" 
                :class="{ 'status-pending': pred.status === 'Sin completar' }"
                @click="$router.push(`/quiniela?jornada=${pred.jornada}`)"
              >
                <CheckCircle :size="16" class="status-icon" />
                <span class="desktop-only">{{ pred.status }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dashboard-footer">
      <p>¿Quieres cambiar algo? <router-link to="/quiniela" class="footer-link">Ir a la Quiniela <ChevronRight :size="16" /></router-link></p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  max-width: 1300px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  gap: 2rem;
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

.stats-cards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2.5rem;
  border-left: 4px solid var(--primary-color);
}

.stat-icon {
  color: var(--primary-color);
}

.stat-icon-champion {
  color: #CE1126;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Table Styles */
.table-container {
  padding: 1rem;
  overflow-x: auto;
}

.predictions-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.75rem;
  min-width: 800px;
}

.predictions-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.table-row {
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.table-row:hover {
  background: white;
  transform: scale(1.005);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.table-row td {
  padding: 1.25rem 1.5rem;
  vertical-align: middle;
}

.table-row td:first-child { border-radius: 8px 0 0 8px; }
.table-row td:last-child { border-radius: 0 8px 8px 0; }

.jornada-badge {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-weight: 700;
  font-size: 0.85rem;
}

.date-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

.date-icon { color: var(--primary-color); }

.match-cell {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.team {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 140px;
}

.flag {
  width: 28px;
  height: 20px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.team-name {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.vs {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  opacity: 0.5;
}

.prediction-value {
  background: var(--text-primary);
  color: white;
  padding: 0.5rem 1.25rem;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 2px;
}

.real-result-value {
  background: #f0fdf4; /* Light green background for result */
  color: #006847;
  padding: 0.5rem 1.25rem;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 2px;
  border: 1px solid #dcfce7;
}

.real-result-value.pending {
  background: #f3f4f6;
  color: #9ca3af;
  border-color: #e5e7eb;
}

.status-cell {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.85rem;
}

.clickable {
  cursor: pointer;
  transition: all 0.2s;
}

.clickable:hover {
  opacity: 0.7;
  text-decoration: underline;
}

.status-pending {
  color: #CE1126; /* Mexican Red for attention */
}

.text-center { text-align: center !important; }
.text-right { text-align: right !important; }

.dashboard-footer {
  margin-top: 4rem;
  text-align: center;
  color: var(--text-secondary);
}

.footer-link {
  color: var(--primary-color);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}

.footer-link:hover {
  transform: translateX(5px);
}

.desktop-only { display: block; }
.mobile-only { display: none; }

@media (max-width: 1024px) {
  .view-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block !important; }

  .dashboard-view {
    padding: 6rem 1rem 4rem;
  }

  .view-title { font-size: 2.2rem; }

  .table-container {
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    backdrop-filter: none;
  }

  .predictions-table {
    min-width: auto;
  }

  .predictions-table th {
    padding: 0.75rem 0.5rem;
    font-size: 0.65rem;
  }

  .table-row td {
    padding: 1rem 0.5rem;
  }

  .jornada-badge {
    padding: 0.2rem 0.4rem;
    font-size: 10px;
  }

  .date-cell {
    font-size: 11px;
  }

  .match-cell {
    gap: 0.4rem;
  }

  .team {
    min-width: auto;
    gap: 0.4rem;
  }

  .flag {
    width: 24px;
    height: 16px;
  }

  .vs {
    font-size: 10px;
    margin: 0 0.1rem;
  }

  .prediction-value {
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
    letter-spacing: 1px;
    min-width: 55px;
    display: inline-block;
  }

  .status-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
