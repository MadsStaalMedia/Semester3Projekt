<script setup>

    import { ref } from 'vue';
    import { initializeApp } from 'firebase/app';
    import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,

    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const name = ref('');
    const desc = ref('');
    const publisher = ref('');
    const date = ref('');
    const players = ref('');
    const age = ref('');
    const copies = ref('');
    const imgFile = ref(null);
    const imgPreview = ref(null);

    function onFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        imgFile.value = file;
        imgPreview.value = URL.createObjectURL(file);
    }

    

    const onSubmit = async () => {
        let imgUrl = null;

        if (imgFile.value) {
            const fileRef = storageRef(storage, `games/${Date.now()}_${imgFile.value.name}`);
            await uploadBytes(fileRef, imgFile.value);
            imgUrl = await getDownloadURL(fileRef);
        } else {
            alert('Vælg venligst et billede.');
            return;
        }

        await fetch('https://svenborgbraetspilindex-default-rtdb.europe-west1.firebasedatabase.app/games.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                desc: desc.value,
                publisher: publisher.value,
                date: date.value,
                added: new Date().toString(),
                players: players.value,
                age: age.value,
                copies: copies.value,
                imgUrl,
            }),

        });

    };

</script>

<template>

    <form @submit.prevent="onSubmit">

        Titel: <input v-model="name" /><br>

        Kort beskrivelse: <input v-model="desc" /><br>

        Udgiver: <input v-model="publisher" /><br>

        Udgivelsesår: <input type="number" v-model="date" /><br>

        Antal spillere: <input v-model="players" /><br>

        Anbefalet alder: <input v-model="age" /><br>

        Antal kopier: <input type="number" v-model="copies" /><br>

        <input type="file" accept="image/*" required @change="onFileChange" /><br>

        <img v-if="imgPreview" :src="imgPreview" alt="Preview" style="max-width: 200px; margin: 8px 0;" /><br>

        <button type="submit">Tilføj spil</button>

    </form>

</template>