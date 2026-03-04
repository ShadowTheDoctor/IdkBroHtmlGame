// Stan gry (to co chcemy zapisywać)
let gameState = {
    money: 0,
    workers: 0,
    workerCost: 10
};

let deb = true

// Funkcja zarabiania
function clickMoney() {
    gameState.money += 1;
    updateUI();
}

// Funkcja kupowania pracownika
function buyWorker() {
    // Sprawdzanie funduszy
    if (gameState.money >= gameState.workerCost) {
        gameState.money -= gameState.workerCost;
        gameState.workers += 1;
        gameState.workerCost = Math.round(gameState.workerCost * 1.5);
        updateUI();
    } else {
        // Logika Debounce dla komunikatu błędu
        if (deb === true) {
            deb = false; // Blokujemy kolejne komunikaty
            
            const TextGui = document.getElementById("NotEnoughMoneyText");
            TextGui.innerText = "Nie masz wystarczająco środków!";

            // Używamy setTimeout, aby wyczyścić napis i odblokować deb po 2 sekundach
            setTimeout(() => {
                TextGui.innerText = "";
                deb = true; // Odblokowujemy możliwość pokazania błędu ponownie
            }, 2000);
        }
    }
}

// AKTUALIZACJA INTERFEJSU
function updateUI() {
    document.getElementById('money').innerText = gameState.money;
    document.getElementById('workers').innerText = gameState.workers;
    document.getElementById('worker-cost').innerText = gameState.workerCost;
}

// === SYSTEM ZAPISYWANIA ===

function saveGame() {
    // Zamieniamy obiekt gry na tekst (JSON) i wrzucamy do pamięci przeglądarki
    localStorage.setItem('mojBiznesSave', JSON.stringify(gameState));
    console.log("Gra zapisana!");
}

function loadGame() {
    const savedData = localStorage.getItem('mojBiznesSave');
    if (savedData) {
        // Jeśli jest zapis, nadpisujemy aktualny stan
        gameState = JSON.parse(savedData);
        updateUI();
        console.log("Wczytano zapis!");
    }
}

function resetGame() {
    if(confirm("Na pewno chcesz usunąć zapis?")) {
        localStorage.removeItem('mojBiznesSave');
        location.reload(); // Odśwież stronę
    }
}

// Wczytaj grę automatycznie przy wejściu na stronę
loadGame();

// (Opcjonalnie) Automatyczny zapis co 30 sekund
setInterval(saveGame, 30000);

// (Opcjonalnie) Dochód pasywny od pracowników co 1 sekundę
setInterval(() => {
    if (gameState.workers > 0) {
        gameState.money += gameState.workers;
        updateUI();
    }
}, 1000);