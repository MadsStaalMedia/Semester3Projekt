<script setup>
import { computed, ref } from 'vue';

const gameList = ref([
    {
        img: "/img/monopoly_pokemon.webp",
        name: "Spil 1",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "3-5-1955",
        added: "7-1-2026",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4"
    },
    {
        img: "/img/azul.webp",
        name: "Spil 2",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "5-5-1955",
        added: "3-1-2026",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4"
    },
    {
        img: "/img/rival_restaurants.webp",
        name: "Spil 3",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "2-5-1955",
        added: "1-1-2026",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4"
    }
]);

console.table(gameList);

  function sortAlphabet(arr) {
    return arr.sort((a, b) => {
      if (a.name > b.name) return 1;
      else return -1;
    });
  };

  function sortRelease(arr) {
    return arr.sort((a, b) => {
      if (a.date > b.date) return 1;
      else return -1;
    });
  };

  function sortAdded(arr) {
    return arr.sort((a, b) => {
      if (a.added > b.added) return 1;
      else return -1;
    });
  };

</script>

<template>
  <main>

    <div class="gameindex">
      <h1>This is a game index page</h1>
    </div>

    <div>

      <select :value="1">
        <option @click="sortAlphabet(gameList)" :value="1">Alfabetisk</option>
        <option @click="sortRelease(gameList)" :value="2">Udgivelsesdato</option>
        <option @click="sortAdded(gameList)" :value="3">Tilføjelsesdato</option>
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
