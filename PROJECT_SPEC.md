# CLAUDE.md – M2Clicker Market Scanner

## 1. Cel projektu

Tworzymy dodatek (rozszerzenie przeglądarkowe) do gry M2Clicker.

Głównym zadaniem aplikacji jest skanowanie rynku w grze w celu znalezienia najniższej aktualnej ceny wybranego przedmiotu i wyświetlenia tej informacji bezpośrednio w opisie przedmiotu.

Aplikacja ma pełnić wyłącznie funkcję informacyjną i analityczną.

**Nie jest to bot ani narzędzie automatyzujące rozgrywkę.**

## 2. Najważniejsze założenia

Aplikacja:
- Odczytuje informacje o przedmiotach wystawionych na rynku.
- Analizuje dostępne oferty.
- Rozpoznaje przedmioty na podstawie ich nazwy i, jeśli to możliwe, identyfikatora.
- Wyszukuje najniższą cenę danego przedmiotu.
- Wyświetla najniższą znalezioną cenę w opisie przedmiotu.
- Informuje o liczbie znalezionych ofert.
- Pokazuje czas ostatniej aktualizacji danych.
- Nie ingeruje w mechanikę gry.

## 3. Bezwzględne ograniczenia

Aplikacja NIE MOŻE:
- Automatycznie kupować przedmiotów.
- Automatycznie wystawiać przedmiotów na sprzedaż.
- Automatycznie licytować.
- Automatycznie wykonywać transakcji.
- Automatycznie klikać przycisków w grze.
- Automatycznie wypełniać formularzy.
- Wysyłać poleceń do gry powodujących działania w imieniu gracza.
- Sterować postacią.
- Automatyzować żadnych czynności związanych z rozgrywką.

Dopuszczalne jest wyłącznie odczytywanie danych, ich przetwarzanie i prezentowanie wyników.

## 4. Główna funkcjonalność – skaner rynku

Skaner powinien:
1. Odczytywać dostępne oferty na rynku.
2. Pobierać nazwę przedmiotu.
3. Pobierać cenę przedmiotu.
4. Rozpoznawać przedmioty tego samego typu.
5. Porównywać ceny wszystkich dostępnych ofert danego przedmiotu.
6. Wybierać najniższą znalezioną cenę.
7. Przekazywać wynik do interfejsu użytkownika.

W przypadku wielu ofert tego samego przedmiotu należy zawsze wskazywać najniższą prawidłową cenę.

Nie wolno traktować braku danych jako ceny zerowej.

Jeśli skanowanie nie obejmuje całego rynku, aplikacja musi jasno informować, że wynik dotyczy wyłącznie dostępnych danych.

## 5. Wyświetlanie informacji w opisie przedmiotu

Najważniejszym elementem dodatku jest integracja z interfejsem gry.

Po rozpoznaniu przedmiotu aplikacja powinna dodać do jego opisu dodatkową sekcję informacyjną.

Przykładowy wygląd:

--------------------------------
INFORMACJE O RYNKU

Najniższa cena: 125 000 Yang
Liczba ofert: 17
Ostatnia aktualizacja: 10:42:15

--------------------------------

Jeśli nie znaleziono ofert:

INFORMACJE O RYNKU

Brak dostępnych ofert.

Jeśli dane są nieaktualne:

INFORMACJE O RYNKU

Najniższa cena: 125 000 Yang
Dane mogą być nieaktualne.

Wygląd sekcji powinien pasować do stylistyki interfejsu M2Clicker.

## 6. Aktualizacja danych

Skaner powinien umożliwiać:
- Ręczne odświeżenie danych.
- Automatyczne odświeżanie danych rynkowych w określonych odstępach czasu, o ile jest to zgodne z zasadami gry i dozwolonym sposobem odczytu danych.
- Zapamiętywanie ostatnich wyników w pamięci lokalnej.
- Informowanie o wieku danych.

Automatyczne odświeżanie oznacza wyłącznie ponowny odczyt i analizę danych. Nie może powodować żadnych działań w grze.

Należy unikać nadmiernej liczby zapytań.

## 7. Architektura projektu

Projekt powinien być podzielony na niezależne moduły:

- **MarketScanner** – odczytywanie dostępnych ofert.
- **ItemMatcher** – identyfikacja i dopasowywanie przedmiotów.
- **PriceAnalyzer** – analiza cen i wyszukiwanie minimum.
- **MarketCache** – przechowywanie ostatnich wyników.
- **DescriptionInjector** – wyświetlanie informacji w opisach przedmiotów.
- **Settings** – konfiguracja działania dodatku.

Każdy moduł powinien odpowiadać za jedną konkretną funkcję.

## 8. Bezpieczeństwo i stabilność

- Nie modyfikuj mechaniki gry.
- Nie ingeruj w system transakcji.
- Nie wykonuj operacji zapisu w systemach gry.
- Nie wysyłaj nieautoryzowanych żądań.
- Korzystaj wyłącznie z dostępnych i dozwolonych metod odczytu informacji.
- Nie zakładaj z góry struktury danych gry – najpierw przeanalizuj dostępne źródła danych.
- Obsługuj błędy i brak danych.
- Nie blokuj działania oryginalnego interfejsu gry.

## 9. Jakość kodu

Podczas pracy nad projektem:
- Pisz czytelny, modularny kod.
- Unikaj niepotrzebnego komplikowania architektury.
- Nie duplikuj funkcjonalności.
- Oddziel logikę analizy rynku od interfejsu użytkownika.
- Dbaj o wydajność.
- Komentuj istotne fragmenty kodu.
- Nie zmieniaj istniejących funkcjonalności bez uzasadnienia.
- Przed modyfikacją istniejących plików analizuj ich aktualną zawartość.

## 10. Zasady pracy Claude

Przed rozpoczęciem implementacji:
1. Przeanalizuj strukturę projektu.
2. Ustal, w jaki sposób M2Clicker udostępnia informacje o rynku i przedmiotach.
3. Zidentyfikuj sposób odczytu ofert bez ingerencji w mechanikę gry.
4. Sprawdź, w jaki sposób można rozszerzyć opisy przedmiotów.
5. Zaproponuj architekturę dopasowaną do istniejącego projektu.

Nie twórz fikcyjnych endpointów ani nie zakładaj istnienia API, którego nie potwierdzono.

Jeśli jakiś element jest niemożliwy do zrealizowania na podstawie dostępnych danych, poinformuj o tym i zaproponuj bezpieczne rozwiązanie.

## 11. Priorytet projektu

Priorytety podczas developmentu:

1. Poprawne odczytywanie ofert rynkowych.
2. Prawidłowe rozpoznawanie przedmiotów.
3. Dokładne wyszukiwanie najniższej ceny.
4. Wyświetlanie ceny bezpośrednio w opisie przedmiotu.
5. Stabilność i wydajność.
6. Estetyka interfejsu.

**Główna zasada: M2Clicker Market Scanner ma być narzędziem informacyjnym, które pomaga graczowi podejmować decyzje handlowe, ale nigdy nie podejmuje ani nie wykonuje tych decyzji za niego.**
