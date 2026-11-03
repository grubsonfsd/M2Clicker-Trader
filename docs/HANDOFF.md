# HANDOFF – przekazanie projektu kolejnemu agentowi

Stan na 2026-11-03 (~12:00). Czytaj w kolejności: ten plik -> `docs/STATUS.md` -> `docs/ARCHITECTURE.md` -> `docs/RESEARCH.md`
-> `PROJECT_SPEC.md`. Próbki danych: `samples/`.

## 1. Co budujemy
**M2Clicker Market Scanner** – rozszerzenie przeglądarkowe (Manifest V3) do gry https://game.m2clicker.com/ (świat Metin2).
Odczytuje oferty z rynku, znajduje najniższą cenę przedmiotu i pokazuje ją w opisie przedmiotu (tooltip)
w sekcji "INFORMACJE O RYNKU": najniższa cena, liczba ofert, czas aktualizacji, ostrzeżenie o nieaktualnych danych.
Wzór wyglądu sekcji i moduły (MarketScanner, ItemMatcher, PriceAnalyzer, MarketCache, DescriptionInjector, Settings)
są w `PROJECT_SPEC.md`.

UWAGA: w historii był też drugi, szerszy pomysł (pełny TRADER). Użytkownik wybrał SCANNER. TRADER jest wstrzymany.
Nie mieszaj zakresów bez pytania.

## 2. Twarde zasady
- Tylko odczyt i prezentacja. ŻADNEGO kupowania, wystawiania, licytowania, klikania, wypełniania formularzy, sterowania postacią.
- Nie zakładaj API ani struktury danych bez potwierdzenia na próbkach. Nie wymyślaj endpointów, nazw parametrów, cen ani pól.
- NIE odszyfrowuj i nie obchodź plików `.enc` (items.enc, item-attributes.enc itd.).
- Nie zapisuj haseł, ciasteczek, tokenów. Nie proś użytkownika o wklejanie nagłówków Authorization/Cookie ani o HAR
  (zawiera ciasteczka). Adresy URL kopiujemy przez „Copy URL", nie „Copy as cURL/fetch".
- Własne żądania do API (wariant C) tylko po sprawdzeniu regulaminu gry / zgodzie administracji. Wybrany jest wariant B (zero własnych żądań).
- Brak danych != cena zero. Gdy skan jest niepełny, UI musi to jasno pokazać.
- Nie blokuj oryginalnego interfejsu gry; błąd rozszerzenia nie może wpłynąć na grę.
- Praca na branchach + PR. Nie merguj do `main` bez zgody użytkownika.
- Dane sprzedawców w próbkach anonimizuj (`seller1`...).
- Użytkownik pisze po polsku – odpowiadaj po polsku.
- Commity z trailerami (Co-Authored-By, Claude-Session), jeśli środowisko je narzuca.

## 3. Decyzje użytkownika (potwierdzone)
- Bonusy przedmiotów NIE są brane pod uwagę przy porównywaniu cen.
- Klucz „ten sam przedmiot" = `itemVnum` + `instanceMetadata.skillVnum` (gdy występuje). Księgi umiejętności (vnum 50300) rozróżniamy,
  bo to ważne przy wystawianiu ich na rynek.
- Wariant danych: **B** – odczyt odpowiedzi `market/offers`, które gra i tak pobiera.
- NIE potwierdzone: akceptacja `docs/ARCHITECTURE.md`; czy własne oferty (`isOwn`) wliczać do najniższej ceny (domyślnie: nie).

## 4. Najważniejsze ustalenia (szczegóły w `docs/RESEARCH.md`)
- API: `GET /api/characters/{characterId}/market/offers?sort=price_asc` zwraca `{ offers[30], nextCursor }`.
  Paginacja kursorowa (kursor = `id` ostatniej oferty). Sortowanie po `unitPriceYang`, miesza wszystkie przedmioty.
  Ceny to stringi -> porównuj jako BigInt. `itemVnum` identyfikuje przedmiot; `preview.attributes` = bonusy, `instanceMetadata.skillVnum` = księga.
- DOM: wiersz oferty `li` z dwoma `button` (ikona-trigger tooltipa + nazwa/cena). Brak `itemVnum` w DOM.
  Ikona `/game/icons/item/NNNNN_64.png` prawdopodobnie = vnum (potwierdzone tylko na 1 parze: `02000` = 2000).
