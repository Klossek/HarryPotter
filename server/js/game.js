const { exec } = require("node:child_process");
let bookModule = require("./book.js");

function initBooks() {
  const serverPath = "audio/";
  let hp1 = bookModule.create({
    number: 1,
    file: serverPath + "hp_1.wma --gain=3",
    length: 34320,
  });
  let hp2 = bookModule.create({
    number: 2,
    file: serverPath + "hp_2.wma --gain=1",
    length: 40380,
  });
  let hp3 = bookModule.create({
    number: 3,
    file: serverPath + "hp_3.M4B --gain=2 ",
    length: 45360,
  });
  let hp4 = bookModule.create({
    number: 4,
    file: serverPath + "hp_4.m4b --gain=2",
    length: 81000,
  });
  let books = [hp1, hp2, hp3, hp4];
  return books;
}

exports.create = function (emitGame) {
  let books = initBooks();
  let players = [];
  let scoreTimer = 30;
  let pid;
  let intervalId;
  let stopped = true;
  let round = 0;
  let nextBook;

  let getRandomBook = function () {
    let max = books.length;
    let number = Math.floor(Math.random() * Math.floor(max));
    return books[number];
  };
  const sleep = (ms) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });

  const kill = () => {
    exec("kill " + pid);
    clearInterval(intervalId);
  };

  async function nextRound() {
    if (stopped) {
      return;
    }
    if (round > 9) {
      stopped = true;
      round = 0;
      emitGame();
      return;
    }

    //clear last score foreach player
    players = players.map((player) => {
      return { ...player, lastScore: null };
    });
    nextBook = getRandomBook();
    await sleep(2000);
    round++;
    emitGame();
    scoreTimer = 30;
    intervalId = setInterval(() => {
      scoreTimer -= 1;
      if (scoreTimer < 1) {
        kill();
      }
    }, 1000);
    pid = exec(nextBook.getCommand(), nextRound).pid;
  }

  const start = () => {
    stopped = false;
    round = 0;
    players = [];
    nextRound();
  };

  const restart = () => {
    stopped = true;
    players = [];
    kill();
  };

  const setSelection = (selected, userId) => {
    let player = players.find((p) => p._id === userId);
    if (player.lastScore) {
      return;
    }
    let score = -20;
    if (selected === nextBook.getNumber()) {
      score = scoreTimer;
      const isFirst = !players.find((p) => p.lastScore !== null);
      if (isFirst) {
        score += 10;
      }
    }
    player.lastScore = score;
    if (!player.score) {
      player.score = score;
    } else {
      player.score += score;
    }
    const isLast = players.find((p) => p.lastScore === null) === undefined;
    if (isLast) {
      kill();
    }
  };

  //Public methods
  let instance = {};

  instance.join = (user) => {
    if (!players.find((u) => u._id === user._id)) {
      const player = { ...user, lastScore: null };
      players.push(player);
    }
  };
  instance.isStarted = () => !stopped;
  instance.setSelection = setSelection;
  instance.start = start;
  instance.restart = restart;

  instance.getData = () => {
    return {
      players,
      round,
      scoreTimer,
      isStarted: !stopped,
    };
  };

  return instance;
};
