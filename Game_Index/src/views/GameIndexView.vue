<script setup>

const gameList = [
    {
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

        <h4>{{ game.name }}</h4>
        <p>{{ game.desc }}</p>
        <ul>
          <li>Udgiver: {{ game.publisher }}</li>
          <li>Udgivelsesdato: {{ game.date }}</li>
          <li>Antal spillere: {{ game.players }}</li>
          
        </ul>

      </div>

    </div>

  </main>

</template>