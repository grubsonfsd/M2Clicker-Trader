# RESEARCH – ustalenia z probe (2026-11-03)

Źródło: wynik `tools/probe/probe.js` uruchomiony przez użytkownika na `https://game.m2clicker.com/market`.
Identyfikatory postaci zastąpione przez `{characterId}`.

## Potwierdzone
- Frontend: React (SPA), skrypt `assets/index-*.js`, Service Worker (`registerSW.js`).
  Flaga `angular: true` z probe wygląda na fałszywy alarm.
- Gra sama wykonuje żądania HTTP (fetch/XHR) do własnego API pod `/api/...`.
- Endpointy rynku widziane w żądaniach samej gry (ścieżka potwierdzona, **kształt odpowiedzi NIEZNANY**):
  - `GET /api/characters/{characterId}/market/offers?sort=price_asc` – lista ofert (wg ceny rosnąco)
  - `GET /api/characters/{characterId}/market/offers/mine` – własne oferty
  - `GET /api/characters/{characterId}/market/collections`
  - `GET /api/characters/{characterId}/market/sales`
- Gra odświeża te żądania w pętli (wiele powtórzeń w krótkim czasie).
- Komunikacja realtime: `/realtime/.../matchmake/joinOrCreate/account` (wygląda na Colyseus/WebSocket).
- Dane statyczne gry (`items.enc`, `item-attributes.enc`, ...) są w formacie `.enc`.
  **Nie próbujemy ich odszyfrowywać ani obchodzić.**
- UI rynku w DOM: filtr typu przedmiotu i filtr bonusów (`<select>`), lista ofert
  `ul.divide-y > li > button`, cena w `strong` z ikoną Yang i `span.sr-only` "Yang".
- localStorage nie zawiera niczego, co byłoby potrzebne scannerowi (tylko preferencje/czat).

## Nieznane (blokuje implementację)
1. Struktura JSON odpowiedzi `market/offers` (nazwa/ID przedmiotu, cena, ilość, paginacja?).
2. Struktura wiersza oferty w DOM (czy jest ID przedmiotu, czy tylko nazwa).
3. Struktura tooltipa/opisu przedmiotu (miejsce na sekcję "INFORMACJE O RYNKU").
4. Czy `market/offers` zwraca cały rynek, czy tylko stronę/filtr.
5. Zasady gry dot. dodatków/skryptów i dopuszczalnej częstotliwości odczytu.

## Warianty pozyskiwania danych (do decyzji)
| Wariant | Opis | Ryzyko |
|---|---|---|
| A. DOM | Czytamy to, co gra już wyrenderowała w widoku rynku | Najniższe; zero dodatkowych żądań; widać tylko to, co użytkownik ma na ekranie |
| B. Obserwacja odpowiedzi gry | Odczyt odpowiedzi na żądania, które gra i tak wysyła | Niskie/średnie; wymaga hooka na fetch w stronie; zero dodatkowych żądań |
| C. Własne żądania GET | Rozszerzenie samo woła `market/offers` | Najwyższe; dodatkowe żądania na koncie gracza; tylko po sprawdzeniu zasad gry / zgodzie administracji |

Rekomendacja startowa: **A (MVP)**, potem ewentualnie B. C dopiero po potwierdzeniu, że jest dozwolone.
