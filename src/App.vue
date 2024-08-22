<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="75" height="125" />

    <div class="header__nav">
      <nav>
        <span class="header__title">Quiz Game</span>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/quiz">Quiz</RouterLink>
        <RouterLink to="/summary">Summary</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1;
}

.header__nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.header__title {
  text-align: center;
  font-weight: 600;
  width: 100%;
}

.logo {
  display: none;
  margin: 0 auto;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  padding-bottom: 1rem;
}

nav a.router-link-exact-active {
  text-decoration: underline;
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav span {
  border-right: 1px solid var(--color-border);
  padding-right: 1rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

@media (min-width: 768px) {
  nav {
    font-size: 1.6rem;
    padding-bottom: 2rem;
  }

  .logo {
    display: block;
  }
}

@media (min-width: 1024px) {
  nav {
    font-size: 1.8rem;
    padding-bottom: .6rem;
  }

  header {
    line-height: 1.5;
    display: flex;
    place-items: center;
    padding-inline: calc(var(--section-gap) / 2);
  }

  .header__nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .header__title {
    text-align: center;
    font-size: 2rem;
    font-weight: 800;
    width: 100%;
  }

  .logo {
    margin: 0 1rem;
  }
}
</style>
