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
        newGame
    }

</script>