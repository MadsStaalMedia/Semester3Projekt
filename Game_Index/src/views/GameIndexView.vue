<script setup>
import { ref } from 'vue';

const gameList = ref ([
    {
        img: "@/views/img/catan.jpg",
        name: "Spil 1",
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
        img: "./img/catan.jpg",
        name: "Spil 2",
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
        img: "./img/catan.jpg",
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
    }
]);

const activeGame = ref(null);

function toggleGameInfo(game) {
  if (activeGame.value === game) {
    activeGame.value = null; 
  } else {
    activeGame.value = game; 
  }
}

console.table(gameList);

</script>

<template>
  <main>

    <div>
      <h1>This is a game index page</h1>
    </div>

    <div id="index_wrapper">

      <div class="game" v-for="game in gameList" :key="game.name">

        <!--<img src="img/catan.jpg" aspect-ratio="1" alt="test">-->
        <div class="game_imgAndTitle" v-on:click="toggleGameInfo(game)">
          <img class="game_img" src="/img/catan.jpg" />
          <h3 class="game_title">{{ game.name }}</h3>
          <p class="game_desc">{{ game.desc }}</p>
        </div>

        <transition name="accordion">
          <div v-if="activeGame === game" class="game_info">
            <ul>
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

<style scoped>

#index_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 8px;
}

.game {
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 15px;
  transition: all 0.4s;
}

.game:hover {
  /*box-shadow: 0px 0px 15px 2px #b4b4b4;*/
  scale: 1.05;
  /*background-color: rgb(75, 75, 75);*/
  cursor: pointer;
}

/*.game_imgAndTitle {

}*/
.game_img {
  width: 100%;
  border-radius: 5%;
  margin: 0px 0px 8px 0;
}

.game_title {
  font-size: 1rem;
}

.game_desc {
  font-size: 0.7rem;
}

.game_info {
  overflow: hidden;
}

@media (min-width: 1024px) {
  #index_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 8px;
}

.game {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.game_info {
  overflow: hidden;
}
}

</style>