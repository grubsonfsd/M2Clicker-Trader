# Probe – pasywna diagnostyka (tylko odczyt)

Skrypt `probe.js` NIC nie klika, nie wysyła żądań i nie zmienia gry. Tylko czyta:
- listę adresów żądań fetch/XHR, które strona już wykonała (Performance API),
- nazwy (nie wartości!) kluczy localStorage/sessionStorage,
- adresy skryptów i wykryty framework,
- kilka próbek elementów zawierających tekst "Yang" (ścieżka + fragment HTML).

## Jak użyć
1. Zaloguj się do gry sam i otwórz widok rynku (listę ofert).
2. F12 -> zakładka Console.
3. Wklej zawartość `probe.js` i naciśnij Enter.
4. Wynik JSON zostanie wypisany i (jeśli się da) skopiowany do schowka.
5. PRZEJRZYJ wynik przed wysłaniem. Usuń nazwy graczy lub inne dane, których nie chcesz ujawniać.
   Skrypt nie odczytuje haseł, ciasteczek ani wartości tokenów.

## Dodatkowo (ręcznie)
- F12 -> Network -> filtr `Fetch/XHR` i `WS`, odśwież rynek, zrób zrzut listy żądań.
  Nie wysyłaj nagłówków `Authorization`/`Cookie`.

## requests-probe.js (adresy żądań rynku)
Pasywny: tylko Performance API, bez owijania fetch/XHR, bez nagłówków i treści odpowiedzi.
1. Otwórz widok rynku, wklej skrypt do konsoli, Enter.
2. Przez 90 s ustaw filtr typu, filtr bonusu i przewiń listę ofert w dół.
3. Wynik (ścieżki z parametrami, UUID jako `<uuid>`, typ `fetch`/`xmlhttprequest`) pojawi się w konsoli i w schowku.
