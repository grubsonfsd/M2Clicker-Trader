# STATUS

## Decyzja
Realizujemy **M2Clicker Market Scanner** (wersja z `PROJECT_SPEC.md`): rozszerzenie przeglądarkowe,
które WYŁĄCZNIE odczytuje oferty z rynku i pokazuje najniższą cenę w opisie przedmiotu.
To nie jest bot. Brak automatycznego kupowania, wystawiania, klikania, wypełniania formularzy.

## Etap 1 – Research (w toku)
Gra (`game.m2clicker.com`) to SPA – z zewnątrz nie widać DOM-u ani żądań sieciowych.
Nie zakładamy żadnego API ani struktury danych, dopóki tego nie potwierdzimy.

Do ustalenia (na podstawie wyniku `tools/probe/probe.js`):
1. Skąd gra bierze listę ofert rynku (DOM vs. żądania fetch/XHR vs. WebSocket)?
2. Jak wygląda wiersz oferty (nazwa, cena, ilość, ID przedmiotu, sprzedawca)?
3. Jak wygląda tooltip/opis przedmiotu i gdzie można dodać sekcję informacyjną?
4. Czy rynek jest stronicowany/filtrowany (wpływa na kompletność skanu)?
5. Jakie jest dozwolone, niskie obciążeniowo tempo odświeżania?

## Następne kroki
- [ ] Uruchomić probe na stronie rynku i wkleić wynik (bez haseł/tokenów).
- [ ] Architektura (MarketScanner, ItemMatcher, PriceAnalyzer, MarketCache, DescriptionInjector, Settings).
- [ ] Szkielet rozszerzenia MV3 + testy parsera na zapisanych próbkach DOM.