- Tooltip: portal Base UI (`div[data-base-ui-portal]`) po najechaniu; `div._description_...` z nazwą, statystykami, "Liczba sztuk: N".
  Klasy z hashami są niestabilne – zaczepiaj się o `data-base-ui-portal`, `role`, `aria-label`, `data-*`.
- Odpowiedź API to tylko załadowana strona, więc wynik musi mówić „w załadowanych ofertach" (patrz sekcja 4 w `docs/ARCHITECTURE.md`).

## 5. Co zostało zrobione w repo (branch `research/stage-1`, PR #1, nic nie zmergowano do `main`)
- `docs/`: STATUS, RESEARCH, HANDOFF (ten plik), ARCHITECTURE (propozycja).
- `samples/`: `market-offers.json`, `offer-row.html`, `tooltip.html` (zanonimizowane).
- `tools/probe/`: `probe.js`, `row-probe.js`, `tooltip-probe.js`, `requests-probe.js` (wszystkie pasywne, tylko odczyt) + README.
- `main`: README.md (pusty), M2CLICKER_TRADER_PROJECT_INSTRUCTIONS.md, PROJECT_SPEC.md (wersja Scanner).
- Kod rozszerzenia NIE jest jeszcze pisany (czeka na akceptację architektury i brakujące próbki).

## 6. Następne kroki (kolejność)
1. Zapytać użytkownika o akceptację `docs/ARCHITECTURE.md` (i o `isOwn`).
2. Zdobyć od użytkownika (blokują kod):
   a) wynik `tools/probe/requests-probe.js` (uruchomić przy rynku; przez 90 s ustawić filtr typu, filtr bonusu i przewinąć listę) –
      da nazwy parametrów kursora/filtrów i typ żądania (`fetch` vs `xmlhttprequest`),
   b) próbkę z wystawiania księgi umiejętności: tooltip księgi w ekwipunku/oknie wystawiania (`tooltip-probe.js` lub zrzut)
      oraz żądania, które gra wtedy wysyła. Bez tego nie wiadomo, skąd wziąć `skillVnum` poza listą rynku.
3. Zapisać nowe próbki w `samples/` (zanonimizowane) i opisać w `docs/RESEARCH.md`; zaktualizować `docs/STATUS.md`.
4. Po akceptacji: szkielet MV3 (TypeScript, esbuild, Vitest, `manifest.json` z dwoma content scriptami: hook w `world: "MAIN"`
   i reszta w świecie izolowanym, uprawnienie tylko `storage`), czysta logika w `src/core/` z testami na `samples/*.json`.
5. PageHook (owijanie `fetch`, tylko GET `.../market/offers`, kopia odpowiedzi, `postMessage`) + obsługa XHR, jeśli gra go używa.
6. DescriptionInjector: dopisanie sekcji w `div._description_` tooltipa (MutationObserver na portalu). Sprawdzić, czy dopisanie
   nie psuje pozycjonowania tooltipa i czy React nie usuwa elementu.
7. README: instalacja (chrome://extensions -> Load unpacked).

## 7. Dostęp do repo
Repo: https://github.com/grubsonfsd/M2Clicker-Trader (właściciel `grubsonfsd`). W ostatniej sesji repo zostało dołączone do sesji
narzędziem do repozytoriów (klon do `/home/claude/m2clicker-trader`, push działał na `research/stage-1`).
Jeśli brak dostępu, poproś użytkownika o ponowne połączenie GitHuba albo pracuj lokalnie i przekazuj pliki/patche.
Nigdy nie proś o wklejenie tokenu GitHub do czatu.

## 8. Pułapki
- Probe z `probe.js` wykrył `angular: true`, ale to najpewniej fałszywy alarm (React potwierdzony).
- Gra odpytuje rynek w pętli – nie dokładaj własnego pollingu. Performance API ma ograniczony bufor, więc `requests-probe.js`
  używa PerformanceObservera.
- Przeglądarka pokazuje ostrzeżenie przy wklejaniu do konsoli: trzeba ręcznie wpisać „zezwalaj na wklejanie" (bez Entera).
- Założenie o globalnym sortowaniu między stronami jest NIEPOTWIERDZONE (próbka to jedna strona).
- Plan użytkownika w ostatniej sesji był bezpłatny: sterowanie przeglądarką i komputerem było niedostępne, więc agent nie
  może sam otworzyć gry ani Network. Próbki dostarcza użytkownik.
- Pamięć projektu w claude.ai zawiera tylko zarys decyzji; źródłem prawdy jest repo.
