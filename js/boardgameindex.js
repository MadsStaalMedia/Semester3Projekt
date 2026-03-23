const gameList = [
    {
        name: "spil 1",
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
        name: "spil 2",
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
        name: "spil 3",
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

const gameIndex = document.getElementById("gameIndex");

for (let i in gameList) {
    gameIndex.innerHTML += `<div class="gameEntry"> <p>Navn: ${gameList[i].name}</p> </div>`
    
}