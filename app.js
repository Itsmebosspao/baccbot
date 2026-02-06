let B = 0;
let P = 0;
let profit = 0;
let currentBet = 0;

function add(r) {
  if (r === "B") {
    B++;
    if (currentBet > 0 && lastBet === "BANKER") profit += currentBet;
    else if (currentBet > 0) profit -= currentBet;
  }

  if (r === "P") {
    P++;
    if (currentBet > 0 && lastBet === "PLAYER") profit += currentBet;
    else if (currentBet > 0) profit -= currentBet;
  }

  update();
}

function bet(n) {
  currentBet = n;
}

let lastBet = "-";

function update() {
  let total = B + P;
  let bPct = total ? B / total : 0;
  let pPct = total ? P / total : 0;

  document.getElementById("stats").innerText = `B: ${B} | P: ${P}`;
  document.getElementById("percent").innerText =
    `B%: ${(bPct*100).toFixed(1)} | P%: ${(pPct*100).toFixed(1)}`;

  let betSide = bPct >= pPct ? "BANKER" : "PLAYER";
  lastBet = betSide;

  let decision = document.getElementById("decision");

  if (Math.abs(bPct - pPct) >= 0.08) {
    decision.className = "go";
    decision.innerHTML = `BET: ${betSide}<br>SIGNAL: GO`;
  } else {
    decision.className = "stop";
    decision.innerHTML = `BET: ${betSide}<br>SIGNAL: STOP`;
  }

  document.getElementById("profit").innerText = `PROFIT: ${profit}`;
}

function reset() {
  B = 0;
  P = 0;
  profit = 0;
  currentBet = 0;
  lastBet = "-";
  update();
}
