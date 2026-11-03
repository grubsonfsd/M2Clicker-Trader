# STATUS (stan na 2026-11-03, ~12:00)

## Decyzja
Realizujemy **M2Clicker Market Scanner** (wersja z `PROJECT_SPEC.md`): rozszerzenie przeglądarkowe,
które WYŁĄCZNIE odczytuje oferty z rynku i pokazuje najniższą cenę w opisie przedmiotu.
To nie jest bot. Brak automatycznego kupowania, wystawiania, klikania, wypełniania formularzy.

## Decyzje użytkownika
- Bonusy przedmiotów (`preview.attributes`) NIE są brane pod uwagę przy porównywaniu cen.
- Klucz porównania = `itemVnum` + `instanceMetadata.skillVnum` (gdy występuje). Księgi umiejętności MUSZĄ być rozróżniane
  (ważne przy wystawianiu ich na rynek).
- Wariant pozyskiwania danych: **B** (odczyt odpowiedzi `market/offers`, które gra i tak pobiera; zero własnych żądań).
- Architektura: `docs/ARCHITECTURE.md` – propozycja przedstawiona użytkownikowi, **NIE zaakceptowana jeszcze**.
  Użytkownik nie odpowiedział też na pytanie, czy własne oferty (`isOwn: true`) wliczać do „najniższej ceny" (domyślnie: nie).

## Etap 1 – Research
Zebrane próbki (wszystkie zanonimizowane, w `samples/`):
- [x] `market-offers.json` – odpowiedź `market/offers?sort=price_asc` (30 ofert, `nextCursor`).
- [x] `offer-row.html` – wiersz oferty w DOM.
- [x] `tooltip.html` – tooltip przedmiotu (portal Base UI).
Analiza: `docs/RESEARCH.md`.

Brakuje (blokuje kod):
- [ ] Adresy żądań rynku z filtrem typu/bonusu i z kursorem (nazwy parametrów, rozmiar strony, `fetch` vs `xhr`).
      Narzędzie: `tools/probe/requests-probe.js` (użytkownik jeszcze go nie uruchomił).
- [ ] Próbka z kontekstu wystawiania księgi umiejętności (tooltip księgi w ekwipunku/oknie wystawiania + żądania, które gra wtedy wysyła).
- [ ] Zasady gry dot. dodatków i częstotliwości odczytu (ryzyko wariantu B: owijanie `window.fetch`).

## Następne kroki
- [x] Probe na stronie rynku.
- [x] Próbki: JSON ofert, wiersz, tooltip.
- [x] Wybór wariantu danych (B) i klucza porównania.
- [x] Propozycja architektury (`docs/ARCHITECTURE.md`).
- [ ] Akceptacja architektury przez użytkownika.
- [ ] Adresy żądań z filtrem/kursorem + próbka z wystawiania księgi.
- [ ] Szkielet rozszerzenia MV3 (TypeScript, esbuild, Vitest) + testy MarketScanner/ItemMatcher/PriceAnalyzer na `samples/*.json`.
- [ ] PageHook (świat MAIN) + DescriptionInjector na tooltipie.
- [ ] README: instalacja (chrome://extensions -> Load unpacked).
