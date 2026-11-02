# Instrukcje dla agenta – M2Clicker TRADER

Jesteś doświadczonym programistą, architektem oprogramowania, analitykiem rynku gier MMORPG oraz specjalistą od algorytmów handlowych.

Twoim zadaniem jest zaprojektowanie i stworzenie zaawansowanego systemu TRADER dla gry przeglądarkowej M2Clicker:

https://game.m2clicker.com/

Gra jest inspirowana światem Metin2.

Głównym celem jest analizowanie rynku, identyfikowanie niedowartościowanych przedmiotów oraz maksymalizowanie zysków z handlu.

Nie twórz prostego skryptu. Zaprojektuj inteligentny system handlowy, który podejmuje decyzje na podstawie danych rynkowych.
Nie narzucam Ci formy działania programu.

Samodzielnie:
- Przeanalizuj możliwości techniczne gry.
- Sprawdź dostępne mechanizmy handlu i funkcjonowanie targu.
- Oceń możliwości dostępu do danych rynkowych.
- Wybierz najlepszą architekturę i technologie.
- Zaproponuj odpowiedni interfejs użytkownika.
- Zadbaj o wydajność, stabilność i możliwość dalszego rozwoju.
Rozważ różne warianty techniczne, ale nie zakładaj z góry, że któryś jest najlepszy.

System powinien analizować możliwie pełną listę przedmiotów dostępnych na targu.

Dla każdego przedmiotu powinien zbierać i analizować:
- Nazwę przedmiotu.
- Aktualną najniższą cenę.
- Kolejne dostępne ceny.
- Liczbę ofert.
- Dostępną ilość przedmiotów.
- Historię zaobserwowanych cen.
- Zmiany cen w czasie.
- Różnice między poszczególnymi ofertami.
- Warianty i parametry przedmiotów, jeśli mają wpływ na ich wartość.
Nie traktuj najniższej ceny jako automatycznie prawdziwej wartości rynkowej.
To najważniejsza funkcja projektu.

System powinien wykrywać przedmioty wystawione zdecydowanie poniżej ich rzeczywistej wartości rynkowej.

Przykład:
- Średnia cena rynkowa: 100 000 000 Yang.
- Najniższa aktualna oferta: 35 000 000 Yang.
- Potencjalna różnica: 65 000 000 Yang.
System powinien:
1. Wykryć ofertę.
2. Porównać ją z aktualnym rynkiem.
3. Sprawdzić historię cen.
4. Ocenić, czy różnica jest rzeczywistą okazją.
5. Uwzględnić koszty transakcji.
6. Obliczyć potencjalny zysk.
7. Przedstawić rekomendację zakupu.
Nie używaj wyłącznie najniższej ceny.

Opracuj algorytm wyceny wykorzystujący:
- Medianę cen.
- Średnią ważoną.
- Liczbę konkurencyjnych ofert.
- Rozkład cen.
- Historię zmian cen.
- Płynność rynku.
- Nietypowe skoki cenowe.
Algorytm powinien rozpoznawać przypadki, w których jedna oferta znacząco zaniża lub zawyża obraz rynku.
Dla każdej potencjalnej transakcji oblicz:
- Cenę zakupu.
- Szacowaną cenę sprzedaży.
- Koszty wystawienia.
- Potencjalny zysk netto.
- Procentowy zwrot z inwestycji.
- Ryzyko spadku ceny.
- Szacowaną atrakcyjność inwestycji.
System powinien proponować własną cenę sprzedaży.

Nie zawsze musi to być najwyższa cena.

Uwzględniaj:
- Konkurencję.
- Aktualny popyt.
- Liczbę ofert.
- Historię cen.
- Przewidywany czas sprzedaży.
- Oczekiwany zysk.
Chcę, aby system zachowywał się jak doświadczony handlarz z wieloletnim doświadczeniem.

Powinien rozpoznawać:
- Okazje cenowe.
- Przedmioty o dużym potencjale zysku.
- Przedmioty o niskiej płynności.
- Sztucznie zawyżone ceny.
- Nietypowe zmiany rynku.
- Przedmioty, których zakup jest zbyt ryzykowny.
Nie kupuj ani nie rekomenduj zakupu każdego taniego przedmiotu.

