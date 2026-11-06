
// -------------- Javascript til håndtering af filtreringspanel -----------------
// -------------- og visning af spil-kort og dialogboks.        -----------------
// DOM elementer
const filterPanel = document.getElementById('filter-panel');
const overlay = document.getElementById('overlay');
const filterToggle = document.getElementById('filter-toggle');
const closeFilter = document.getElementById('close-filter');
const gamesContainer = document.getElementById('games-container');
const dialog = document.getElementById('game-dialog');
 
// Hjælpefunktioner der gør data pæne at læse
function playersText(game) {
    if (game.spillereMax === null) return game.spillereMin + "+ spillere";
    if (game.spillereMin === game.spillereMax) return game.spillereMin + " spillere";
    return game.spillereMin + "–" + game.spillereMax + " spillere";
}
 
function timeText(game) {
    if (game.tidMax === null) return game.tidMin + "+ min";
    if (game.tidMin === game.tidMax) return game.tidMin + " min";
    return game.tidMin + "–" + game.tidMax + " min";
}
 
function languageText(game) {
    const names = { DA: "Dansk", EN: "Engelsk", NA: "Intet sprog nødvendigt" };
    return game.sprog.map(s => names[s]).join(", ");
}
 
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
 
 
function displayGames(gamesToDisplay) {
    gamesContainer.innerHTML = '';
    document.getElementById('result-count').textContent = gamesToDisplay.length + " af " + games.length + " spil";
 
    if (gamesToDisplay.length === 0) {
        gamesContainer.innerHTML = '<p class="no-games">Ingen spil fundet. Prøv at justere dine filtre.</p>';
        return;
    }
 
    // Vis spil
    gamesToDisplay.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
 
        gameCard.innerHTML = `
            <img src="${encodeURI(game.billede)}" alt="Æske til ${game.navn}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.navn}</h3>
                <p class="game-description">${playersText(game)}<br>${timeText(game)}</p>
                <div class="game-meta">
                    ${game.genre.map(g => `<span class="game-category">${g}</span>`).join('')}
                </div>
                <div class="game-level">Sværhedsgrad: ${game.saerhedsgrad.map(capitalize).join(' – ')}</div>
                <button class="game-button" onclick="showGameDialog('${game.id}')">Vis</button>
            </div>
        `;
 
        gamesContainer.appendChild(gameCard);
    });
}
 
// Åbner dialogen og udfylder felterne med det valgte spil
function showGameDialog(gameId) {
    const game = games.find(g => g.id === gameId);
    document.getElementById('dialog-image').src = encodeURI(game.billede);
    document.getElementById('dialog-image').alt = "Æske til " + game.navn;
    document.getElementById('dialog-title').textContent = game.navn;
 
    document.getElementById('dialog-facts').innerHTML = `
        <dt>Spillere</dt><dd>${playersText(game)}</dd>
        <dt>Spilletid</dt><dd>${timeText(game)}</dd>
        <dt>Genre</dt><dd>${game.genre.map(capitalize).join(', ')}</dd>
        <dt>Sværhedsgrad</dt><dd>${game.saerhedsgrad.map(capitalize).join(' – ')}</dd>
        <dt>Sprog</dt><dd>${languageText(game)}</dd>
        <dt>Placering</dt><dd>${game.placering}</dd>
    `;
 
    // Reglerne ligger i mappen "regler" (ret stien hvis jeres filer ligger andre steder)
    document.getElementById('dialog-rules').innerHTML = `
        <a href="regler/${encodeURI(game.regler.billede)}" target="_blank">Se regler</a>
        <a href="regler/${encodeURI(game.regler.video)}" target="_blank">Se video</a>
    `;
 
    document.getElementById('dialog-similar').innerHTML = game.lignendeSpil
        .map(id => games.find(g => g.id === id))
        .map(g => `<button class="similar-button" onclick="showGameDialog('${g.id}')">${g.navn}</button>`)
        .join('');
 
    if (!dialog.open) dialog.showModal(); // åbner som modal med baggrundsdæmpning
    dialog.scrollTop = 0;
}
 
 
// Event listeners til håndtering af brugergrænseflade
filterToggle.addEventListener('click', toggleFilterPanel);
closeFilter.addEventListener('click', closeFilterPanel);
overlay.addEventListener('click', closeFilterPanel);
// Luk-knappen i dialogboksen
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
 
// Luk filter panel
function closeFilterPanel() {
    filterPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}
 
// Åbn/luk filter panel
function toggleFilterPanel() {
    filterPanel.classList.toggle('active');
    overlay.classList.toggle('active');
 
    if (filterPanel.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}
 
// Luk med filter panel med Escape tast
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filterPanel.classList.contains('active')) {
        closeFilterPanel();
    }
});
 
// Tekst ved siden af de to range-inputs
function updateRangeTexts() {
    const players = document.getElementById('players-range').value;
    const time = document.getElementById('time-range').value;
    document.getElementById('players-output').textContent = players == 0 ? "Alle" : players;
    document.getElementById('time-output').textContent = time == 90 ? "Ingen grænse" : "Højst " + time + " min";
}
 
document.getElementById('players-range').addEventListener('input', updateRangeTexts);
document.getElementById('time-range').addEventListener('input', updateRangeTexts);
 