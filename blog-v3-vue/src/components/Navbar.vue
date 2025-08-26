<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li class="navbar-item">
        <router-link to="/" class="navbar-link" active-class="active" exact>About</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/resume" class="navbar-link" active-class="active">Resume</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/portfolio" class="navbar-link" active-class="active">Portfolio</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/blog" class="navbar-link" active-class="active">Blog</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/contact" class="navbar-link" active-class="active">Contact</router-link>
      </li>
    </ul>
  </nav>

</template>


<script setup>
</script>

<style scoped></style>
