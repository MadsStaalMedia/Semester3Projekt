<script setup>
  import { computed, ref } from 'vue';

  const gameList = ref([
    {
        img: "/img/monopoly_pokemon.webp",
        name: "B Spil 1",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "5-5-1955",
        added: "1-1-2026",
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
        date: "5-5-1955",
        added: "1-1-2026",
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
        date: "5-5-1955",
        added: "1-1-2026",
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
        date: "5-5-1955",
        added: "1-1-2026",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    },
    {
        img: "/img/rival_restaurants.webp",
        name: "Spil 5",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "5-5-1955",
        added: "1-1-2026",
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
        date: "5-5-1955",
        added: "1-1-2026",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4",
    }
  ]);

  const activeGame = ref(null);

  const gamePage = ref(1);

  let displayedGames = ref(gameList.value.filter((game, index) => index < gamePage.value * 3).filter((game, index) => index > gamePage.value * 3 - 4));

  const pageButtons = computed(() => {
    return gameList.value.length / 3
  });

  function toggleGameInfo(game) {
    if (activeGame.value === game) {
      activeGame.value = null; 
    } else {
      activeGame.value = game; 
    }
  }

  function changePage(number) {
    displayedGames.value = gameList.value.filter((game, index) => index < number * 3 && index > number * 3 - 4);
    console.log(number);
  }

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
        <option @click="sortAlphabet(displayedGames)" :value="1">Alfabetisk</option>
        <option @click="sortRelease(displayedGames)" :value="2">Udgivelsesdato</option>
        <option @click="sortAdded(displayedGames)" :value="3">Tilføjelsesdato</option>
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
