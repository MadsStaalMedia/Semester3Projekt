<script setup>

    import { ref, onMounted, computed } from 'vue';

    const props = defineProps(['id']);
    const game = ref(null);
    const games = ref([]);
    const selectedId = ref(null);
    const search = ref('');

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

    const filteredGames = computed(() =>
        games.value.filter(game =>
            game.name.toLowerCase().includes(search.value.toLowerCase())
        )
    );

    function selectGame(selected) {
        selectedId.value = selected.id;
        search.value = selected.name;
        game.value = { ...selected };
        search.value = '';
    }

</script>

<template>

    <div class="gameEdit">

        <h2>Rediger spil på listen</h2>

        <input v-model="search" placeholder="Søg efter spil..." />

        <div v-if="search" class="searchResults">
            <div
                v-for="game in filteredGames"
                :key="game.id"
                class="search-result"
                @click="selectGame(game)"
            >
                {{ game.name }}
            </div>
        </div>

        <div v-if="selectedId" class="gameSelect">
            <h2>Rediger spillet</h2>
            <label for="gameName">Titel:</label><br> <input name="gameName" v-model="game.name" /><br>
            <label for="gameDate">Udgivelsesdato:</label><br> <input name="gameDate" type="number" v-model="game.date" /><br>
            <label for="gamePlayer">Antal spillere:</label><br> <input name="gamePlayers" v-model="game.players" /><br>
            <label for="gameAge">Anbefalet alder:</label><br> <input name="gameAge" v-model="game.age" /><br>
            <label for="gameComplex">Kompleksitet</label><br> <input type="number" name="gameComplex" v-model="game.complex" placeholder="Spillets kompleksitet på en skala fra 1 til 5" /><br>
            <label for="gameTags">Nøgleord</label><br> <input type="text" name="gameTags" v-model="game.tags" placeholder="Nøgleord spillet kan findes med" /><br>
            <label for="gameDesc">Kort beskrivelse:</label><br> <textarea name="gameDesc" v-model="game.desc"></textarea><br>

            <button @click="saveEdit">Gem ændringer</button>
            <button @click="deleteGame" style="color: red;">Slet spil</button>
        </div>

    </div>

</template>

<style scoped>

    input {
        padding: 8px 12px 8px 12px;
        font-size: 1rem;
        border-radius: 8px;
        border: none;
        min-width: 50%;
        font-family:
            Poppins, 
            sans-serif;
    }

    textarea {
        margin-bottom: 10px;
        padding: 8px 12px 8px 12px;
        font-size: 1rem;
        border-radius: 8px;
        border: none;
        min-width: 50%;
        font-family:
            Poppins, 
            sans-serif;
    }

    .searchResults {
        font-size: 1rem;
        background-color: #323232;
    }

    textarea {
        margin-bottom: 10px;
        padding: 8px 12px 8px 12px;
        font-size: 1rem;
        border-radius: 8px;
        border: none;
        min-width: 50%;
    }


</style>