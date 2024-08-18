<script setup lang="ts">
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="75" height="125" />

    <div class="header__nav">
      <h1 class="header__title">Trivia Quiz Game</h1>
      <nav>
        Hello World
      </nav>
    </div>
  </header>

  <main>
    Hello World
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.header__nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.header__title {
  text-align: center;
  font-size: 2rem;
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
}

nav a.router-link-exact-active {
  text-decoration: underline;
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
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
  padding: calc(var(--section-gap) / 8);
  height: 100%;

}

@media (min-width: 768px) {
  .logo {
    display: block;
  }
}

@media (min-width: 1024px) {

  header {
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


  main {
    padding-inline: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 1rem;
  }


}
</style>
