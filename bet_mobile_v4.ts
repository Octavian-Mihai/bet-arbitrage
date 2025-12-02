// TypeScript version of the Bet Arbitrage Calculator logic
// Assumes this script is used with an HTML file that has matching element IDs

const container = document.getElementById('linesContainer') as HTMLElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const calcBtn = document.getElementById('calcBtn') as HTMLButtonElement;
const results = document.getElementById('results') as HTMLElement;
const outputLines = document.getElementById('outputLines') as HTMLElement;
const totalStakeEl = document.getElementById('totalStake') as HTMLElement;
const profitEl = document.getElementById('profit') as HTMLElement;

let lineCount: number = 1;

// Add new line\addBtn.addEventListener('click', () => {
  if (lineCount >= 4) return;
  lineCount++;

  const line = document.createElement('div');
  line.className = 'flex flex-wrap items-center gap-2 bg-gray-50 p-3 rounded-lg';
  line.innerHTML = `
    <label class="w-16 font-medium">Odds:</label>
    <input type="number" step="0.01" placeholder="e.g. 3.10"
           class="flex-1 border p-2 rounded-lg odds-input" />
    <button class="bg-red-500 text-white px-2 py-1 rounded-lg removeBtn">−</button>
  `;
  container.appendChild(line);

  const removeBtn = line.querySelector('.removeBtn') as HTMLButtonElement;
  removeBtn.addEventListener('click', () => {
    line.remove();
    lineCount--;
  });
});

// Calculate stakes
calcBtn.addEventListener('click', () => {
  const oddsInputs = container.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;
  if (oddsInputs.length === 0) return;

  const odds: number[] = Array.from(oddsInputs)
    .map((input) => parseFloat(input.value))
    .filter((v) => v > 1);

  if (odds.length === 0 || isNaN(odds[0])) {
    alert('Please enter valid odds.');
    return;
  }

  const baseOdd = odds[0];
  const baseStake = 20;
  const stakes: number[] = [baseStake];

  for (let i = 1; i < odds.length; i++) {
    const stake = (baseOdd / odds[i]) * baseStake;
    stakes.push(stake);
  }

  const totalStake = stakes.reduce((a, b) => a + b, 0);
  const payout = baseStake * baseOdd;
  const profit = payout - totalStake;

  results.classList.remove('hidden');
  outputLines.innerHTML = '';

  odds.forEach((odd, i) => {
    const stake = stakes[i].toFixed(2);
    const potential = (stakes[i] * odd).toFixed(2);
    outputLines.innerHTML += `
      <div class="flex justify-between text-sm">
        <span>Line ${i + 1}: Odds ${odd}</span>
        <span>Stake: $${stake} → Payout: $${potential}</span>
      </div>`;
  });

  totalStakeEl.textContent = `Total Stake: $${totalStake.toFixed(2)}`;
  profitEl.textContent = `Guaranteed Profit: ${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}`;
  profitEl.className = profit >= 0 ? 'text-green-600' : 'text-red-600';
});
