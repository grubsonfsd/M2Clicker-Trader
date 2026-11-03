# HANDOFF – przekazanie projektu kolejnemu agentowi

Stan na 2026-11-03. Czytaj w kolejności: ten plik -> `PROJECT_SPEC.md` -> `docs/RESEARCH.md` -> `docs/STATUS.md`.

## 1. Co budujemy
**M2Clicker Market Scanner** – rozszerzenie przeglądarkowe (Manifest V3) do gry https://game.m2clicker.com/ (świat Metin2).
Odczytuje oferty z rynku, znajduje najniższą cenę przedmiotu i pokazuje ją w opisie przedmiotu
(sekcja "INFORMACJE O RYNKU": najniższa cena, liczba ofert, czas aktualizacji, ostrzeżenie o nieaktualnych danych).
Wzór wyglądu sekcji i moduły (MarketScanner, ItemMatcher, PriceAnalyzer, MarketCache, DescriptionInjector, Settings) są w `PROJECT_SPEC.md`.

UWAGA: w historii był też drugi, szerszy pomysł (pełny TRADER: wycena, okazje, kapitał, panel). Użytkownik wybrał
SCANNER. TRADER jest wstrzymany. Nie mieszaj zakresów bez pytania.

## 2. Twarde zasady (z PROJECT_SPEC.md i ustaleń z użytkownikiem)
- Tylko odczyt i prezentacja. ŻADNEGO kupowania, wystawiania, licytowania, klikania, wypełniania formularzy, sterowania postacią.
- Nie zakładaj API ani struktury danych bez potwierdzenia na próbkach. Nie wymyślaj endpointów, cen ani pól.
- NIE odszyfrowuj i nie obchodź plików `.enc` (items.enc, item-attributes.enc itd.).
- Nie zapisuj haseł, ciasteczek, tokenów. Nie proś użytkownika o wklejanie nagłówków Authorization/Cookie.
- Unikaj nadmiernej liczby żądań. Własne żądania do API (wariant C) tylko po sprawdzeniu regulaminu gry / zgodzie administracji.
- Brak danych != cena zero. Gdy skan jest niepełny, UI musi to jasno pokazać.
- Nie blokuj oryginalnego interfejsu gry.
- Praca na branchach + PR. Nie merguj do `main` bez zgody użytkownika.
- Użytkownik pisze po polsku – odpowiadaj po polsku.

## 3. Dotychczasowe ustalenia (szczegóły w docs/RESEARCH.md)
- Frontend: React SPA. Gra sama wywołuje `GET /api/characters/{characterId}/market/offers?sort=price_asc`
  (+ `offers/mine`, `collections`, `sales`). Realtime: Colyseus (`/realtime/...`).
- Lista ofert w DOM: `ul.divide-y > li > button`, cena w `strong` z ikoną Yang i `span.sr-only` "Yang".
- Interfejs gry jest po polsku (filtry typu przedmiotu i bonusów).
- NIEZNANE (blokuje kod): kształt JSON z `market/offers`; HTML wiersza oferty; HTML tooltipa; czy API zwraca cały rynek czy stronę;
  zasady gry dot. dodatków.

## 4. Co zostało zrobione w repo
- PR #1 (branch `research/stage-1` -> `main`): `docs/STATUS.md`, `docs/RESEARCH.md`, `docs/HANDOFF.md`,
  `tools/probe/*` (pasywne skrypty tylko do odczytu). Do `main` NIC nie zmergowano.
- `main` zawiera: README.md (pusty), M2CLICKER_TRADER_PROJECT_INSTRUCTIONS.md (instrukcje zachowania agenta), PROJECT_SPEC.md (wersja Scanner).

## 5. Następne kroki (kolejność)
1. Zdobyć od użytkownika 3 próbki (patrz `tools/probe/README.md`):
   a) odpowiedź JSON `market/offers?sort=price_asc` (kilka ofert, nazwy sprzedawców zanonimizowane),
   b) wynik `tools/probe/row-probe.js` (HTML wiersza oferty),
   c) wynik `tools/probe/tooltip-probe.js` lub zrzut ekranu tooltipa.
2. Zapisać próbki jako `samples/*.json|html` (zanonimizowane) i opisać w `docs/RESEARCH.md`.
3. Z użytkownikiem wybrać wariant pozyskiwania danych: A (DOM) / B (obserwacja odpowiedzi gry) / C (własne żądania).
   Rekomendacja: A na MVP.
4. Zaproponować architekturę (diagram modułów) i uzyskać akceptację.
5. Szkielet MV3 (manifest, content script, moduły), parser z testami na zapisanych próbkach (np. Vitest), cache w storage rozszerzenia.
6. DescriptionInjector: wstawianie sekcji w tooltip. Stylistyka zgodna z grą.
7. Instrukcja instalacji (chrome://extensions -> Load unpacked) w README.

## 6. Dostęp do repo
Repo publiczne: https://github.com/grubsonfsd/M2Clicker-Trader (właściciel `grubsonfsd`).
Zapis wymaga autoryzacji (poprzedni agent użył konektora GitHub przez Composio z OAuth użytkownika).
Jeśli połączenia brak, poproś użytkownika o ponowną autoryzację lub pracuj lokalnie (Claude Code) i przekazuj pliki/patche.
Nigdy nie proś o wklejenie tokenu GitHub do czatu.

## 7. Pułapki
- Probe wykrył `angular: true`, ale to najpewniej fałszywy alarm (React potwierdzony).
- Gra odpytuje rynek w pętli – nie dokładaj własnego pollingu bez potrzeby.
- Przeglądarka pokazuje ostrzeżenie przy wklejaniu do konsoli: trzeba wpisać ręcznie "zezwalaj na wklejanie" (bez Entera).
- W czacie, w którym użyto konektora, zapis do pamięci projektu był zablokowany – dlatego stan jest w repo.
