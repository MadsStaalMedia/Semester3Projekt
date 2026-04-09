<script setup>
  import { computed, ref, watch } from 'vue';

  const gameList = ref([
    {
        img: "/img/monopoly_pokemon.webp",
        name: "B Spil 1",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "1952-5-3",
        added: "2026-1-3",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    },
    {
        img: "/img/azul.webp",
        name: "A Spil 2",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "1955-5-3",
        added: "2022-1-1",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    },
    {
        img: "/img/rival_restaurants.webp",
        name: "Spil 3",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "1955-5-2",
        added: "2026-5-1",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    },
    {
        img: "/img/rival_restaurants.webp",
        name: "Spil 4",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "1955-5-3",
        added: "2026-6-1",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    },
    {
        img: "/img/rival_restaurants.webp",
        name: "A Spil 5",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "1955-5-1",
        added: "2021-1-1",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    },
    {
        img: "/img/rival_restaurants.webp",
        name: "Spil 6",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "1955-3-3",
        added: "2026-8-1",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    }
  ]);

  const activeGame = ref(null);

  const gamePage = ref(1);

  let search = ref("");

  let sortedGames = ref(gameList.value.sort((a, b) => a.name > b.name));

  let searchedGames = ref(sortedGames.value);

  let displayedGames = ref(searchedGames.value.filter((game, index) => index < gamePage.value * 3 && index > gamePage.value * 3 - 4));

  const pageButtons = computed(() => {
    return gameList.value.length / 3
  });

  function toggleGameInfo(game) {
    if (activeGame.value === game) {
      activeGame.value = null; 
    } else {
      activeGame.value = game; 
    }
  };

  function changePage(number) {
    displayedGames.value = gameList.value.filter((game, index) => index < number * 3 && index > number * 3 - 4);
    console.log(number);
  };

  function sortAlphabet() {
    sortedGames = displayedGames.value.sort((a, b) => a.name > b.name);
  };

  function sortRelease() {
    sortedGames = displayedGames.value.sort((a, b) => a.date > b.date);
  };

  function sortAdded() {
    sortedGames = displayedGames.value.sort((a, b) => a.added > b.added);
  };

  function searchForGames() {
    searchedGames = ref(sortedGames.value.filter((game, index) => game.name.toLowerCase().includes(search.value.toLowerCase())));
    console.table(searchedGames.value);
  }

</script>

<template>
  <main>

    <div class="gameindex">
      <h1>This is a game index page</h1>
    </div>

    <div>

      <input type="text" name="search" v-model="search" placeholder="Søg">
      <button @click="searchForGames()">Søg</button>

      <select :value="1">
        <option @click="sortAlphabet()" :value="1">Alfabetisk</option>
        <option @click="sortRelease()" :value="2">Udgivelsesdato</option>
        <option @click="sortAdded()" :value="3">Sidst Tilføjet</option>
      </select>

      <div class="game" v-for="game in displayedGames" :key="game.name">

        <!--<img src="img/catan.jpg" aspect-ratio="1" alt="test">-->
        <div class="game_imgAndTitle" v-on:click="toggleGameInfo(game)">
          <img class="game_img" :src="game.img" />
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

    <div v-for="number in pageButtons">
      <button @click="changePage(number)">
        {{ number }}
      </button>
    </div>

  </main>

</template>
