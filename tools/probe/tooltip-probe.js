// Probe tooltipa (tylko odczyt). Uruchom, w ciagu 8 s najedz myszka na przedmiot, poczekaj na wynik.
(() => {
  const found = [];
  const obs = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
    if (n.nodeType === 1 && (n.textContent || '').trim().length > 20) {
      found.push(n.outerHTML.replace(/src="data:[^"]*"/g, 'src="data:..."').slice(0, 3000));
    }
  })));
  obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => {
    obs.disconnect();
    const out = found.slice(0, 5).join('\n\n---\n\n');
    console.log(out);
    try { copy(out); } catch (e) {}
  }, 8000);
})();
