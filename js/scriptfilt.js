
function filtrerSpil() {
 
    // Lokal variabel som er en kopi af spillelisten.
    let filteredGames = [...games];
 
    // --------------------------- Håndtering af søgefelt ------------------------- //
    const searchText = document.getElementById("search-input").value.toLowerCase().trim();
    if (searchText) {
        filteredGames = filteredGames.filter(game =>
            game.navn.toLowerCase().includes(searchText) ||
            game.genre.join(" ").includes(searchText)
        );
    }
 
    // ---------------------- Håndtering af filtreringspanel ---------------------- //
 
    const genres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(cb => cb.value);
    const languages = Array.from(document.querySelectorAll('input[name="sprog"]:checked')).map(cb => cb.value);
    const players = parseInt(document.getElementById('players-range').value);
    const maxTime = parseInt(document.getElementById('time-range').value);
    const difficulty = document.querySelector('input[name="saerhedsgrad"]:checked')?.value || null;
 
    // Foreningsmængde: spillet skal passe på mindst én af de valgte genrer
    if (genres.length > 0) {
        filteredGames = filteredGames.filter(game =>
            game.genre.some(genre => genres.includes(genre))
        );
    }
 
    // Spil uden sprog ("NA") passer til alle sprog
    if (languages.length > 0) {
        filteredGames = filteredGames.filter(game =>
            game.sprog.some(lang => languages.includes(lang)) || game.sprog.includes("NA")
        );
    }
 
    // 0 = intet valgt. null i spillereMax betyder ingen øvre grænse
    if (players > 0) {
        filteredGames = filteredGames.filter(game =>
            game.spillereMin <= players && (game.spillereMax === null || players <= game.spillereMax)
        );
    }
 
    // 90 = ingen grænse
    if (maxTime < 90) {
        filteredGames = filteredGames.filter(game =>
            game.tidMin <= maxTime
        );
    }
 
    if (difficulty) {
        filteredGames = filteredGames.filter(game =>
            game.saerhedsgrad.includes(difficulty)
        );
    }
    // Filtrene er kædet efter hinanden, så resultatet er en fællesmængde:
    // spillet skal passe på ALLE de filtre, der er slået til.
 
    // -------------------- Håndtering af predefineret sortering ----------------- //
    const sorterEfter = document.getElementById("predefined-search").value;
 
    if (sorterEfter && sorterEfter === "titel") {
        filteredGames.sort((a, b) => a.navn.localeCompare(b.navn, "da"));
    }
 
    if (sorterEfter && sorterEfter === "tid-kort") {
        filteredGames.sort((a, b) => a.tidMin - b.tidMin);
    }
 
    if (sorterEfter && sorterEfter === "tid-lang") {
        filteredGames.sort((a, b) => b.tidMin - a.tidMin);
    }
 
    // Antal aktive filtre vises på filterknappen
    const aktive = [genres.length > 0, languages.length > 0, players > 0, maxTime < 90, difficulty]
        .filter(erAktiv => erAktiv).length;
    const badge = document.getElementById("filter-badge");
    badge.textContent = aktive;
    badge.hidden = aktive === 0;
 
    displayGames(filteredGames);
};
 
// Søg-knappen (og Enter i tekstfeltet)
document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    filtrerSpil();
});
 
document.getElementById("predefined-search").addEventListener("change", filtrerSpil);
 
document.getElementById('apply-filters').addEventListener('click', function () {
    filtrerSpil();
    closeFilterPanel();
});
 
document.getElementById('reset-filters').addEventListener('click', function () {
    document.querySelectorAll('input[name="genre"], input[name="sprog"]').forEach(cb => cb.checked = false);
    document.querySelector('input[name="saerhedsgrad"][value=""]').checked = true;
    document.getElementById('players-range').value = 0;
    document.getElementById('time-range').value = 90;
    updateRangeTexts();
    filtrerSpil();
});
 
// Initial visning
filtrerSpil();
 