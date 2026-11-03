// Probe adresów żądań rynku (tylko odczyt). Niczego nie wysyła, nie owija fetch/XHR, nie czyta nagłówków,
// ciasteczek ani treści odpowiedzi. Korzysta z Performance API (PerformanceObserver), które tylko raportuje
// adresy żądań już wykonanych przez przeglądarkę.
//
// Użycie: otwórz widok rynku, wklej skrypt do konsoli, Enter. Przez 90 sekund zrób w grze:
//   1) ustaw filtr typu przedmiotu,  2) ustaw filtr bonusu,  3) przewiń listę ofert w dół (kolejna strona).
// Po 90 s wynik pojawi się w konsoli (i w schowku). Identyfikatory (UUID) są zamieniane na <uuid>.
(() => {
  const DURATION_MS = 90000;
  const seen = new Map();
  const mask = (s) => s.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '<uuid>');
  const obs = new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      let u;
      try { u = new URL(e.name); } catch (_) { continue; }
      if (!/\/market\//.test(u.pathname)) continue;
      const key = e.initiatorType + ' ' + mask(u.pathname + u.search);
      seen.set(key, (seen.get(key) || 0) + 1);
    }
  });
  obs.observe({ type: 'resource', buffered: true });
  console.log('Probe działa przez ' + DURATION_MS / 1000 + ' s. Ustaw filtry i przewiń listę ofert.');
  setTimeout(() => {
    obs.disconnect();
    const out = [...seen.entries()].map(([k, n]) => k + '  (x' + n + ')').join('\n');
    console.log(out || 'Nie zarejestrowano żądań /market/.');
    try { copy(out); } catch (_) {}
  }, DURATION_MS);
})();
