<script setup>
import { ref, onMounted } from 'vue'
import { Medal, Award, TrendingUp } from 'lucide-vue-next'

const leaderboard = ref([])

onMounted(() => {
  // Generate 100 random users
  const firstNames = ['Carlos', 'Ana', 'Luis', 'Maria', 'Jose', 'Juan', 'Diego', 'Sofia', 'Jorge', 'Elena', 'Fernando', 'Ricardo', 'Alejandro', 'Daniela', 'Miguel']
  const lastNames = ['Gomez', 'Rodriguez', 'Cortes', 'Perez', 'Lopez', 'Martinez', 'Hernandez', 'Garcia', 'Gonzalez', 'Ruiz']
  
  const generated = []
  
  // Create a realistic spread of scores (max points ~36 if 18 matches, let's say max around 32 for realism)
  for (let i = 0; i < 100; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)]
    
    // Most users fall in the middle bell curve, few at the top
    let baseScore = Math.floor(Math.random() * 15) + 8 // 8 to 22
    if (Math.random() > 0.8) baseScore += Math.floor(Math.random() * 10) // Boost top 20%
    if (i === 0) baseScore = 32 // Ensure some high scores
    if (i === 1) baseScore = 30
    if (i === 2) baseScore = 29
    
    generated.push({
      id: i + 1,
      name: `${fName} ${lName}`,
      username: `@${fName.toLowerCase()}${Math.floor(Math.random() * 999)}`,
      points: baseScore
    })
  }
  
  // Sort descending by points
  generated.sort((a, b) => b.points - a.points)
  
  // Assign rank considering ties
  let currentRank = 1
  for (let i = 0; i < generated.length; i++) {
    if (i > 0 && generated[i].points < generated[i - 1].points) {
      currentRank = i + 1
    }
    generated[i].rank = currentRank
  }
  
  leaderboard.value = generated
})

const getMedalColor = (rank) => {
  if (rank === 1) return '#F59E0B' // Gold
  if (rank === 2) return '#94A3B8' // Silver
  if (rank === 3) return '#B45309' // Bronze
  return ''
}
</script>

<template>
  <div class="leaderboard-view animate-fade-in">
    <div class="view-header">
      <div class="header-main">
        <h1 class="view-title">Tabla General</h1>
        <p class="view-subtitle">Top 100 Clasificación - Los mejores pronósticos del torneo.</p>
      </div>
      
      <div class="rules-card glass-card">
        <div class="rules-info">
          <span class="rule"><Award :size="16" /> <b>2 pts:</b> Marcador exacto.</span>
          <span class="rule"><TrendingUp :size="16" /> <b>1 pt:</b> Atinar ganador/empate.</span>
        </div>
      </div>
    </div>

    <!-- Leaderboard Table -->
    <div class="table-container glass-card">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th class="rank-col">POS</th>
            <th>USUARIO</th>
            <th class="points-col">PUNTOS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in leaderboard" :key="user.id" class="table-row" :class="{'top-tier': user.rank <= 3}">
            <td class="rank-col">
              <div class="rank-badge" :class="`rank-${user.rank}`">
                <Medal v-if="user.rank <= 3" :size="20" :color="getMedalColor(user.rank)" class="medal-icon" />
                <span v-else>{{ user.rank }}</span>
              </div>
            </td>
            <td>
              <div class="user-info">
                <div class="avatar" :class="{'avatar-gold': user.rank === 1, 'avatar-silver': user.rank === 2, 'avatar-bronze': user.rank === 3}">
                  {{ user.name.charAt(0) }}
                </div>
                <div class="user-details">
                  <span class="user-name">{{ user.name }}</span>
                  <span class="user-handle">{{ user.username }}</span>
                </div>
              </div>
            </td>
            <td class="points-col">
              <span class="points-value">{{ user.points }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.leaderboard-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
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

.rules-card {
  padding: 1rem 1.5rem;
  background: white;
  border-left: 4px solid var(--primary-color);
}

.rules-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rule {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Table Styles */
.table-container {
  padding: 1rem;
  background: white;
}

.leaderboard-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.leaderboard-table th {
  padding: 1.5rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-bottom: 1px solid var(--border-color);
}

.table-row {
  transition: all 0.2s ease;
}

.table-row:hover {
  background: #f8fafc;
}

.table-row.top-tier {
  background: linear-gradient(to right, rgba(245, 158, 11, 0.05), transparent);
}
.table-row.top-tier:hover {
  background: linear-gradient(to right, rgba(245, 158, 11, 0.08), transparent);
}

.table-row td {
  padding: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid var(--border-color);
}

.table-row:last-child td {
  border-bottom: none;
}

.rank-col {
  width: 80px;
  text-align: center;
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-weight: 800;
  font-size: 1rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
}

.rank-1, .rank-2, .rank-3 {
  background: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.points-col {
  text-align: right;
  width: 120px;
  padding-right: 2rem !important;
}

.points-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  font-family: 'Outfit', sans-serif;
}

.top-tier .points-value {
  color: var(--primary-color);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--text-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
}

.avatar-gold { background: linear-gradient(135deg, #F59E0B, #B45309); }
.avatar-silver { background: linear-gradient(135deg, #CBD5E1, #64748B); }
.avatar-bronze { background: linear-gradient(135deg, #D97706, #78350F); }

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1rem;
}

.user-handle {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .leaderboard-view { padding: 6rem 1rem 3rem; }
  .view-header { flex-direction: column; align-items: stretch; gap: 1.5rem; }
  .view-title { font-size: 2.25rem; }
  .table-container { padding: 0.5rem; }
  .points-col { width: 80px; padding-right: 1rem !important; }
}
</style>
