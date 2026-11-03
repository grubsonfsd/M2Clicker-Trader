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
