# Bet Arbitrage Calculator

A simple mobile-friendly **Bet Arbitrage Calculator** built with HTML, JavaScript, and Tailwind CSS.
It helps calculate the stake distribution required to guarantee a profit when betting across different odds.

---

## Features

* 📱 **Mobile-friendly UI**
* ➕ Add up to **4 betting lines**
* ➖ Remove bet lines dynamically
* 💰 Automatic **stake calculation**
* 📊 Displays:

  * Stake per bet
  * Potential payout
  * Total stake
  * Guaranteed profit/loss
* ⚡ Instant calculations in the browser (no backend required)

---

## How It Works

The calculator uses a **fixed base stake of $20** on the first betting line.

For additional bets, the stake is calculated proportionally using:

```
stake_i = (baseOdd / odd_i) × baseStake
```

This ensures each bet returns approximately the same payout.

Example:

| Odds | Stake  | Potential Payout |
| ---- | ------ | ---------------- |
| 2.50 | $20    | $50              |
| 3.10 | $16.13 | $50              |

The calculator then computes:

```
Total Stake = sum of all stakes
Profit = payout − totalStake
```

If profit is positive, the bet is an **arbitrage opportunity**.

---

## Usage

1. Open the HTML file in your browser:

```
bet_mobile_v4.html
```

2. Enter the **odds** for the first bet.

3. Click **+ Add Bet** to add additional betting lines.

4. Click **Calculate**.

5. The results will display:

   * Stake per line
   * Potential payout
   * Total stake
   * Guaranteed profit/loss

---

## Technologies Used

* HTML5
* Vanilla JavaScript
* Tailwind CSS

Tailwind is loaded via CDN:

```
https://cdn.tailwindcss.com
```

No installation or build process is required.

---

## Project Structure

```
bet_mobile_v4.html
```

This is a **single-file application** containing:

* UI layout
* styling
* calculation logic

---

## Limitations

* Base stake is fixed at **$20**
* Maximum of **4 bets**
* Odds must be **greater than 1**
* No automatic arbitrage detection
* No data persistence

---

## Possible Improvements

Future enhancements could include:

* Adjustable base stake
* Automatic arbitrage detection
* Profit percentage calculation
* Saving bets
* Real-time odds comparison
* Backend API integration
* Installable mobile app (PWA)

---

## License

Free to use and modify.
