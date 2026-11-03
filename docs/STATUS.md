# STATUS

## Decyzja
Realizujemy **M2Clicker Market Scanner** (wersja z `PROJECT_SPEC.md`): rozszerzenie przeglądarkowe,
które WYŁĄCZNIE odczytuje oferty z rynku i pokazuje najniższą cenę w opisie przedmiotu.
To nie jest bot. Brak automatycznego kupowania, wystawiania, klikania, wypełniania formularzy.

## Etap 1 – Research (w toku)
Probe wykonany – szczegóły w `docs/RESEARCH.md`.

Do ustalenia (brakuje próbek danych):
1. Struktura JSON odpowiedzi `.../market/offers?sort=price_asc`.
2. HTML pojedynczego wiersza oferty (`ul.divide-y > li`).
3. HTML tooltipa/opisu przedmiotu.
4. Zasady gry dot. dodatków i częstotliwości odczytu.

## Następne kroki
- [x] Probe na stronie rynku.
- [ ] Próbki: odpowiedź `market/offers`, HTML wiersza, HTML tooltipa.
- [ ] Wybór wariantu pozyskiwania danych (A DOM / B obserwacja odpowiedzi / C własne żądania).
- [ ] Architektura (MarketScanner, ItemMatcher, PriceAnalyzer, MarketCache, DescriptionInjector, Settings).
- [ ] Szkielet rozszerzenia MV3 + testy parsera na zapisanych próbkach.
