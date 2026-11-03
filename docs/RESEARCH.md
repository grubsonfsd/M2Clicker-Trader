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

## Próbka: wiersz oferty w DOM (`samples/offer-row.html`, 2026-11-03)
Wynik `row-probe.js`, sprzedawca zanonimizowany. Obserwacje (tylko to, co widać w próbce):
- Wiersz to `li` z dwoma `button`:
  1. Przycisk-ikona: `data-base-ui-tooltip-trigger`, `aria-haspopup="dialog"`, `aria-label="Łuk+0"`,
     w środku `img` z `src="/game/icons/item/02000_64.png?release=..."`. Tooltip przedmiotu najpewniej
     pochodzi z Base UI i jest renderowany dopiero po najechaniu (poza `li`) – do potwierdzenia próbką tooltipa.
  2. Przycisk-treść: nazwa w `strong.block.truncate` ("Łuk+0"), nazwa sprzedawcy w `span.text-xs`,
     cena w `strong` -> `span.sr-only` "Yang " + `span` z liczbą ("1").
- Brak widocznego atrybutu z ID przedmiotu ani ilości sztuk. Nazwa zawiera poziom ulepszenia ("+0").
- Numer w nazwie pliku ikony (`02000`) może być identyfikatorem przedmiotu/typu, ale to NIEPOTWIERDZONE –
  nie opieramy na nim ItemMatchera bez dalszej weryfikacji na wielu próbkach.
- Format dużych kwot (separator tysięcy, skróty typu "k") nieznany – próbka ma cenę "1".
  Parser ceny musi być sprawdzony na próbkach z wyższymi cenami.
- Klasy `_surface_13ymk_2` i `_slot_tz4fr_2` wyglądają na generowane przez bundler (hash) – nie opierać na nich selektorów.

## Próbka: odpowiedź `market/offers?sort=price_asc` (`samples/market-offers.json`, 2026-11-03)
Sprzedawcy zanonimizowani (`seller1`...). Wszystko poniżej sprawdzone skryptem na tej jednej próbce (30 ofert).

Kształt: `{ "offers": [ ... ], "nextCursor": "<id ostatniej oferty>" }`.

Pola oferty: `id`, `isOwn`, `sellerName`, `itemVnum`, `quantity`, `unitPriceYang` (STRING), `totalPriceYang` (STRING),
`durationDays`, `taxBasisPoints`, `listedAt`, `expiresAt`, `status`, `preview`.
`preview`: `id`, `itemVnum`, `count`, `attributes[] {slot, apply, value}`, `sockets[] {state}`, `instanceMetadata {}`.

