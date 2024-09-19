"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";
//Get The Elements From Html
const [pointGuard, shootingGuard, smallForward, powerForward, center] = document.querySelectorAll(".player");
const position = document.querySelector("select");
const [points, twoPercent, threePercent] = document.querySelectorAll("input");
const search = document.querySelector("#search");
const table = document.querySelector("table");
//functions
//Get The Match Players 
const GetPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(BASE_URL, {
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
        });
        const players = yield data.json();
        return players;
    }
    catch (err) {
        console.log(err);
        return [];
    }
});
// search and print the players on the table
search.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield GetPlayers();
    table.innerText = '';
    const header = CreateTitle();
    table.appendChild(header);
    for (const player of players) {
        const row = CreatePlayer(player);
        table.appendChild(row);
    }
}));
//create title for table
const CreateTitle = () => {
    const tr = document.createElement("tr");
    const playerTH = document.createElement("th");
    const positionTH = document.createElement("th");
    const pointsTH = document.createElement("th");
    const twoPercentTH = document.createElement("th");
    const threePercentTH = document.createElement("th");
    const actionTH = document.createElement("th");
    playerTH.textContent = "Player";
    positionTH.textContent = "Position";
    pointsTH.textContent = "Points";
    twoPercentTH.textContent = "FG%";
    threePercentTH.textContent = "3P%";
    actionTH.textContent = "Action";
    tr.append(playerTH, positionTH, pointsTH, twoPercentTH, threePercentTH, actionTH);
    return tr;
};
//create player to the table
const CreatePlayer = (player) => {
    const tr = document.createElement("tr");
    const playerTD = document.createElement("td");
    const positionTD = document.createElement("td");
    const pointsTD = document.createElement("td");
    const twoPercentTD = document.createElement("td");
    const threePercentTD = document.createElement("td");
    const actionTD = document.createElement("td");
    const btn = document.createElement("p");
    playerTD.textContent = player.playerName;
    positionTD.textContent = player.position;
    pointsTD.textContent = player.points.toString();
    twoPercentTD.textContent = player.twoPercent.toString();
    threePercentTD.textContent = player.threePercent.toString();
    btn.className = "action";
    const firstName = player.playerName.split(" ")[0];
    btn.textContent = `Add ${firstName} to Current Team`;
    btn.addEventListener("click", () => { addToMyTeam(player); });
    actionTD.appendChild(btn);
    tr.append(playerTD, positionTD, pointsTD, twoPercentTD, threePercentTD, actionTD);
    return tr;
};
//add player to my team
const addToMyTeam = (player) => {
    let currentPosition;
    switch (player.position) {
        case "PG":
            pointGuard.textContent = '';
            const pointGuardTitle = document.createElement("p");
            pointGuardTitle.style.color = "blue";
            pointGuardTitle.textContent = "Point Guard🏀";
            pointGuard.appendChild(pointGuardTitle);
            currentPosition = pointGuard;
            break;
        case "SG":
            shootingGuard.textContent = '';
            const shootingGuardTitle = document.createElement("p");
            shootingGuardTitle.style.color = "blue";
            shootingGuardTitle.textContent = "Shooting Guard🏀";
            shootingGuard.appendChild(shootingGuardTitle);
            currentPosition = shootingGuard;
            break;
        case "SF":
            smallForward.textContent = '';
            const smallForwardTitle = document.createElement("p");
            smallForwardTitle.style.color = "blue";
            smallForwardTitle.textContent = "Small Forward🏀";
            smallForward.appendChild(smallForwardTitle);
            currentPosition = smallForward;
            break;
        case "PF":
            powerForward.textContent = '';
            const powerForwardTitle = document.createElement("p");
            powerForwardTitle.style.color = "blue";
            powerForwardTitle.textContent = "Power Forward🏀";
            powerForward.appendChild(powerForwardTitle);
            currentPosition = powerForward;
            break;
        case "C":
            center.textContent = '';
            const centerTitle = document.createElement("p");
            centerTitle.style.color = "blue";
            centerTitle.textContent = "Center🏀";
            center.appendChild(centerTitle);
            currentPosition = center;
            break;
    }
    const name = document.createElement("p");
    name.style.fontFamily = "cursive";
    const thp = document.createElement("p");
    const twp = document.createElement("p");
    const p = document.createElement("p");
    name.textContent = player.playerName;
    thp.textContent = `Three Precents : ${player.threePercent.toString()}%`;
    twp.textContent = `Two Precents : ${player.twoPercent.toString()}%`;
    p.textContent = `Points : ${player.points.toString()}`;
    currentPosition.append(name, thp, twp, p);
};
