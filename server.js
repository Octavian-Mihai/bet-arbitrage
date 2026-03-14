const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DB = path.join(__dirname, "data", "bets.json");

function loadBets() {
  if (!fs.existsSync(DB)) return [];
  return JSON.parse(fs.readFileSync(DB));
}

function saveBets(bets) {
  fs.writeFileSync(DB, JSON.stringify(bets, null, 2));
}

app.post("/calculate", (req, res) => {
  const odds = req.body.odds;
  const baseStake = 20;

  const baseOdd = odds[0];
  const stakes = [baseStake];

  for (let i = 1; i < odds.length; i++) {
    stakes.push((baseOdd / odds[i]) * baseStake);
  }

  const totalStake = stakes.reduce((a, b) => a + b, 0);
  const payout = baseStake * baseOdd;
  const profit = payout - totalStake;

  res.json({
    stakes,
    totalStake,
    profit
  });
});

app.post("/save-bet", (req, res) => {
  const bets = loadBets();
  bets.push(req.body);
  saveBets(bets);
  res.json({ success: true });
});

app.get("/bets", (req, res) => {
  res.json(loadBets());
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});