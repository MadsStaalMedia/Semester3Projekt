<script setup>

    import { ref } from 'vue';

    const name = ref('');
    const desc = ref('');
    const publisher = ref('');
    const date = ref('');
    const genre = ref('');
    const players = ref('');
    const age = ref('');
    const complex = ref('');
    const copies = ref('');
    const img = ref(null);

    

    const onSubmit = () => {
        console.log("submitted");

        const res = fetch('https://svendborgbraetspilliste-default-rtdb.europe-west1.firebasedatabase.app/games.json', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                desc: desc.value,
                publisher: publisher.value,
                date: date.value,
                added: new Date,
                genre: genre.value,
                players: players.value,
                age: age.value,
                complex: complex.value,
                copies: copies.value,
            }),
        });
    };

</script>

<template>

    <form @submit.prevent="onSubmit">

        Titel: <input v-model="name" /><br>

        Kort beskrivelse: <input v-model="desc" /><br>

        Udgiver: <input v-model="publisher" /><br>

        Udgivelsesdato: <input type="date" v-model="date" /><br>

        Antal spillere: <input v-model="players" /><br>

        Anbefalet alder: <input v-model="age" /><br>
        
        Kompleksitet: <input v-model="complex" /><br>

        Genre: <input v-model="genre" /><br>

        Antal kopier: <input v-model="copies" /><br>

        Billede: <input ref="img" type="file" accept="image/*" /><br>

        <button type="submit">Tilføj spil</button>

    </form>

</template>