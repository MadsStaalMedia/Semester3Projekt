<script setup>

    import { ref, onMounted } from 'vue';

    const props = defineProps(['id']);
    const game = ref(null);
    const games = ref([]);
    const selectedId = ref(null);

    onMounted(async () => {
        const response = await fetch('https://svenborgbraetspilindex-default-rtdb.europe-west1.firebasedatabase.app/games.json');
        const data = await response.json();
        game.value = data;
        games.value = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
    });

    async function saveEdit() {
        await fetch(`https://svenborgbraetspilindex-default-rtdb.europe-west1.firebasedatabase.app/games/${props.id}.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game.value),
        });
    }

    async function deleteGame() {
        if (!confirm('Er du sikker på at du vil slette dette spil?')) return;

        await fetch(`https://svenborgbraetspilindex-default-rtdb.europe-west1.firebasedatabase.app/games/${props.id}.json`, {
            method: 'DELETE',
        });
    }

</script>

<template>

    <select v-model="selectedId">
        <option disabled value="">Vælg et spil</option>
        <option v-for="game in games" :key="game.id" :value="game.id">
            {{ game.name }}
        </option>
    </select>

    <div v-if="selectedId">
        <h2>Rediger spil</h2>
        Titel: <input v-model="game.name" /><br>
        Kort beskrivelse: <input v-model="game.desc" /><br>
        Udgiver: <input v-model="game.publisher" /><br>
        Udgivelsesdato: <input type="number" v-model="game.date" /><br>
        Antal spillere: <input v-model="game.players" /><br>
        Anbefalet alder: <input v-model="game.age" /><br>
        Kompleksitet: <input v-model="game.complex" /><br>
        Genre: <input v-model="game.genre" /><br>
        Antal kopier: <input v-model="game.copies" /><br>

        <button @click="saveEdit">Gem ændringer</button>
        <button @click="deleteGame" style="color: red;">Slet spil</button>
    </div>
    <div v-else>
        Indlæser...
    </div>

</template>