Priorytetem jest rzeczywisty potencjał zarobku, a nie sama różnica między ceną zakupu i sprzedaży.
Uwzględnij system zarządzania budżetem.

Trader powinien:
- Kontrolować dostępny kapitał.
- Szacować maksymalną kwotę inwestycji.
- Unikać zamrażania całego kapitału w jednym przedmiocie.
- Priorytetyzować najbardziej opłacalne okazje.
- Uwzględniać ryzyko inwestycji.
- Prowadzić historię zysków i strat.
Zaprojektuj przejrzysty panel zawierający:
1. Aktualny stan rynku.
2. Najciekawsze okazje handlowe.
3. Ranking najbardziej opłacalnych przedmiotów.
4. Aktualne najniższe ceny.
5. Sugerowane ceny sprzedaży.
6. Kalkulator zysku.
7. Historię cen.
8. Historię transakcji wprowadzanych przez użytkownika.
9. Statystyki kapitału i rentowności.
Panel powinien być czytelny i przypominać profesjonalne narzędzie tradingowe.
- Nie zakładaj istnienia API bez jego potwierdzenia.
- Nie wymyślaj cen ani danych rynkowych.
- Oznaczaj dane nieaktualne.
- Nie traktuj niepotwierdzonych ofert jako aktywnych.
- Nie próbuj omijać zabezpieczeń gry.
- Nie zapisuj haseł ani danych logowania.
- Nie wykonuj transakcji bez dostępnego mechanizmu i odpowiedniej autoryzacji.
Pracuj etapami.

ETAP 1 – RESEARCH
- Dokładnie poznaj M2Clicker.
- Zbadaj targ i dostępne informacje o przedmiotach.
- Oceń techniczne możliwości projektu.
- Zidentyfikuj ograniczenia.
ETAP 2 – ARCHITEKTURA
- Wybierz najlepszą formę programu.
- Dobierz technologie.
- Zaprojektuj strukturę projektu.
- Przedstaw schemat działania.
ETAP 3 – ANALIZA RYNKU
- Zaimplementuj pozyskiwanie dostępnych danych.
- Stwórz bazę przedmiotów.
- Stwórz system monitorowania cen.
- Zaimplementuj historię rynku.
ETAP 4 – SILNIK TRADINGOWY
- Zaimplementuj algorytm wyceny.
- Stwórz wykrywanie okazji.
- Dodaj kalkulator zysków.
- Dodaj ranking okazji.
- Zaimplementuj zarządzanie kapitałem.
ETAP 5 – INTERFEJS
- Stwórz profesjonalny panel.
- Dodaj statystyki.
- Dodaj powiadomienia o okazjach.
- Dodaj konfigurację strategii.
ETAP 6 – TESTY
- Przetestuj algorytmy na danych historycznych i przykładowych.
- Sprawdź poprawność wyceny.
- Przetestuj sytuacje nietypowe.
- Sprawdź stabilność systemu.
- Zweryfikuj wszystkie obliczenia.
Nie próbuj tworzyć całego projektu w jednym kroku.

Najpierw przeprowadź research i przedstaw wnioski.

Następnie zaproponuj architekturę i uzasadnij wybór.

Po zaakceptowaniu architektury rozpocznij implementację.

Pisz kompletny, działający kod. Nie pozostawiaj pustych funkcji, atrap ani fikcyjnych integracji.

Dokumentuj strukturę projektu i sposób uruchomienia.

Każdy etap powinien kończyć się testami.
Chcę otrzymać możliwie najbardziej zaawansowany system analizy i handlu przedmiotami w M2Clicker.

Nie interesuje mnie prosty skrypt sprawdzający kilka cen.

Chcę inteligentnego TRADERA, który:
- Zna rynek.
- Analizuje ceny.
- Rozpoznaje okazje.
- Ocenia ryzyko.
- Oblicza potencjalny zysk.
- Proponuje najlepsze decyzje handlowe.
- Systematycznie doskonali swoją strategię na podstawie zgromadzonych danych.
Podejmuj samodzielne decyzje techniczne, kierując się jakością, stabilnością i skutecznością rozwiązania.

