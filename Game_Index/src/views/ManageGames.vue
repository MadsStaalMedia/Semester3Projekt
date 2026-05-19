<script setup>

    import { ref } from 'vue';
    import { initializeApp } from 'firebase/app';
    import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
    import GameEdit from '@/components/GameEdit.vue';

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
    const date = ref('');
    const players = ref('');
    const age = ref('');
    const imgFile = ref(null);
    const imgPreview = ref(null);

    function onFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        imgFile.value = file;
        imgPreview.value = URL.createObjectURL(file);
    }

    const submitted = ref(false);

    

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
                date: date.value,
                added: new Date().toString(),
                players: players.value,
                age: age.value,
                imgUrl,
            }),

        });

        name.value = '';
        desc.value = '';
        date.value = '';
        players.value = '';
        age.value = '';
        imgFile.value = null;
        imgPreview.value = null;

        submitted.value = true;

    };

</script>

<template>

    <main>

        <h1>Velkommen til spil manageren</h1>

        <div>
            <h2>Tilføj spil til listen</h2>

            <p v-if="submitted" style="color: green;">Spillet blev tilføjet!</p>

            <form @submit.prevent="onSubmit">

                <label for="name">Titel:</label><br> <input type="text" name="name" v-model="name" placeholder="Titel" /><br>

                <label for="date">Udgivelsesår:</label><br> <input type="number" name="date" v-model="date" placeholder="Udgivelsesår" /><br>

                <label for="players">Antal spillere:</label><br> <input type="text" name="players" v-model="players" placeholder="Antal spillere (f.eks. 2-5)" /><br>

                <label for="age">Anbefalet alder:</label><br> <input type="text" name="age" v-model="age" placeholder="Anbefaldet alder (f.eks +7)" /><br>

                <input type="file" accept="image/*" required @change="onFileChange" /><br>

                <img v-if="imgPreview" :src="imgPreview" alt="Preview" style="max-width: 200px; margin: 8px 0;" /><br>

                <label for="desc">Kort beskrivelse (valgfrit):</label><br> <textarea name="desc" v-model="desc" placeholder="Kort beskrivelse"></textarea><br>

                <button type="submit">Tilføj spil</button>

            </form>


        </div>
        
        <GameEdit />

    </main>

</template>

<style scoped>

    form {
        margin-left: 1vw;
    }

    input {
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

    main {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        width: 100vw;

        h1 {
            width: 100vw;
        }

        div {
            padding: 1rem;
            border: 1px solid #323232;
            width: 100%;
            max-width: 900px;
        }
    }

</style>