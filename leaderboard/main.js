let weightData;
let leaderboardData = {};

addEventListener('DOMContentLoaded', init);
async function init() {
    weightData = await getWeight();
    getLeaderboard()
    makeLeaderboardJSON();

    console.log("weight", weightData);
    console.log("leaderboard", leaderboardData);
}

document.getElementById('getleaderboard').addEventListener('click', function() {
    console.log(leaderboardData);
});

document.getElementById('makeleaderboard').addEventListener('click', function() {
    makeLeaderboardJSON();
});

function makeLeaderboardJSON() {
    console.log("make leaderboard called");
    for (artist in weightData) {
        leaderboardData[artist] = {};
        for (album in weightData[artist]) {
            leaderboardData[album] = {};
            for (song in weightData[artist][album].songs) {
                const songName = weightData[artist][album].songs[song];
                console.log("songName", songName);
                leaderboardData[artist][album][songName] = [{"name": "NUL", "points": 0}] 
            }
        } 
    }
    console.log(leaderboardData);
}

async function getWeight() {
    const response = await fetch('../weight.json');
    const weightData = await response.json();
    return weightData;
}

async function getLeaderboard() {
    fetch('https://www.swiftguesser.kolin63.com/leaderboard/leaderboard.json')
    .then(response => response.json())
    .then(data => {
        console.log("getLeaderboard(): ", data);
        leaderboardData = data;
    });
}

async function setLeaderboard(updatedLeaderboard) {
    fetch('https://www.swiftguesser.kolin63.com/leaderboard/leaderboard.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedLeaderboard)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    });
}

function getEmptyLeaderboard() {
    let emptyLeaderboard = [];
    for (let i = 0; i < 10; i++) {
        emptyLeaderboard[i] = {
            "name": "NUL",
            "points": 0
        }
    }
    return emptyLeaderboard;
}