Potwierdzone na próbce:
- **Paginacja kursorowa.** Strona = 30 ofert, `nextCursor` = `id` ostatniej oferty na stronie. Odpowiedź to więc TYLKO strona,
  nie cały rynek. (Nazwa parametru kursora w URL NIEZNANA – nie zgadujemy, patrz „Nieznane".)
- **Sortowanie `price_asc` jest po cenie JEDNOSTKOWEJ (`unitPriceYang`)**, rosnąco, i miesza WSZYSTKIE przedmioty.
  Najtańsza oferta konkretnego przedmiotu nie musi być na pierwszej stronie – tania np. broń z vnum 2000 jest na początku,
  ale drogi przedmiot będzie dopiero na dalszych stronach.
- `itemVnum` jest identyfikatorem przedmiotu (liczba). `totalPriceYang == unitPriceYang * quantity` we wszystkich 30 ofertach;
  `quantity == preview.count`.
- Ceny to stringi (prawdopodobnie liczby całkowite o dużym zakresie) – porównywać jako liczby całkowite (BigInt), nie jako tekst.
- Dopasowanie do DOM: pierwsza oferta (vnum 2000, "Łuk+0", cena 1) odpowiada wierszowi z `samples/offer-row.html`,
  a ikona tego wiersza to `02000_64.png`. Spójne z hipotezą, że numer w nazwie ikony = `itemVnum` (jedna para – nadal do potwierdzenia).
- `durationDays` 1 -> `taxBasisPoints` 200, 3 -> 600 (w próbce; nie dotyczy ceny, którą widzi kupujący).
- `status` we wszystkich ofertach `ACTIVE`, `isOwn` we wszystkich `false` (własne oferty powinny być oznaczone `true` – do sprawdzenia).

Konsekwencje dla ItemMatchera (to ważne):
- Sam `itemVnum` NIE wystarcza do porównania cen. W próbce:
  - `itemVnum 50300` występuje z różnym `instanceMetadata.skillVnum` (62, 108, 34) – to najpewniej różne księgi umiejętności,
  - `itemVnum 2000` ma `attributes` (`ATTBONUS_UNDEAD` = 6), a inne egzemplarze mogą mieć inne bonusy lub ich brak,
  - przedmioty mają `sockets` (stan `CLOSED`) – znaczenie niepotwierdzone.
- Klucz porównania ofert wymaga decyzji z użytkownikiem (patrz „Do decyzji").
- Mapowania `itemVnum` -> nazwa NIE ma w odpowiedzi API. Nazwę widać w DOM (np. "Łuk+0"). Nie próbujemy czytać `items.enc`.

## Próbka: tooltip przedmiotu (`samples/tooltip.html`, 2026-11-03)
Wynik `tooltip-probe.js`; dwa tooltipy (zbroja i przedmiot sztukowy). Obserwacje:
- Tooltip jest renderowany w **portalu Base UI** (`div[data-base-ui-portal]`, id typu `_r_5me_`) dopiero po najechaniu,
  poza `li` oferty. Wewnątrz: wrapper `position: fixed` (`role="presentation"`, `data-side="right"`, `z-40`,
  `pointer-events-none`) -> `div` powierzchni (`_surface_..._preview_...`) -> `div` opisu (`_description_...`).
- Zawartość `_description_`: nazwa (`div._name_`), opcjonalnie `p` "Od poziomu: N", `ul[aria-label="Podstawowe wartości przedmiotu"]`,
  `ul[aria-label="Bonusy wbudowane"]` (`li[data-negative]` dla ujemnych), blok wymagań (`div._requirements_`: "[ Do ubrania ]",
  klasa, "Niespełnione wymagania"), opis fabularny (`div._itemDescription_`), "Liczba sztuk: N".
- Atrybut `data-unavailable="true"` na `_description_` oznacza niespełnione wymagania postaci.
- Nazwa w tooltipie jest skrócona ("Burzowa Zbroj. Płyt.+0") i zawiera poziom ulepszenia. W tooltipie NIE MA `itemVnum` ani ceny.
- Klasy z hashami (`_name_1hhh9_31`, `_surface_1hhh9_2`...) są generowane przez bundler i mogą się zmienić po aktualizacji gry.
  Stabilniejsze punkty zaczepienia: `data-base-ui-portal`, `role="presentation"`, `aria-label` list, atrybuty `data-*`.
- Nie wiadomo (do sprawdzenia przy implementacji): jak powiązać otwarty tooltip z konkretnym wierszem/ofertą (w próbce trigger
  ma `aria-expanded="false"` i brak `aria-describedby`), czy dodanie elementu do tooltipa zmieni jego pozycję/rozmiar
  (pozycjonowanie robi biblioteka), i czy React nie usunie dopisanego elementu przy ponownym renderze.
- Probe nie pokazał, jak tooltip wyświetla `preview.attributes` (bonusy dodatkowe, np. `ATTBONUS_UNDEAD`) ani `sockets`;
  próbka obejmuje tylko przedmioty bez bonusów dodatkowych.

## Nieznane (blokuje implementację)
1. ~~Struktura JSON odpowiedzi `market/offers`~~ – rozpoznana (patrz wyżej). Nieznane: nazwy parametrów zapytania
   (kursor, filtr przedmiotu/typu/bonusu, rozmiar strony) – tylko z żądań, które gra sama wysyła.
2. ~~Struktura wiersza oferty w DOM~~ – rozpoznana (patrz wyżej); w DOM nie ma `itemVnum`, ale jest w odpowiedzi API.
3. ~~Struktura tooltipa/opisu przedmiotu~~ – rozpoznana (patrz wyżej). Nieznane: powiązanie tooltipa z wierszem oferty
   oraz zachowanie przy dopisaniu własnej sekcji (pozycjonowanie, ponowny render).
4. ~~Czy `market/offers` zwraca cały rynek~~ – NIE, zwraca stronę 30 ofert z kursorem. Nieznane: ile jest stron i czy gra
   filtruje po stronie serwera (filtry typu/bonusu w UI sugerują, że tak).
5. Zasady gry dot. dodatków/skryptów i dopuszczalnej częstotliwości odczytu.

## Warianty pozyskiwania danych (do decyzji)
| Wariant | Opis | Ryzyko |
|---|---|---|
| A. DOM | Czytamy to, co gra już wyrenderowała w widoku rynku | Najniższe; zero dodatkowych żądań; widać tylko to, co użytkownik ma na ekranie |
| B. Obserwacja odpowiedzi gry | Odczyt odpowiedzi na żądania, które gra i tak wysyła | Niskie/średnie; wymaga hooka na fetch w stronie; zero dodatkowych żądań |
| C. Własne żądania GET | Rozszerzenie samo woła `market/offers` | Najwyższe; dodatkowe żądania na koncie gracza; tylko po sprawdzeniu zasad gry / zgodzie administracji |

Rekomendacja startowa (przed próbką JSON): **A (MVP)**, potem ewentualnie B. C dopiero po potwierdzeniu, że jest dozwolone.

**Aktualizacja po próbce JSON:** DOM nie zawiera `itemVnum`, bonusów ani informacji o gniazdach, a odpowiedź API je ma.
Wariant B (odczyt odpowiedzi, które gra i tak pobiera) daje dokładniejsze dopasowanie przedmiotów przy zerze dodatkowych żądań,
ale wymaga hooka na `fetch` w kontekście strony. Wariant A widzi wyłącznie to, co jest na ekranie. Oba pokazują tylko dane,
które gracz sam załadował – żaden nie daje „najniższej ceny z całego rynku". Pełny skan to wariant C (dodatkowe żądania) – po sprawdzeniu zasad gry.
Wymaga decyzji użytkownika.

## Do decyzji (z użytkownikiem)
1. ~~Wariant pozyskiwania danych~~ – **DECYZJA użytkownika (2026-11-03): wariant B** (odczyt odpowiedzi, które gra i tak pobiera).
   Architektura: `docs/ARCHITECTURE.md` (propozycja do akceptacji).
2. ~~Co znaczy „ten sam przedmiot"~~ – **DECYZJA użytkownika (2026-11-03): bonusy przedmiotów (`preview.attributes`) NIE są brane pod uwagę
   przy porównywaniu cen.** Klucz porównania = `itemVnum` + `instanceMetadata.skillVnum` (gdy
   występuje). Użytkownik potwierdził (2026-11-03): księgi umiejętności MUSZĄ być rozróżniane – ważne przy wystawianiu ich na rynek.
   Skoro bonusy są pomijane, w opisie warto zaznaczyć, że cena dotyczy przedmiotów o tym samym numerze niezależnie od bonusów.
3. Co pokazujemy, gdy widzimy tylko część rynku (np. jedną stronę): sekcja musi to jasno komunikować (zasada: brak danych != cena zero).
