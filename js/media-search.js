/* Generic client-side search over a media browse listing (static archive).
   Each browse page loads its own <type>-index.js which sets window.MEDIA_INDEX
   to an array of {s: searchable-text, r: row-html}. This filters by any text in
   a media item's description, notes, or linked-person names, replaces the table
   with the matches, and restores the normal (paginated) page when cleared.
   The item noun is read from the page's <h1>. No server required. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    if (!window.MEDIA_INDEX) return;
    var input = document.querySelector('input[name="mediasearch"], input[name="notesearch"]');
    var thead = document.querySelector('thead');
    var table = thead ? thead.closest('table') : null;
    if (!input || !table || !table.tBodies.length) return;

    var h1 = document.querySelector('h1.header');
    var noun = (h1 ? h1.textContent.trim().toLowerCase() : 'items') || 'items';
    var ncols = (table.tHead && table.tHead.rows[0]) ? table.tHead.rows[0].cells.length : 4;

    var tbody = table.tBodies[0];
    var origRows = tbody.innerHTML;

    var matchP = null, ps = document.querySelectorAll('p.normal');
    for (var i = 0; i < ps.length; i++)
      if (/Matches\s+\d+\s+to/.test(ps[i].textContent)) { matchP = ps[i]; break; }
    var origMatch = matchP ? matchP.innerHTML : '';

    var pagers = [];
    document.querySelectorAll('span.normal').forEach(function (s) {
      if (s.querySelector('.snlinkact')) pagers.push(s);
    });

    input.setAttribute('placeholder', 'Search all ' + MEDIA_INDEX.length + ' ' + noun + '…');
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
      var hits = MEDIA_INDEX.filter(function (e) {
        return terms.every(function (t) { return e.s.indexOf(t) >= 0; });
      });
      tbody.innerHTML = hits.length
        ? hits.map(function (e) { return e.r; }).join('')
        : '<tr><td colspan="' + ncols + '" class="databack">No ' + noun + ' match “' + esc(q) + '”.</td></tr>';
      if (hits.length) {
        var rows = tbody.rows;
        for (var i = 0; i < rows.length; i++) if (rows[i].cells[0]) rows[i].cells[0].textContent = i + 1;
      }
      if (matchP) matchP.textContent =
        hits.length + (hits.length === 1 ? ' match' : ' matches') + ' for “' + q + '”';
      pagers.forEach(function (s) { s.style.display = 'none'; });
    }

    input.addEventListener('input', function () { run(input.value); });
    var form = input.form;
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); run(input.value); });

    var pre = new URLSearchParams(location.search).get('q');
    if (pre) { input.value = pre; run(pre); }
  });
})();
