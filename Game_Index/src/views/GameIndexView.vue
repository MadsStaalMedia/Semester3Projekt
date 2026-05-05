<script setup>
  import { computed, ref } from 'vue';

  const gameList = ref([]);
  const originalGameList = ref([]);
  const currentPage = ref(1);
  const gamesPerPage = ref(8);

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
  });

  const pagedGames = computed(() => {
      const start = (currentPage.value - 1) * gamesPerPage.value;
      const end = start + gamesPerPage.value;
      return searchGames.value.slice(start, end);
  });

  const totalPages = computed(() => 
      Math.ceil(gameList.value.length / gamesPerPage.value)
  );

</script>

<template>
  <main>

    
    <h1>Svenborg Brætspilscafe spil oversigt</h1>

    <div class="filterDiv">

      <input type="search" name="search" v-model="search" placeholder="Søg">

      <select :value="1">
        <option @click="sortAlphabet()" :value="1">Alfabetisk</option>
        <option @click="sortRelease()" :value="2">Udgivelsesår</option>
        <option @click="sortAdded()" :value="3">Sidst Tilføjet</option>
      </select>

    </div>
    

    <div class="gameindex">

      <div class="game" v-for="game in pagedGames" :key="game.name">

        <div class="game_imgAndTitle" v-on:click="toggleGameInfo(game)">
          <h3 class="game_title">{{ game.name }}</h3>

          <div class="game_img">

            <img v-if="game.imgUrl" :src="game.imgUrl" alt="Billedet blev ikke fundet" style="max-width: 20vw; max-height: 400px; object-fit: contain;" />

          </div>

          <p class="game_desc">{{ game.desc }}</p>
        </div>

        <transition name="accordion">
          <div v-if="activeGame === game" class="game_info">
            <ul class="game_info-text">
              <li>Udgiver: {{ game.publisher }}</li>
              <li>Udgivelsesår: {{ game.date }}</li>
              <li>Antal spillere: {{ game.players }}</li>
              <li>Anbefalet alder: {{ game.age }}</li>
            </ul>
          </div>
        </transition>

      </div>

    </div>

    <div class="pageButtons">
        <button :disabled="currentPage === 1" @click="currentPage--">Forrige</button>
        <span>Side {{ currentPage }} af {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">Næste</button>
    </div>

  </main>

</template>


<style scoped>

  main {
    margin: 0;
    padding: 0;
  }

  input {
    padding: 8px 12px 8px 12px;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
  }

  .gameindex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: 100vw;
  }

  .filterDiv {
    margin: 10px 2vw;
  }

  .game {
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
    background-color: #323232;
    width: 20vw;
    padding: 5px;
    margin: 10px 1vw;
    
  }

  .game_title {
    text-align: center;
  }

  .game_img {
    width: 20vw;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .game_desc {
    font-size: 1rem;
    height: 3rem;
  }

  .game_info {
    font-size: 0.8rem;
  }

  .pageButtons {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

</style>