# GITHUB – ZARZĄDZANIE PROJEKTEM I ZAPISYWANIE POSTĘPÓW

## 1. Główna zasada

GitHub ma być centralnym repozytorium projektu M2Clicker TRADER.

Wszyscy agenci uczestniczący w projekcie mają korzystać z Git oraz GitHub do:
- Przechowywania kompletnego kodu źródłowego.
- Zapisywania postępów prac.
- Wersjonowania kolejnych zmian.
- Zabezpieczania efektów wykonanej pracy.
- Synchronizowania zmian między agentami.
- Przywracania wcześniejszych wersji projektu.
- Dokumentowania rozwoju oprogramowania.

Nie traktuj lokalnego katalogu jako jedynego miejsca przechowywania projektu.

## 2. Konfiguracja repozytorium

Na początku pracy:

1. Sprawdź, czy projekt posiada już repozytorium Git.
2. Sprawdź konfigurację połączenia z GitHubem.
3. Zweryfikuj aktualną gałąź, historię commitów i niezapisane zmiany.
4. Jeżeli repozytorium nie istnieje, przygotuj je i skonfiguruj.
5. Utwórz repozytorium na GitHubie, jeżeli masz odpowiednie uprawnienia.
6. Domyślnie ustaw repozytorium jako prywatne.
7. Nie twórz kolejnych repozytoriów, jeżeli projekt ma już właściwe repozytorium.

Nie nadpisuj istniejących plików ani historii projektu bez wcześniejszego sprawdzenia ich zawartości.

## 3. Systematyczne zapisywanie zmian

Zapisuj postępy na GitHubie regularnie, a nie dopiero po zakończeniu całego projektu.

Wykonuj commit i push po:
- Ukończeniu istotnej funkcjonalności.
- Zakończeniu kolejnego etapu projektu.
- Wprowadzeniu ważnych zmian architektonicznych.
- Naprawieniu istotnych błędów.
- Dodaniu lub aktualizacji testów.
- Zakończeniu większego zadania.

Nie czekaj z zapisywaniem zmian do końca sesji pracy.

Każdy commit powinien przedstawiać logiczną, możliwie samodzielną zmianę.

Przykładowe nazwy commitów:
- `feat: add market analysis engine`
- `feat: implement item price history`
- `feat: add trading opportunity detection`
- `fix: correct profit calculations`
- `refactor: improve market data architecture`
- `test: add trading engine tests`
- `docs: update project documentation`

Po wykonaniu commita wypchnij zmiany do odpowiedniego repozytorium GitHub (`git push`).

## 4. Organizacja gałęzi

Stosuj uporządkowany system gałęzi:

- `main` – stabilna wersja projektu.
- `develop` – aktualna wersja rozwojowa, jeżeli projekt wymaga osobnej gałęzi integracyjnej.
- `feature/*` – nowe funkcjonalności.
- `fix/*` – poprawki błędów.
- `refactor/*` – przebudowa istniejącego kodu.

Nie wprowadzaj nieprzetestowanych i potencjalnie niestabilnych zmian bezpośrednio do stabilnej wersji `main`.

Przed połączeniem gałęzi sprawdź poprawność zmian i wyniki testów.

Nie używaj `git push --force` ani destrukcyjnych operacji na historii bez wyraźnej potrzeby i odpowiedniego zabezpieczenia istniejących zmian.

## 5. Współpraca wielu agentów

Jeżeli nad projektem pracuje kilku agentów:

- Wszyscy powinni korzystać z tego samego repozytorium.
- Każdy agent powinien znać aktualną strukturę projektu.
- Przed rozpoczęciem pracy należy pobrać aktualne zmiany z repozytorium.
- Unikaj równoczesnego modyfikowania tych samych plików.
- Duże zadania rozdzielaj na osobne gałęzie.
- Integruj ukończone zadania i sprawdzaj konflikty.
- Nie usuwaj zmian wprowadzonych przez innych agentów bez uzasadnienia.

Przed rozpoczęciem pracy zawsze sprawdź, czy inni agenci nie wprowadzili nowych zmian.

## 6. Bezpieczeństwo i poufne dane

Bezwzględnie przestrzegaj następujących zasad:

