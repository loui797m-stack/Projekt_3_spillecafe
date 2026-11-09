# Projekt_3_spillecafe

# Find et spil

En kodet søge- og filtreringsside til EAAA's spilsamling. Siden viser 13 brætspil og lader brugeren søge, filtrere og sortere dem. Den er lavet i IXD-projektet "Spilcafé" på Multimediedesign, Erhvervsakademi Aarhus, 2026.

Siden bygger på samme spil, objekter og attributter som vores Figma-prototype.

## Links

- **Live-løsning (GitHub Pages):** [https://loui797m-stack.github.io/Projekt_3_spillecafe/](https://loui797m-stack.github.io/Projekt_3_spillecafe/)
- **GitHub-repo:** [https://github.com/loui797m-stack/Projekt_3_spillecafe](https://github.com/loui797m-stack/Projekt_3_spillecafe)
- **Figma-fil (proces, identitet og designsystem):** [Figma-fil](https://www.figma.com/design/PRjdJs3Nf0BtTNfQ1eemq6/Projekt-3-Spillecafe---design?node-id=0-1&t=csCNROTL6PSzbiYo-1)
- **Figma-prototype (klikbar):** [Figma-prototype](https://www.figma.com/proto/PRjdJs3Nf0BtTNfQ1eemq6/Projekt-3-Spillecafe---design?node-id=815-22304&t=csCNROTL6PSzbiYo-1)

## Gruppe

Alberte, Viktor, Hadi og Louise

## Funktioner

- **Oversigt:** Alle spil vises som kort med billede, antal spillere, spilletid, genre og sværhedsgrad.
- **Søgning:** Et tekstfelt og en "Søg"-knap. Der søges i spillets titel og genre.
- **Filtrering:**
  - Genre (checkboxe)
  - Antal spillere (range-input)
  - Spilletid (range-input)
  - Sværhedsgrad (radioknapper)
  - Sprog (checkboxe)
- **Sortering:** Titel A–Å, spilletid kortest først eller spilletid længst først.
- **Detaljevisning:** Et klik på "Vis" åbner en `<dialog>` med alle oplysninger om spillet, links til regler og knapper til lignende spil.
- **Nulstil:** Filterpanelet har en knap, der nulstiller alle filtre.
- **Aktive filtre:** Filterknappen viser, hvor mange filtre der er slået til.
- **Tom visning:** Hvis ingen spil matcher, vises en besked.
  Søgning og filtre virker sammen, så brugeren kan filtrere sine søgeresultater.

## Datastruktur

Spillene ligger i `js/games.js` som et array af objekter, bygget ud fra vores objekt- og attributkortlægning. Der er ingen database.

```js
{
  navn: "Catan",
  id: "S013",
  spillereMin: 3,
  spillereMax: 4,          // null = ingen øvre grænse
  tidMin: 60,
  tidMax: 90,              // null = "min. + "
  genre: ["strategispil"],
  billede: "billeder/Catan.svg",
  saerhedsgrad: ["svær"],
  placering: "b4",
  lignendeSpil: ["S004", "S006"],   // id'er på andre spil
  regler: { billede: "catan.png", video: "catan.mp4" },
  sprog: ["DA"]            // "NA" = spillet er ikke sprogafhængigt
}
```

Genre, sværhedsgrad og sprog er arrays, så et spil kan høre til flere kategorier.

Sammenhængen i projektet er:
**Fysisk spil → objekt og attributter → array af objekter → kodet side og Figma-prototype**

## Mængdeoperationer

Koden bruger mængdeoperationer i `js/scriptfilt.js`:

- **Foreningsmængde:** Når flere genrer er valgt, vises spil, der passer på mindst én af dem (`some` og `includes`).
- **Fællesmængde:** Filtrene er kædet efter hinanden med `.filter()`, så et spil skal passe på alle de filtre, der er slået til.

## Projektstruktur

```
index.html          Siden
style.css           Styling med farver fra vores visuelle identitet
js/
  games.js          Arrayet med spillene
  scriptui.js       Viser kort, dialog og filterpanel
  scriptfilt.js     Søgning, filtrering og sortering
billeder/           Billeder af spilæsker (SVG)
```

## Sådan kører du siden

Siden er ren HTML, CSS og JavaScript, så der skal ikke installeres noget.

1. Hent eller klon repoet.
2. Åbn `index.html` i en browser. Du kan også bruge udvidelsen Live Server i VS Code.

## Teknik

- HTML, CSS og JavaScript uden frameworks
- `forEach`, `filter`, `sort`, `find`, `includes`, `some`, `toLowerCase` og `trim`
- Mobil som primær formfaktor, med to kolonner på små skærme
- `<dialog>` til detaljevisning
