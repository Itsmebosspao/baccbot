let bankerWins = 0;
let playerWins = 0;

let selectedSide = null;   // "P", "B", "T"
let numbers = [];          // 2 or 3 card values
let history = [];          // last 10 hands

function selectSide(side) {
  selectedSide = side;
  numbers = [];

  showMessage(
    (side === "P" ? "PLAYER" :
     side === "B" ? "BANKER" : "TIE") +
    " selected — enter cards"
  );
}

function addNumber(n) {
  if (!selectedSide) {
    alert("Select PLAYER, BANKER, or TIE first");
    return;
  }

  if (numbers.length >= 3) return;

  numbers.push(n);
  showMessage("INPUT: " + numbers.join(" + "));

  // auto-finish on 3 cards
  if (numbers.length === 3) {
    finalizeHand();
  }
}

function finalizeHand() {
  if (numbers.length < 2) return;

  const rawSum = numbers.reduce((a, b) => a + b, 0);
  const finalScore = rawSum % 10;

  let entry = "";

  if (selectedSide === "P") {
    playerWins++;
    entry = `P(${finalScore})`;
    showMessage(`PLAYER WIN\n${numbers.join(" + ")} = ${finalScore}`);
  }

  if (selectedSide === "B") {
    bankerWins++;
    entry = `B(${finalScore})`;
    showMessage(`BANKER WIN\n${numbers.join(" + ")} = ${finalScore}`);
  }

  if (selectedSide === "T") {
    entry = `T(${finalScore})`;
    showMessage(`TIE\n${numbers.join(" + ")} = ${finalScore}`);
  }

  addHistory(entry);
  updateStats();

  numbers = [];
  selectedSide = null;
}

function addHistory(item) {
  history.unshift(item);
  if (history.length > 10) history.pop();
  document.getElementById("history").innerText = history.join("  ");
}

function updateStats() {
  const total = bankerWins + playerWins;
  const bPct = total ? bankerWins / total : 0;
  const pPct = total ? playerWins / total : 0;

  document.getElementById("stats").innerText =
    `B: ${bankerWins} | P: ${playerWins}`;

  document.getElementById("percent").innerText =
    `B%: ${(bPct * 100).toFixed(1)} | P%: ${(pPct * 100).toFixed(1)}`;

  const bet = bPct >= pPct ? "BANKER" : "PLAYER";
  const signal = Math.abs(bPct - pPct) >= 0.08 ? "GO 🟢" : "STOP 🔴";

  document.getElementById("ai").innerHTML =
    `BET: ${bet}<br>SIGNAL: ${signal}`;
}

function showMessage(text) {
  document.getElementById("display").innerText = text;
}

function reset() {
  bankerWins = 0;
  playerWins = 0;
  selectedSide = null;
  numbers = [];
  history = [];

  document.getElementById("display").innerText = "READY";
  document.getElementById("stats").innerText = "B: 0 | P: 0";
  document.getElementById("percent").innerText = "B%: 0 | P%: 0";
  document.getElementById("ai").innerHTML = "BET: -<br>SIGNAL: STOP";
  document.getElementById("history").innerText = "—";
}
