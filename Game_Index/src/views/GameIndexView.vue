<script setup>
  import { computed, ref } from 'vue';

  const gameList = ref([]);
  const originalGameList = ref([])

  const getGames = async () => {
    try {
      const response = await fetch('https://svenborgbraetspilindex-default-rtdb.europe-west1.firebasedatabase.app/games.json');

      const resGames = await response.json();

      gameList.value = Object.entries(resGames).map(([key, value]) => ({id: key, ...value}));

      originalGameList.value = Object.entries(resGames).map(([key, value]) => ({id: key, ...value}));

      console.log(resGames);

      console.log(gameList.value);

    } catch(error) {

      console.error(error);

    }
  };

  getGames();

  const activeGame = ref(null);

  const search = ref('');

  function toggleGameInfo(game) {
    if (activeGame.value === game) {
      activeGame.value = null; 
    } else {
      activeGame.value = game; 
    }
  };

  function sortAlphabet() {
    gameList.value = [...gameList.value].sort((a, b) => b.name.localeCompare(a.name))
  };

  function sortRelease() {
    gameList.value = [...gameList.value].sort((a, b) => b.name.localeCompare(a.date))
  };

  function sortAdded() {
    gameList.value = [...gameList.value].sort((a, b) => b.name.localeCompare(a.added))
  };

  const searchGames = computed(() => {
  return gameList.value.filter(game =>
    game.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

</script>

<template>
  <main>

    <div class="gameindex">
      <h1>This is a game index page</h1>
    </div>

    <div>

      <input type="search" name="search" v-model="search" placeholder="Søg">

      <select :value="1">
        <option @click="sortAlphabet()" :value="1">Alfabetisk</option>
        <option @click="sortRelease()" :value="2">Udgivelsesdato</option>
        <option @click="sortAdded()" :value="3">Sidst Tilføjet</option>
      </select>

      <div class="game" v-for="game in searchGames" :key="game.name">

        <!--<img src="img/catan.jpg" aspect-ratio="1" alt="test">-->
        <div class="game_imgAndTitle" v-on:click="toggleGameInfo(game)">
          <img class="game_img" src="/img/monopoly_pokemon.webp" />
          <h3 class="game_title">{{ game.name }}</h3>
          <p class="game_desc">{{ game.desc }}</p>
        </div>

        <transition name="accordion">
          <div v-if="activeGame === game" class="game_info">
            <ul class="game_info-text">
              <li>Udgiver: {{ game.publisher }}</li>
              <li>Udgivelsesdato: {{ game.date }}</li>
              <li>Antal spillere: {{ game.players }}</li>
              <li>Anbefalet alder: {{ game.age }}</li>
              <li>Kompleksitet: {{ game.complex }}</li>
              <li>Genre: {{ game.genre }}</li>
            </ul>
          </div>
        </transition>

      </div>

    </div>

  </main>

</template>
