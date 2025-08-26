<template>
  <div class="app-layout">
    <main>
      <Background />
      <Sidebar />
      <div class="main-content">
        <Navbar />
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import Background from './components/Background.vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
</script>

<style>
.app-layout {
  height: 100%;
  width: 100%;
}

/* .main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: relative;
} */
</style>
