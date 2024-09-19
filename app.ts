const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter"

interface Player {
    _id: string,
    playerName: string,
    position: string,
    twoPercent: number,
    threePercent: number,
    points: number
}

//Get The Elements From Html
const [pointGuard, shootingGuard, smallForward, center]: NodeListOf<HTMLDivElement> = document.querySelectorAll(".player")!
const position: HTMLSelectElement = document.querySelector("select")!
const [points, twoPercent, threePercent]: NodeListOf<HTMLInputElement> = document.querySelectorAll("input")!
const search: HTMLButtonElement = document.querySelector("#submit")!
const table: HTMLTableElement = document.querySelector("table")!


//functions

//Get The Match Players 
const GetPlayers = async (): Promise<Player[]> => {
    try {
        const data = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                position: position.value,
                twoPercent: twoPercent.value,
                threePercent: threePercent.value,
                points: points.value
            })
        })
        const players: Player[] = await data.json()
        return players
    }
    catch (err) {
        console.log(err);
        return []
    }
}

//search
search.addEventListener("click", async(): Promise<void> => {
    const players: Player[] = await GetPlayers()
    for (const player of players){
        const row = CreatePlayer(player)
        table.appendChild(row)
    }
})
