# eamergadeinglis.net — Static Archive

This repository is the **permanent static archive** of the Eamer / Gade / Inglis
family-history website, **eamergadeinglis.net**. It exists to keep that family
history freely and permanently available at effectively no cost, and to outlive
its custodian. Custodian: John (GitHub: griadooss).

## What this is (and is not)

- **This IS**: a self-contained, fully static snapshot — plain HTML, images,
  documents and a client-side search. It has **no database, no PHP runtime, no
  server-side code, and no external calls** (0 third-party network loads). It can
  be hosted by anything that serves files, or opened straight from disk.
- **This is NOT**: the original site. The live site was a dynamic
  **TNG (The Next Generation of Genealogy Sitebuilding) v13.0.3** application
  (PHP + MySQL) on paid Hostinger hosting. This archive was *derived* from it by
  crawling every public page as a guest and cleaning the result. Research has
  ceased; the site is frozen, so a one-time capture is sufficient.

## The master / derivative relationship — important

This repo is a **derivative**. The **master ingredients** (the things you would
rebuild from, never stored here) are kept **privately by the custodian, outside
this repo** — they are *not* published. The master holds the full FileZilla pull
of the live docroot, the live MySQL database dump, and the GEDCOM export
(1,822 individuals / 509 families), with its own README.md documenting the
full capture log.

There is also a **raw crawl** — the unprocessed page grab that was the *input*
to the cleanup. It, too, is kept privately by the custodian and is intentionally
**not part of this repo**. Do not add it here.

## Repository layout

    index.html            home page
    search.html           client-side search UI
    search-index.js       prebuilt search index (public people only)
    person_I*.html        ~individual person pages
    family_F*.html        family group pages
    browse*.html          index / browse pages
    cemeteries/ cemeteries.html   static gazetteer (rebuilt, not dynamic)
    css/  js/  templates/  site assets (jQuery is self-hosted)
    media/ photos/ headstones/ documents/ histories/ img/   media (~118 MB)

Tallies: ~2,956 HTML pages, ~1,400 images, a few PDFs, 1 mp3 + 1 mp4.
Largest single file is a 23 MB mp3 — under GitHub's 100 MB/file limit.

## Privacy

The archive was crawled **as a guest**. The client-side **search index** covers
only the 1,053 public people (the 769 living are excluded from search), and the
769 living person pages are `Disallow`-ed in `robots.txt`.

**Important nuance (do not misread the above):** living people are excluded from
*search*, but their individual `person_I*.html` pages **do exist** and mirror the
live TNG data — because the live site was configured *Show Living Data: Always*,
the guest crawl captured them. So "living people are excluded" applies to the
search index, NOT to the site as a whole.

Because of that, the guest crawl also captured a handful of **living people's
present-day contact details** (home address / phone / email). Those were scrubbed
on 7 Jul 2026 to match the GEDCOM deposit policy: present-day contact channels
(phone/email) and living people's current home addresses were removed
from `person_I338`, `person_I340`, `person_I1195`, and the phone from `person_I333`
(Betty Braybrook — her residence was kept as heritage, by the custodian's choice).
**Deceased ancestors' historical addresses (residences, wills, census) are kept
as genuine family history.** Do not re-introduce living-person contact detail
from the master.

## Rules for anyone (human or AI) working in here

1. **Never commit the raw crawl** (`../eamergadeinglis.net/`) or any master
   material. This repo holds only the cleaned, publishable output.
2. **No dynamic code.** Do not add PHP, server config, build steps, or anything
   that makes a network request. Everything must work as flat files.
3. **Edits are simple**: change the file, `git commit`, `git push` — Cloudflare
   auto-deploys from `main`, so push == deploy. Keep changes small and focused.
4. **Run git from this directory** (`clean/`) — it is its own repo. The
   parent `eamergadeinglis-static/` is a working area, not part of this repo.

## Publishing state

- Remote: `git@github.com:griadooss/eamergadeinglis.git` (auth via SSH).
  The `gh` CLI is installed and authenticated as griadooss.
- **Host: Cloudflare Pages** — project "eamergadeinglis", wired to this GitHub
  repo through Cloudflare's Git integration: framework preset None, no build
  command, output directory root, production branch `main`. Pushing to `main`
  auto-deploys. A rebuild takes roughly one to four minutes, because Cloudflare
  re-clones the whole 187 MB repo every time.
- **GitHub Pages is DISABLED, and should stay so.** At this size (4,400 files,
  187 MB) its deploy step failed intermittently at the `syncing_files` stage:
  the build job always went green and only the CDN copy died, so recovery meant
  disabling Pages, waiting a good ten minutes, then re-enabling. That proven
  fragility is why serving moved to Cloudflare on 6 Jul 2026.
- **Custom domain: LIVE.** Both `eamergadeinglis.net` and `www` are attached to
  the Pages project with automatic HTTPS, the apex being a proxied CNAME to the
  project's own pages.dev address. Cloudflare needs **no `CNAME` file** in the
  repo — do not add one. DNS and the registration both sit at Cloudflare now
  (registrar transfer 19 Sep 2026; the domain expires 2028-03-08).
- Testing the live site with curl: Cloudflare 308-redirects `.html` URLs to
  their extensionless form, so pass `curl -L` or you get an empty body and
  conclude the page is broken when it is fine.
- Local preview needs no server: Apache already serves this directory as
  localhost/eamergadeinglis/ through a symlink in `~/www`.
- Mail for the domain: there is no custom rule for contact@eamergadeinglis.net —
  it arrives through the Email Routing catch-all, which forwards to
  john.eamer@zimpics.com. That mailbox is on **Migadu**, not Hostinger
  (zimpics.com MX verified 28 Sep 2026), so it is unaffected by cancelling the
  Hostinger plan. Its real dependency is the Migadu subscription and the
  zimpics.com renewal — both of which need a living custodian, which is why the
  About page leads with the NLA copy and not with this address.
- Cancelling the Hostinger Premium plan (renews 2027-03-08) is clear to proceed:
  nothing this archive depends on is hosted there any longer.
- The old "deposit the GEDCOM with WikiTree / FamilySearch" step was **dropped**.
  The custodian chose instead to keep the one existing Ancestry tree
  (named EamerGadeInglis, id 176377489) as the canonical online tree; it is
  public, and a full re-upload would have orphaned its attached photographs.
- Durability beyond this repo: the National Library of Australia harvests the
  whole site into the Australian Web Archive under legal deposit, with the
  persistent identifier nla.gov.au/nla.arc-173503. The About page points readers
  there first, since that copy outlives the domain, the host and the custodian.
