# ARCHITEKTURA – M2Clicker Market Scanner (PROPOZYCJA, do akceptacji)

Status: **propozycja**. Kod rozszerzenia nie jest pisany do akceptacji tego dokumentu.

## 1. Decyzje użytkownika, na których się opiera
- Wariant pozyskiwania danych: **B** – odczyt odpowiedzi `market/offers`, które gra i tak pobiera. Zero własnych żądań.
- Klucz „ten sam przedmiot": **`itemVnum` + `instanceMetadata.skillVnum`** (gdy występuje, np. księgi umiejętności, vnum 50300).
  Bonusy (`preview.attributes`) i gniazda są pomijane. Rozróżnianie ksiąg jest ważne przy wystawianiu ich na rynek.
- Tylko odczyt i prezentacja (zasady z `HANDOFF.md`).

## 2. Przepływ danych

```
 ŚWIAT STRONY (MAIN)            ŚWIAT ROZSZERZENIA (ISOLATED content script)
 ┌──────────────┐  postMessage  ┌───────────────┐   ┌─────────────┐   ┌───────────────┐   ┌─────────────┐
 │  PageHook    │ ────────────► │ MarketScanner │──►│ ItemMatcher │──►│ PriceAnalyzer │──►│ MarketCache │
 │ (owija fetch,│  (kopia body  │ (waliduje     │   │ (klucz:     │   │ (min cena,    │   │ (storage    │
 │  czyta kopię │   JSON)       │  kształt)     │   │ vnum+skill) │   │ liczba, zasięg│   │  .local)    │
 │  odpowiedzi) │               └───────────────┘   └─────────────┘   └───────────────┘   └──────┬──────┘
 └──────────────┘                                                                               │ odczyt
                                                                                                ▼
 DOM gry: tooltip w portalu Base UI  ◄──────────────  DescriptionInjector  ◄───────────────  [klucz przedmiotu]
                                                      (MutationObserver)
 Settings (chrome.storage.sync) ──► próg nieaktualności, włącz/wyłącz
```

## 3. Moduły
| Moduł | Odpowiedzialność | Uwagi |
|---|---|---|
| PageHook | Owija `window.fetch`; dla GET pasujących do `.../market/offers` klonuje odpowiedź i przekazuje JSON przez `postMessage` | Nie czyta nagłówków żądania, nic nie wysyła, w razie błędu zawsze zwraca oryginalną odpowiedź |
| MarketScanner | Odbiera dane z hooka, sprawdza kształt (`offers[]`, `nextCursor`), odrzuca resztę | Czysty moduł, testowany na `samples/market-offers.json` |
| ItemMatcher | Buduje klucz `vnum` lub `vnum:skillVnum`; ustala klucz dla tooltipa | Patrz „Powiązanie tooltipa" |
| PriceAnalyzer | Najniższa `unitPriceYang` (BigInt), liczba ofert, ocena zasięgu danych | Brak danych != cena zero |
| MarketCache | Zapis i odczyt wyników w `chrome.storage.local` z czasem obserwacji | Bez haseł, ciasteczek, tokenów |
| DescriptionInjector | Dopisuje sekcję „INFORMACJE O RYNKU" do `_description_` w tooltipie | Nie blokuje UI gry, sprząta po sobie |
| Settings | Próg nieaktualności, włączenie dodatku | `chrome.storage.sync` |

## 4. Uczciwość wyniku (zasięg danych)
Odpowiedź API to jedna strona 30 ofert z kursorem, więc widzimy tylko to, co gra załadowała.
Rekord w cache przechowuje: najniższą cenę widzianą, liczbę widzianych ofert, `observedAt` i flagę zasięgu.
- Lista nieprzefiltrowana, załadowana od początku, sortowana `price_asc`: pierwsze wystąpienie przedmiotu to jego najniższa
  cena w załadowanych ofertach. Jeśli sortowanie obowiązuje globalnie między stronami (ZAŁOŻENIE – potwierdzone tylko w obrębie
  jednej strony), jest to najniższa cena na rynku w chwili odczytu.
- Przedmiotu nie ma w załadowanych stronach: komunikat „Brak w załadowanych ofertach (ceny od ... Yang)", nigdy „0" ani
  „brak ofert na rynku".
- Żądania z filtrami (typ, bonus) są traktowane jako dane **częściowe**, dopóki nie znamy nazw parametrów filtrów.
  Dotyczy to też dopisku „liczba ofert": zawsze „w załadowanych".
- Dane starsze niż próg z Settings: „Dane mogą być nieaktualne" (domyślny próg do ustalenia, propozycja 10 min).

## 5. Powiązanie tooltipa z przedmiotem (najsłabszy punkt)
Tooltip ma tylko nazwę, a oferty tylko `itemVnum`, więc potrzebny jest pomost:
- `itemVnum` z nazwy ikony `/game/icons/item/NNNNN_64.png` w triggerze z `aria-expanded="true"`.
  HIPOTEZA oparta na jednej parze (`02000` = vnum 2000), do sprawdzenia na kolejnych przedmiotach.
- `skillVnum` NIE ma w DOM. Dla ksiąg wymaga dopasowania wiersza do oferty (HIPOTEZA: kolejność `li` = kolejność `offers[]`;
  potwierdzona tylko dla pierwszego wiersza). Jeśli nie da się ustalić księgi, sekcja pokazuje „nie można ustalić księgi" zamiast ceny.
- Przy wystawianiu (ekwipunek, okno wystawiania) tooltip pochodzi z innego miejsca i nie wiemy, skąd wziąć `skillVnum`.
  Potrzebna osobna próbka (patrz „Otwarte").

## 6. Struktura repo i narzędzia (propozycja)
- TypeScript, bez frameworka UI, bundler esbuild, testy Vitest.
- `manifest.json` (MV3): dwa wpisy `content_scripts` dla `https://game.m2clicker.com/*`:
  hook w `world: "MAIN"` (`document_start`) i reszta w świecie izolowanym. Uprawnienia: tylko `storage`.
  Bez service workera na start.
- `src/hook/`, `src/core/` (MarketScanner, ItemMatcher, PriceAnalyzer, MarketCache – czysta logika, testowalna),
  `src/content/` (DescriptionInjector, spinanie), `src/settings/`.
- Testy parsera, klucza i analizy cen na `samples/*.json`.

## 7. Ryzyka wariantu B
- Owinięcie `window.fetch` zmienia środowisko strony (tylko odczyt, ale to ingerencja w kod strony). Zasady gry dotyczące
  dodatków NIE są sprawdzone. Awaryjnie: wariant A (sam DOM, bez vnuma).
- Gra może używać XHR zamiast `fetch` (probe widział „fetch/XHR") – hook musi to obsłużyć po sprawdzeniu.
- Zmiany w grze (klasy z hashami, kształt API) mogą zepsuć dopasowanie; stąd walidacja kształtu i degradacja do „brak danych".

## 8. Otwarte (blokują implementację)
1. Adresy żądań z Network: z filtrem typu/bonusu i z kursorem (nazwy parametrów, rozmiar strony).
2. Próbka z kontekstu wystawiania ksiąg: tooltip księgi w ekwipunku/oknie wystawiania i żądania, które gra wtedy wysyła.
3. Czy `fetch` czy XHR przy `market/offers` (widać w Network w kolumnie Initiator/Type).
4. Zasady gry dot. dodatków i częstotliwości odczytu.
5. Czy własne oferty (`isOwn: true`) wliczać do „najniższej ceny" (domyślnie: nie wliczać).
