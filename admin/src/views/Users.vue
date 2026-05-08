<script setup>
import { ref } from 'vue'
import { Search, Mail, Phone, Trash2, Edit } from 'lucide-vue-next'

const users = ref([
  { id: 1, name: 'Carlos Gomez', email: 'carlos@example.com', phone: '5512345678', status: 'Active' },
  { id: 2, name: 'Ana Rodriguez', email: 'ana@example.com', phone: '5587654321', status: 'Inactive' },
  { id: 3, name: 'Luis Cortes', email: 'luis@example.com', phone: '5509876543', status: 'Active' },
  { id: 4, name: 'Maria Perez', email: 'maria@example.com', phone: '5565432109', status: 'Active' },
])

const searchQuery = ref('')
</script>

<template>
  <div class="users-page">
    <header class="section-header">
      <div class="header-left">
        <h1 class="page-title">Gestión de Usuarios</h1>
        <p class="page-subtitle">Visualiza y administra las cuentas registradas en el sistema.</p>
      </div>
      <button class="btn-add">Nuevo Usuario</button>
    </header>

    <div class="table-controls glass-card">
      <div class="search-wrapper">
        <Search :size="20" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Buscar por nombre, email o teléfono..." class="search-input" />
      </div>
    </div>

    <div class="table-card glass-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contacto</th>
            <th>Estado</th>
            <th class="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <div class="user-cell">
                <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                <div class="user-info">
                  <span class="user-name">{{ user.name }}</span>
                  <span class="user-id">ID: #{{ user.id }}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="contact-cell">
                <div class="contact-item"><Mail :size="14" /> {{ user.email }}</div>
                <div class="contact-item"><Phone :size="14" /> {{ user.phone }}</div>
              </div>
            </td>
            <td>
              <span class="status-badge" :class="user.status.toLowerCase()">{{ user.status }}</span>
            </td>
            <td class="text-right">
              <div class="action-buttons">
                <button class="btn-icon" title="Editar"><Edit :size="18" /></button>
                <button class="btn-icon btn-danger" title="Eliminar"><Trash2 :size="18" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.users-page {
  padding: 2rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b6375;
  font-size: 1.1rem;
}

.btn-add {
  background: #006847;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add:hover {
  background: #004d35;
  transform: translateY(-2px);
}

.table-controls {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
}

.search-wrapper {
  position: relative;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #006847;
  box-shadow: 0 0 0 3px rgba(0, 104, 71, 0.1);
}

.table-card {
  background: white;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th {
  padding: 1.25rem 2rem;
  text-align: left;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b6375;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.admin-table td {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #006847;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.user-name {
  display: block;
  font-weight: 700;
  color: #1a1a2e;
}

.user-id {
  font-size: 0.75rem;
  color: #9ca3af;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.status-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.status-badge.active { background: #e8f5e9; color: #2e7d32; }
.status-badge.inactive { background: #fef2f2; color: #991b1b; }

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover { background: #e5e7eb; color: #1a1a2e; }
.btn-icon.btn-danger:hover { background: #fee2e2; color: #dc2626; }

.text-right { text-align: right !important; }
</style>
