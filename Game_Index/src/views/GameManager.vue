<script setup>
    import { ref } from 'vue';

    const newGame = ref({
        img: '',
        name: '',
        desc: '',
        publisher: '',
        date: '',
        added: '',
        genre: '',
        players: '',
        age: '',
        complex: '',
        copies: ''
    })


    function saveGame() {
        
    }

</script>

<template>

    <form>

        <label for="title">Titel </label>
        <input name="title" type="text">
        <br>

        <label for="desc">Beskrivelse </label>
        <input name="desc" type="text">
        <br>

        <label for="publisher">Udgiver </label>
        <input name="publisher" type="text">
        <br>

        <label for="date">Udgivelsesdato </label>
        <input name="date" type="date">
        <br>

        <label for="genre">Spilgenre </label>
        <input name="genre" type="text">
        <br>

        <label for="player">Antal spillere </label>
        <input name="player" type="text">
        <br>

        <label for="age">Anbefalede alder </label>
        <input name="age" type="text">
        <br>

        <label for="complex">Kompleksitet </label>
        <input name="complex" type="text">
        <br>

        <label for="copies">Antal kopier </label>
        <input name="copies" type="text">
        <br>

        <label for="img">Billede</label>
        <input name="img" type="file" accept="image/*">
        <br>

        <input type="submit">
    </form>

</template>