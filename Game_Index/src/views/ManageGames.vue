<script setup>

    import { ref } from 'vue';

    const onSubmit = () => {
        console.log("submitted");
    };

</script>

<template>

    <form @submit.prevent="onSubmit">

        Titel: <input /><br>

        Kort beskrivelse: <input /><br>

        Udgiver: <input /><br>

        Udgivelsesdato: <input type="date" /><br>

        Antal spillere: <input /><br>

        Anbefalet alder: <input /><br>
        
        Kompleksitet: <input /><br>

        Genre: <input /><br>

        Antal kopier: <input /><br>

        Billede: <input /><br>

        <button type="submit">Tilføj spil</button>

    </form>

</template>