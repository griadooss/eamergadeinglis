/* Client-side search over all photos (static archive).
   Filters window.PHOTO_INDEX by any text found in a photo's description,
   notes, or linked-person names. Replaces the browse table with the matches;
   an empty box restores the normal paginated page. No server required. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    if (!window.PHOTO_INDEX) return;
    var input = document.querySelector('input[name="mediasearch"]');
    var table = document.querySelector('table.tablesaw');
    if (!input || !table || !table.tBodies.length) return;

    var tbody = table.tBodies[0];
    var origRows = tbody.innerHTML;                 // this page's rows, cached

    var matchP = null, ps = document.querySelectorAll('p.normal');
    for (var i = 0; i < ps.length; i++)
      if (/Matches\s+\d+\s+to/.test(ps[i].textContent)) { matchP = ps[i]; break; }
    var origMatch = matchP ? matchP.innerHTML : '';

    var pagers = [];
    document.querySelectorAll('span.normal').forEach(function (s) {
      if (s.querySelector('.snlinkact')) pagers.push(s);
    });

    input.setAttribute('placeholder', 'Search all ' + PHOTO_INDEX.length + ' photos…');
    input.setAttribute('autocomplete', 'off');

    function restore() {
      tbody.innerHTML = origRows;
      if (matchP) matchP.innerHTML = origMatch;
      pagers.forEach(function (s) { s.style.display = ''; });
    }

    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    function run(q) {
      q = q.trim().toLowerCase();
      if (!q) { restore(); return; }
      var terms = q.split(/\s+/);
      var hits = PHOTO_INDEX.filter(function (e) {
        return terms.every(function (t) { return e.s.indexOf(t) >= 0; });
      });
      tbody.innerHTML = hits.length
        ? hits.map(function (e) { return e.r; }).join('')
        : '<tr><td colspan="4" class="databack">No photos match “' + esc(q) + '”.</td></tr>';
      var rows = tbody.querySelectorAll('tr.media-row');
      for (var i = 0; i < rows.length; i++) if (rows[i].cells[0]) rows[i].cells[0].textContent = i + 1;
      if (matchP) matchP.textContent =
        hits.length + ' photo' + (hits.length === 1 ? '' : 's') + ' matching “' + q + '”';
      pagers.forEach(function (s) { s.style.display = 'none'; });
    }

    input.addEventListener('input', function () { run(input.value); });
    var form = input.form;
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); run(input.value); });

    // Allow a pre-filled search via ?q=... (bookmarkable, and testable)
    var q = new URLSearchParams(location.search).get('q');
    if (q) { input.value = q; run(q); }
  });
})();
