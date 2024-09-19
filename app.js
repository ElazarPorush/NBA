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
const [pointGuard, shootingGuard, smallForward, center] = document.querySelectorAll(".player");
const position = document.querySelector("select");
const [points, twoPercent, threePercent] = document.querySelectorAll("input");
const search = document.querySelector("#submit");
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
//search
search.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield GetPlayers();
    for (const player of players) {
        const row = CreatePlayer(player);
        table.appendChild(row);
    }
}));