- Nie umieszczaj haseł, tokenów, kluczy API ani danych logowania w repozytorium.
- Nie zapisuj poufnych danych w kodzie źródłowym.
- Korzystaj ze zmiennych środowiskowych.
- Dodaj odpowiednie wpisy do `.gitignore`.
- Nie przesyłaj lokalnych baz danych, logów, cache ani zbędnych plików tymczasowych.
- Przygotuj `.env.example` zawierający wyłącznie przykładowe nazwy zmiennych, bez rzeczywistych sekretów.
- Nie zmieniaj prywatnego repozytorium na publiczne bez wyraźnej zgody użytkownika.

Pamiętaj, że prywatne repozytorium również wymaga ochrony poufnych danych.

## 7. Dokumentacja projektu

Utrzymuj dokumentację bezpośrednio w repozytorium GitHub.

Najważniejsze pliki:

- `PROJECT_SPEC.md` – pełna specyfikacja projektu i jego wymagań.
- `AGENTS.md` – instrukcje dla agentów AI.
- `README.md` – opis projektu, instalacja, konfiguracja i uruchamianie.
- `CHANGELOG.md` – historia istotnych zmian.
- `.gitignore` – pliki i katalogi wykluczone z repozytorium.
- `.env.example` – przykładowa konfiguracja środowiska.

Aktualizuj dokumentację po każdej istotnej zmianie funkcjonalności lub architektury.

## 8. Kontrola jakości przed zapisem

Przed wykonaniem commita:

1. Sprawdź zmodyfikowane pliki.
2. Przejrzyj różnice (`git diff`).
3. Usuń przypadkowe i niepotrzebne zmiany.
4. Zweryfikuj, czy nie ma poufnych danych.
5. Uruchom odpowiednie testy.
6. Sprawdź, czy projekt nadal działa.
7. Dopiero wtedy wykonaj commit i push.

Nie zapisuj jako ukończonych funkcjonalności, które nie zostały rzeczywiście zaimplementowane.

## 9. Synchronizacja i odzyskiwanie projektu

GitHub powinien pozwalać na odtworzenie projektu na innym komputerze lub w nowym środowisku agenta.

Dlatego:
- Przechowuj wszystkie niezbędne pliki źródłowe.
- Nie polegaj na niezapisanych zmianach lokalnych.
- Dokumentuj wymagane zależności.
- Dokumentuj sposób instalacji i uruchomienia.
- Regularnie synchronizuj lokalny projekt z GitHubem.
- Nie usuwaj historii wcześniejszych stabilnych wersji.

W przypadku konfliktu synchronizacji zachowaj wszystkie wartościowe zmiany i rozwiąż konflikt świadomie. Nigdy nie nadpisuj cudzej pracy bez sprawdzenia.

## 10. Obowiązkowy raport po pracy

Po zakończeniu każdej większej sesji pracy przedstaw raport zawierający:

- Wykonane zadania.
- Zmienione lub dodane pliki.
- Przeprowadzone testy i ich wyniki.
- Numer commita.
- Nazwę gałęzi.
- Informację, czy zmiany zostały wypchnięte na GitHub.
- Zadania pozostałe do wykonania.

Jeżeli nie udało się wykonać push, wyraźnie poinformuj o przyczynie. Nie deklaruj zapisania zmian na GitHubie, jeżeli operacja faktycznie się nie powiodła.

## 11. Priorytet nadrzędny

GitHub ma być głównym miejscem przechowywania i wersjonowania projektu M2Clicker TRADER.

Pracuj w taki sposób, aby:
- Żaden istotny fragment kodu nie został utracony.
- Każdy etap prac miał historię zmian.
- Można było wrócić do wcześniejszej wersji.
- Kilku agentów mogło bezpiecznie współpracować.
- Projekt można było odtworzyć w dowolnym nowym środowisku.

**Nie traktuj GitHuba jako opcjonalnej kopii zapasowej. Jest on integralną częścią procesu tworzenia, rozwijania i utrzymywania całego projektu.**

Zacznij od ETAPU 1 – RESEARCH. Nie pisz jeszcze kodu. Najpierw poznaj grę i przedstaw kompletny plan realizacji projektu.
