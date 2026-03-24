<script setup>

const gameList = [
    {
        img: "./img/catan.jpg",
        name: "Spil 1",
        desc: "et spil hvor du spiller",
        publisher: "Spil Firma",
        date: "5-5-1955",
        added: "1-1-2026",
        genre: "spillespil",
        players: "2-4",
        age: "+99",
        complex: "mellem",
        copies: "4"
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
        copies: "4"
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
        copies: "4"
    }
];

</script>

<template>
  <main>

    <div class="gameindex">
      <h1>This is a game index page</h1>
    </div>

    <div>

      <div v-for="game in gameList">

        <!--<img src="img/catan.jpg" aspect-ratio="1" alt="test">-->
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