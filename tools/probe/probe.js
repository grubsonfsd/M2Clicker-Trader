// Pasywny probe (tylko odczyt) - M2Clicker Market Scanner, etap 1.
// Nie wysyla zadan, nie klika, nie modyfikuje DOM.
(() => {
  const redact = (u) => String(u).replace(/([?&][^=&]*(token|key|auth|session|sid)[^=&]*=)[^&]*/gi, '$1<redacted>');
  const path = (el) => {
    const parts = [];
    let n = el;
    for (let i = 0; n && n.nodeType === 1 && i < 6; i++, n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) s += '#' + n.id;
      if (n.classList && n.classList.length) s += '.' + [...n.classList].slice(0, 3).join('.');
      parts.unshift(s);
    }
    return parts.join(' > ');
  };

  const out = {
    url: location.origin + location.pathname,
    scripts: [...document.scripts].map((s) => s.src).filter(Boolean).map(redact),
    apiCalls: performance
      .getEntriesByType('resource')
      .filter((r) => r.initiatorType === 'fetch' || r.initiatorType === 'xmlhttprequest')
      .map((r) => redact(r.name)),
    storageKeys: { local: Object.keys(localStorage), session: Object.keys(sessionStorage) },
    framework: {
      react: !!document.querySelector('[data-reactroot]') || Object.keys(document.body.firstElementChild || {}).some((k) => k.startsWith('__react')),
      vue: !!window.__VUE__ || !!document.querySelector('[data-v-app]'),
      angular: !!window.ng || !!document.querySelector('[ng-version]'),
    },
  };

  const yang = [...document.querySelectorAll('body *')]
    .filter((el) => el.children.length === 0 && /yang/i.test(el.textContent || ''))
    .slice(0, 5);
  out.yangSamples = yang.map((el) => ({
    path: path(el),
    text: (el.textContent || '').trim().slice(0, 80),
    rowHtml: el.parentElement && el.parentElement.parentElement
      ? el.parentElement.parentElement.outerHTML.slice(0, 1500)
      : null,
  }));

  const json = JSON.stringify(out, null, 2);
  console.log(json);
  try { copy(json); console.log('Skopiowano do schowka.'); } catch (e) { /* copy() dostepne tylko w DevTools */ }
})();
