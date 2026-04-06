<script setup>
import { Zap } from 'lucide-vue-next'
</script>

<template>
  <div class="home-landing">
    <img src="/mexico_2026_v2.png" alt="Mexico 2026 Background" class="bg-photo" />

    <div class="hero-container">
      <header class="hero animate-fade-in">
      <div class="hero-content">
        <h1 class="hero-title text-gradient">Vive la Emoción <br><span>Mundialista Nova Casa</span></h1>
        <p class="hero-description">Predice los resultados del escenario más grande del mundo. Desafía a expertos de todo el planeta y gana la gloria eterna (y grandes premios).</p>
        
        <div class="badge-wrapper">
          <div class="badge glass-card">
            <Zap :size="16" class="vibrant-green" />
            <span>FIFA World Cup 2026</span>
          </div>
        </div>

        <div class="hero-link-wrap">
          <router-link to="/quiniela" class="btn-comenzar">COMENZAR</router-link>
          <router-link to="/reglas" class="text-link">leer reglas</router-link>
        </div>
      </div>
      </header>

      <!-- Right Column: Prize Ranking -->
      <aside class="prizes-sidebar animate-fade-in-delayed">
        <div class="prizes-card glass-card">
          <h2 class="prizes-title">Ranking de Premios</h2>
          
          <div class="prize-item">
            <div class="prize-rank rank-1">1</div>
            <div class="prize-image-wrap">
              <img src="/prize_1_tv.png" alt="Smart TV 55 Pulgadas" class="prize-img" />
            </div>
            <div class="prize-details">
              <h3>Smart TV 55"</h3>
              <p>Primer Lugar</p>
            </div>
          </div>

          <div class="prize-item">
            <div class="prize-rank rank-2">2</div>
            <div class="prize-image-wrap">
              <img src="/prize_2_air_fryer.png" alt="Freidora de Aire Digital" class="prize-img" />
            </div>
            <div class="prize-details">
              <h3>Freidora de Aire</h3>
              <p>Segundo Lugar</p>
            </div>
          </div>

          <div class="prize-item">
            <div class="prize-rank rank-3">3</div>
            <div class="prize-image-wrap">
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80" alt="Cafetera de Goteo" class="prize-img" />
            </div>
            <div class="prize-details">
              <h3>Cafetera de Goteo</h3>
              <p>Tercer Lugar</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.home-landing {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  z-index: 10;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: center;
}

.bg-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -3;
}

.hero {
  display: block;
  max-width: 100%;
  width: 100%;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
  background: rgba(255, 255, 255, 0.85);
  padding: 2.5rem;
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--text-primary);
}

.hero-title span {
  background: linear-gradient(to right, #006847, #CE1126);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.6;
}

.badge-wrapper {
  margin: 0.5rem 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.25rem;
  border-bottom: 2px solid var(--primary-glow);
  font-size: 0.85rem;
  font-weight: 700;
  width: fit-content;
  color: var(--primary-color);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-link-wrap {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.btn-comenzar {
  background: var(--text-primary);
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-decoration: none;
  transition: all 0.4s ease;
  border-radius: 0;
  display: inline-block;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-comenzar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: #006847; /* Mexican Green */
  z-index: -1;
  transition: width 0.4s ease;
}

.btn-comenzar:hover::before {
  width: 100%;
}

.btn-comenzar:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 104, 71, 0.3);
}

.text-link {
  color: var(--text-secondary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 4px;
  text-decoration: none;
}

.text-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: #CE1126; /* Mexican Red */
  transition: width 0.3s ease;
}

.text-link:hover {
  color: #CE1126;
}

.text-link:hover::after {
  width: 100%;
}

/* Prizes Sidebar Styles */
.prizes-sidebar {
  width: 100%;
}

.prizes-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

.prizes-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: left;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 1rem;
}

.prize-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.prize-item:last-child {
  margin-bottom: 0;
}

.prize-item:hover {
  transform: translateX(10px);
  background: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.prize-rank {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  color: white;
  flex-shrink: 0;
}

.rank-1 { background: linear-gradient(135deg, #FFD700, #FDB931); }
.rank-2 { background: linear-gradient(135deg, #C0C0C0, #E0E0E0); color: #333; }
.rank-3 { background: linear-gradient(135deg, #CD7F32, #A0522D); }

.prize-image-wrap {
  width: 80px;
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.prize-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.prize-item:hover .prize-img {
  transform: scale(1.1);
}

.placeholder-img {
  font-size: 2.5rem;
}

.prize-details {
  flex: 1;
}

.prize-details h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.prize-details p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.animate-fade-in-delayed {
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .hero-content {
    align-items: center;
    text-align: center;
  }
  
  .hero-link-wrap {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .prizes-card {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
