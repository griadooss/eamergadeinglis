/* Client-side surname / given-name browser for the static archive.
   The page sets window.NAME_DATA (array of [name, count], sorted by count desc)
   and window.NAME_KIND ('surname' | 'given'). Renders an A–Z filter, a
   "top N by frequency" view, and a "show all A–Z" view. Each name links to the
   people search (search.html?surname=… or ?given=…). Counts reflect the public
   (searchable) individuals, so they match what the search returns. No server. */
(function () {
  function ready(fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var host = document.getElementById('name-browser');
    if (!host || !window.NAME_DATA) return;
    var kind = window.NAME_KIND === 'given' ? 'given' : 'surname';
    var param = kind;
    var byCount = NAME_DATA.slice();
    var byAlpha = NAME_DATA.slice().sort(function (a, b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0; });
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var state = { view: 'top', letter: null, topN: 50 };

    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    function item(name, count) {
      var nosur = name === '[no surname]';
      var href = nosur ? 'search.html' : 'search.html?' + param + '=' + encodeURIComponent(name);
      return '<div class="nb-item"><a href="' + href + '">' + esc(name) +
             '</a> <span class="nb-c">(' + count + ')</span></div>';
    }
    function render() {
      var items, head;
      if (state.view === 'top') {
        items = byCount.slice(0, state.topN);
        head = 'Top ' + items.length + ' by frequency';
      } else {
        items = byAlpha;
        if (state.letter) items = items.filter(function (e) { return (e[0][0] || '').toUpperCase() === state.letter; });
        head = state.letter ? items.length + ' starting with “' + state.letter + '”'
                            : 'All ' + items.length + ' (A–Z)';
      }
      var alpha = '<a data-l="all" class="' + (state.view === 'alpha' && !state.letter ? 'active' : '') + '">All</a>';
      letters.forEach(function (L) {
        alpha += '<a data-l="' + L + '" class="' + (state.letter === L ? 'active' : '') + '">' + L + '</a>';
      });
      host.querySelector('.nb-alpha').innerHTML = alpha;
      host.querySelector('.nb-count').textContent = head;
      host.querySelector('.nb-list').innerHTML = items.map(function (e) { return item(e[0], e[1]); }).join('');
      var ti = host.querySelector('.nb-topn'); if (ti) ti.value = state.topN;
    }

    host.innerHTML =
      '<div class="nb-alpha"></div>' +
      '<div class="nb-controls">Show top <input type="number" class="nb-topn" min="1" value="50"/> by frequency ' +
      '<button class="nb-topbtn">Go</button> &nbsp;&middot;&nbsp; <a href="#" class="nb-all">Show all A–Z</a></div>' +
      '<div class="nb-count"></div><div class="nb-list"></div>';

    host.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-l]') : null;
      if (a) { e.preventDefault(); var L = a.getAttribute('data-l'); state.view = 'alpha'; state.letter = (L === 'all' ? null : L); render(); return; }
      if (e.target.classList.contains('nb-all')) { e.preventDefault(); state.view = 'alpha'; state.letter = null; render(); return; }
      if (e.target.classList.contains('nb-topbtn')) { e.preventDefault(); var n = parseInt(host.querySelector('.nb-topn').value, 10); if (n > 0) { state.view = 'top'; state.letter = null; state.topN = n; render(); } return; }
    });
    render();
  });
})();
