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
const [pointGuard, shootingGuard, smallForward, powerForward, center]: NodeListOf<HTMLDivElement> = document.querySelectorAll(".player")!
const position: HTMLSelectElement = document.querySelector("select")!
const [points, twoPercent, threePercent]: NodeListOf<HTMLInputElement> = document.querySelectorAll("input")!
const search: HTMLParagraphElement = document.querySelector("#search")!
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

// search and print the players on the table
search.addEventListener("click", async(): Promise<void> => {
    const players: Player[] = await GetPlayers()
    table.innerText = ''
    const header = CreateTitle()
    table.appendChild(header)
    for (const player of players){
        const row = CreatePlayer(player)
        table.appendChild(row)
    }
})

//create title for table
const CreateTitle = (): HTMLTableRowElement => {
    const tr: HTMLTableRowElement = document.createElement("tr")!
    const playerTH: HTMLTableHeaderCellElement = document.createElement("th")!
    const positionTH: HTMLTableHeaderCellElement = document.createElement("th")!
    const pointsTH: HTMLTableHeaderCellElement = document.createElement("th")!
    const twoPercentTH: HTMLTableHeaderCellElement = document.createElement("th")!
    const threePercentTH: HTMLTableHeaderCellElement = document.createElement("th")!
    const actionTH: HTMLTableHeaderCellElement = document.createElement("th")!

    playerTH.textContent = "Player"
    positionTH.textContent = "Position"
    pointsTH.textContent = "Points"
    twoPercentTH.textContent = "FG%"
    threePercentTH.textContent = "3P%"
    actionTH.textContent = "Action"

    tr.append(playerTH, positionTH, pointsTH, twoPercentTH, threePercentTH, actionTH)

    return tr
}

//create player to the table
const CreatePlayer = (player: Player): HTMLTableRowElement => {
    const tr: HTMLTableRowElement = document.createElement("tr")!
    const playerTD: HTMLTableDataCellElement = document.createElement("td")!
    const positionTD: HTMLTableDataCellElement = document.createElement("td")!
    const pointsTD: HTMLTableDataCellElement = document.createElement("td")!
    const twoPercentTD: HTMLTableDataCellElement = document.createElement("td")!
    const threePercentTD: HTMLTableDataCellElement = document.createElement("td")!
    const actionTD: HTMLTableDataCellElement = document.createElement("td")!
    const btn: HTMLParagraphElement = document.createElement("p")!

    playerTD.textContent = player.playerName
    positionTD.textContent = player.position
    pointsTD.textContent = player.points.toString()
    twoPercentTD.textContent = player.twoPercent.toString()
    threePercentTD.textContent = player.threePercent.toString()

    btn.className = "action"
    const firstName = player.playerName.split(" ")[0]
    btn.textContent = `Add ${firstName} to Current Team`;
    btn.addEventListener("click", () => { addToMyTeam(player) })
    actionTD.appendChild(btn)
    
    tr.append(playerTD, positionTD, pointsTD, twoPercentTD, threePercentTD, actionTD)

    return tr
}

//add player to my team
const addToMyTeam = (player: Player): void => {
    let currentPosition: HTMLDivElement;
    switch (player.position){
        case "PG":
            pointGuard.textContent = ''
            const pointGuardTitle: HTMLParagraphElement = document.createElement("p")!
            pointGuardTitle.style.color = "blue"
            pointGuardTitle.textContent = "Point Guard🏀"
            pointGuard.appendChild(pointGuardTitle)
            currentPosition = pointGuard
            break
        case "SG":
            shootingGuard.textContent = ''
            const shootingGuardTitle: HTMLParagraphElement = document.createElement("p")!
            shootingGuardTitle.style.color = "blue"
            shootingGuardTitle.textContent = "Shooting Guard🏀"
            shootingGuard.appendChild(shootingGuardTitle)
            currentPosition = shootingGuard
            break
        case "SF":
            smallForward.textContent = ''
            const smallForwardTitle: HTMLParagraphElement = document.createElement("p")!
            smallForwardTitle.style.color = "blue"
            smallForwardTitle.textContent = "Small Forward🏀"
            smallForward.appendChild(smallForwardTitle)
            currentPosition = smallForward
            break
        case "PF":
            powerForward.textContent = ''
            const powerForwardTitle: HTMLParagraphElement = document.createElement("p")!
            powerForwardTitle.style.color = "blue"
            powerForwardTitle.textContent = "Power Forward🏀"
            powerForward.appendChild(powerForwardTitle)
            currentPosition = powerForward
            break
        case "C":
            center.textContent = ''
            const centerTitle: HTMLParagraphElement = document.createElement("p")!
            centerTitle.style.color = "blue"
            centerTitle.textContent = "Center🏀"
            center.appendChild(centerTitle)
            currentPosition = center
            break
    }

    const name = document.createElement("p")
    name.style.fontFamily = "cursive"
    const thp = document.createElement("p")
    const twp = document.createElement("p")
    const p = document.createElement("p")

    name.textContent = player.playerName
    thp.textContent = `Three Precents : ${player.threePercent.toString()}%`
    twp.textContent = `Two Precents : ${player.twoPercent.toString()}%`
    p.textContent = `Points : ${player.points.toString()}`

    currentPosition.append(name, thp, twp, p)
}
