<script setup>
import { computed } from 'vue';

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
];

console.table(gameList);

const sortAlphabet = (arr) => {
      return arr.sort((a, b) => {
        if (a.name > b.name) return 1;
        else return -1;
      });
    };

const sortRelease = (arr) => {
      return arr.sort((a, b) => {
        if (a.date > b.date) return 1;
        else return -1;
      });
    };

const sortAdded = (arr) => {
      return arr.sort((a, b) => {
        if (a.added > b.added) return 1;
        else return -1;
      });
    };
    
let sortingMethod = sortAlphabet(gameList);

</script>

<template>
  <main>

    <div class="gameindex">
      <h1>This is a game index page</h1>
    </div>

    <div>

      <select @change="changeSort($)">
        <option value="sortAlphabet(gameList)">Alfabetisk</option>
        <option value="sortRelease(gameList)">Udgivelsesdato</option>
        <option value="sortAdded(gameList)">Tilføjelsesdato</option>
      </select>

      <div v-for="game in sortingMethod" :key="sortingMethod.name">

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