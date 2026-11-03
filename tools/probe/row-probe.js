// Probe wiersza oferty (tylko odczyt). Uruchom przy otwartym widoku rynku.
(() => {
  const li = [...document.querySelectorAll('ul li')].find((l) => /yang/i.test(l.textContent));
  const html = li ? li.outerHTML.replace(/src="data:[^"]*"/g, 'src="data:..."') : 'nie znaleziono';
  console.log(html);
  try { copy(html); } catch (e) {}
})();
