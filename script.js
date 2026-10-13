/* =========================================================
Lab 4 - script.js starter
Focus: JavaScript Fundamentals
========================================================= */
const PRICES = { coffee: 3.25, sandwich: 8.50, salad: 7.25 };
const TAX_RATE = 0.05;
const STUDENT_RATE = 0.10;
const ECO_FEE = 1.00;
const BULK_QTY = 6;
const BULK_OFF = 2.00;
function money(n) {
    return `$${n.toFixed(2)}`;
}
/* TODO (JS #1):
- return trimmed + lowercase string
- handle cancel/empty safely
- if raw is null, it should return an empty string to avoid errors on .trim()
*/
function normalizeType(raw) {
    /* Add JS code here */
}
/* TODO (JS #2):
- return true only for "coffee", "sandwich", "salad"
*/
function isValidType(t) {
    /* Add JS code here */
}
/* TODO (JS #3):
- use a for loop to repeat an icon up to 10 times
- append the icons into the icons variable
- should add a line break and an indentation after every 3 icons
*/
function iconsFor(type, qty) {
    const map = { coffee: " ", sandwich: " ", salad: " " };
    const icon = map[type] || " ";
    const cap = Math.min(qty, 10);
    let icons = "";
    // for (...) {
    // ...
    // icons += icon;
    // }
    return icons;
}
/* TODO (JS #4):
- Implement full math rules
- unitPrice line is provided
*/
function processQuote(type, qty, isStudent, reusableCup) {
    const unitPrice = PRICES[type];
    // subtotal = unit price × quantity
    // studentDiscount = 10% (STUDENT_RATE) of subtotal if isStudent
    // ecoFee = ECO_FEE only if type is coffee AND reusableCup is false
    // bulkDiscount = BULK_OFF only if qty >= BULK_QTY
    // taxableAmount = subtotal - studentDiscount + ecoFee - bulkDiscount
    // tax = 5% (TAX_RATE) of taxableAmount
    // total = taxableAmount + tax
    return { unitPrice, subtotal, studentDiscount, ecoFee, bulkDiscount, tax, total };
};
function buildReceipt(type, qty, isStudent, reusableCup, calc) {
    const icons = iconsFor(type, qty);
    const studentText = isStudent ? "Yes" : "No";
    const cupText = (type === "coffee") ? (reusableCup ? "Yes" : "No") : "N/A";
    return `CAMPUS CAFÉ RECEIPT
------------------------
Item: ${type}
Unit price: ${money(calc.unitPrice)}
Quantity: ${qty}
${icons}
Student disc.: ${studentText}
Reusable cup: ${cupText}
Subtotal: ${money(calc.subtotal)}
Student -10%: -${money(calc.studentDiscount)}
Eco cup fee: ${money(calc.ecoFee)}
Bulk deal: -${money(calc.bulkDiscount)}
Tax (5%): ${money(calc.tax)}
------------------------
TOTAL: ${money(calc.total)}`;
}
/* TODO (JS #5):
- Show a clear error in #receipt
*/
function showError(msg) {
    /* Add JS code here */
}
/* TODO (JS #6):
- Reset #receipt to "No order data."
*/
function resetUI() {
    /* Add JS code here */
}
async function loadWeather() {
    const box = document.getElementById("weatherBox");
    const url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=53.5461&longitude=-113.4938" +
        "&current=temperature_2m,wind_speed_10m" +
        "&timezone=America/Edmonton";
    try {
        const res = await fetch(url);
        const data = await res.json();
        const t = data.current.temperature_2m;
        const w = data.current.wind_speed_10m;
        box.textContent = `Edmonton: ${t}°C • Wind ${w} km/h`;
    } catch {
        box.textContent = "Weather unavailable.";
    }
}
function main() {
    loadWeather();
    resetUI();
    document.getElementById("calcBtn").addEventListener("click", () => {
        const type = normalizeType(prompt("Enter item type: coffee / sandwich / salad"));
        if (!isValidType(type)) {
            showError("Item must be coffee, sandwich, or salad.");
            return;
        }
        const qty = Number(prompt("Enter quantity (1–10):"));
        /* TODO (JS #7):
        - Add quantity validation here
        - must be an integer
        - must be between 1 and 10
        - if invalid: showError(...) and stop
        */
        /* TODO (JS #8):
        - Add a confirm() dialog here to ask for student discounts
        - Store the result in a variable named isStudent
        */
        const reusableCup = (type === "coffee") ?
            confirm("Brought reusable cup(s)? (+$1.00 otherwise)") : true;
        const calc = processQuote(type, qty, isStudent, reusableCup);
        document.getElementById("receipt").textContent =
            buildReceipt(type, qty, isStudent, reusableCup, calc);
    });
    document.getElementById("resetBtn").addEventListener("click", () => {
        resetUI();
    });
}
main();