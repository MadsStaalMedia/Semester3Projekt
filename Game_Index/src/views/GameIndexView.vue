<script setup>
  import { computed, ref, watch } from 'vue';

  const gameList = ref([]);
  const originalGameList = ref([]);
  const currentPage = ref(1);
  const gamesPerPage = ref(8);
  const sortBy = ref('alphabet');

  watch(sortBy, () => {
    currentPage.value = 1;
  });

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

  const sortedGames = computed(() => {
    const list = [...gameList.value];
    if (sortBy.value === 'alphabet') {
        return list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.value === 'release') {
        return list.sort((a, b) => {
            const dateDiff = b.date - a.date;
            if (dateDiff !== 0) return dateDiff;
            return a.name.localeCompare(b.name);
        });
    } else if (sortBy.value === 'added') {
        return list.sort((a, b) => new Date(b.added) - new Date(a.added));
    }
    return list;
  });

  const searchGames = computed(() => {
    return sortedGames.value.filter(game =>
      game.name.toLowerCase().includes(search.value.toLowerCase()) || 
      game.tags.toLowerCase().includes(search.value.toLowerCase())
    )
  });

  const pagedGames = computed(() => {
    const start = (currentPage.value - 1) * gamesPerPage.value;
    const end = start + gamesPerPage.value;
    return searchGames.value.slice(start, end);
  });

  const totalPages = computed(() => 
    Math.ceil(searchGames.value.length / gamesPerPage.value)
  );

</script>

<template>
  <main>

    
    <h1>Svenborg Brætspilscafe spil oversigt</h1>

    <div class="filterDiv">

      <input type="search" name="search" v-model="search" placeholder="Søg">

      <select v-model="sortBy">
        <option value="alphabet">Alfabetisk</option>
        <option value="release">Udgivelsesår</option>
        <option value="added">Sidst Tilføjet</option>
      </select>

    </div>
    

    <div class="gameindex">

      <div class="game" v-for="game in pagedGames" :key="game.id">

        <div class="game_imgAndTitle" v-on:click="toggleGameInfo(game)">

          <div class="game_img">

            <div v-if="!game.loaded" class="img_loading"></div>

            <img v-if="game.imgUrl" :src="game.imgUrl" alt="Billedet blev ikke fundet" style="max-width: 90%; width: auto; max-height: 90%; height: auto; object-fit: contain;" :style="{ display: game.loaded ? 'block' : 'none' }" @load="game.loaded = true" @error="e => retryImage(e, game)" />

          </div>

          <h2 class="game_title">{{ game.name }}</h2>

        </div>

        <transition name="accordion">
          <div v-if="activeGame === game" class="game_info">
            <p class="game_desc">{{ game.desc }}</p>
            <ul class="game_info-text">
              <li>Udgivelsesår: {{ game.date }}</li>
              <li>Antal spillere: {{ game.players }}</li>
              <li>Anbefalet alder: {{ game.age }}</li>
              <li>Spilletid: {{ game.time }} minutter</li>
              <li>Kompleksitet {{ game.complex }}/5</li>
            </ul>
            <div class="game_tags">Nøgleord: {{ game.tags }}</div>
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

  .accordion-enter-active,
  .accordion-leave-active {
    transition: max-height 0.2s ease, opacity 0.2s ease;
    overflow: hidden;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .accordion-enter-to,
  .accordion-leave-from {
    max-height: 500px;
    opacity: 1;
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
    transition: background-color 0.5s;

    h3 {
      transition: text-shadow 0.5s;
    }
    
  }

  .game:hover {
    background-color: #494949;
    cursor: pointer;

    h3 {
      text-shadow: 1px 1px 1px black;
    }

    .game_img {
      img {
        rotate: 10deg;
      }
    }
  }

  .game_title {
    text-align: center;
  }

  .game_img {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      transition: rotate 0.5s;
    }
  }

  .img_loading {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
    animation: waiting 1.5s infinite;
    border-radius: 4px;
  }

  @keyframes waiting {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
  }

  .game_desc {
    font-size: 1rem;
  }

  .game_info {
    font-size: 0.8rem;
  }

  .game_info-text {
    margin-left: 1rem;
  }

  .game_tags {
    margin-top: 1em;
    font-size: 0.7rem;
    color: #dddddd;
  }
  

  .pageButtons {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

   @media (max-width: 1600px) {
    .game {
      width: 30vw;
    }

  }

  @media (max-width: 1024px) {
    .game {
      width: 40vw;
    }

  }

  @media (max-width: 768px) {
    .game {
      width: 80vw;
    }

  }

</style>