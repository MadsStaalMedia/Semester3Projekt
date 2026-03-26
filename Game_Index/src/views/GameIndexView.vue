<script setup>
import { computed, ref } from 'vue';


const gameList = [
    {
        img: "/img/catan.jpg",
        name: "B Spil 1",
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
        img: "/img/catan.jpg",
        name: "A Spil 2",
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
        img: "/img/catan.jpg",
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
]

function gameSort() {
  return gameList.name.sort((a, b) => a.name - b.name );
}

console.info(gameList);

</script>

<template>
  <main>

    <div class="gameindex">
      <h1>This is a game index page</h1>
    </div>

    <div>

      <select @change="gameSort()">
        <option value="name">Alfabetisk</option>
        <option value="date">Udgivelsesdato</option>
        <option value="added">Tilføjelsesdato</option>
      </select>

      <div v-for="game in gameList">

        <img :src="game.img"/>
        <h3>{{ game.name }}</h3>
        <p>{{ game.desc }}</p>
        <ul>
          <li>Udgiver: {{ game.publisher }}</li>
          <li>Udgivelsesdato: {{ game.date }}</li>
          <li>Antal spillere: {{ game.players }}</li>
          <li>Anbefalet alder: {{ game.age }}</li>
          <li>Kompleksitet: {{ game.complex }}</li>
          <li>Genre: {{ game.genre }}</li>
        </ul>

      </div>

    </div>

  </main>

</template>