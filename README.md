# Eamer | Gade | Inglis — Family History Archive

This repository holds the complete source of **eamergadeinglis.net**, a permanent
static archive of the Eamer, Gade and Inglis family history — 1,822 individuals
and 509 families, with photographs, certificates, headstone images and written
narratives.

The research was compiled chiefly between 2007 and 2009, with a last period of
activity around 2019–2021, and it is finished. The site is frozen on purpose: it
is a record, not a work in progress. Everything here is plain HTML, images and
documents, with a client-side search. There is no database, no server-side code
and no third-party tracking beyond a single hostname-gated visitor counter.

## Where this archive lives

It is kept in four independent places, deliberately, so that no one person,
subscription or domain name can take it away:

| Copy | Address | What it needs to survive |
|---|---|---|
| National Library of Australia, Australian Web Archive | nla.gov.au/nla.arc-173503 | nothing — held under legal deposit |
| Software Heritage (non-profit, UNESCO-supported) | archive.softwareheritage.org — origin github.com/griadooss/eamergadeinglis | nothing — its charter is preservation |
| This repository | github.com/griadooss/eamergadeinglis | GitHub, or any copy anyone has cloned |
| Ancestry public member tree, "EamerGadeInglis" | tree 176377489 | Ancestry, and the tree staying public |

The National Library copy is the durable one. It is free to read, asks for no
account, and depends on neither the domain, the host, nor the custodian. Anyone
who finds this archive long after it was made should begin there.

Software Heritage is the second durable copy, and it preserves something the
others do not: the **git repository itself**, history and all, taken on
28 September 2026 (snapshot swh:1:snp:dd80cb0ec551d0b45ff51f5ef51ba2a32626257a).
The National Library holds the website as a reader sees it; Software Heritage
holds the thing you would rebuild it from. Either can be used without the other.

## Hand-over notes for a future custodian

Three things keep the live website working. If they stop, the website goes dark
— but **the archive itself is not lost**, because the National Library copy
continues regardless and this repository can be republished by anyone.

1. **The domain.** eamergadeinglis.net is registered at Cloudflare Registrar and
   expires 2028-03-08. Renewals there are sold at cost. If it lapses, the address
   stops resolving; the content is untouched.
2. **The Cloudflare account.** It holds three things for this domain: the Pages
   project that serves the site, the DNS, and Email Routing — a catch-all that
   forwards anything addressed to the domain on to the custodian's own mailbox.
3. **This GitHub repository.** Cloudflare Pages redeploys automatically whenever
   a commit is pushed to the main branch.

### To correct or add something

Edit the file, then commit and push. Cloudflare rebuilds by itself, taking
roughly one to four minutes. Keep changes small.

```
git commit -am "what changed and why"
git push origin main
```


### To republish the archive somewhere else

These are flat files. Any static host, any ordinary web server, or even a plain
directory opened from disk will serve them — nothing needs to be installed,
compiled or configured. Clone or download this repository and serve its root
directory. That is the whole procedure, and it is why the archive was built this
way.

### What is deliberately not in this repository

- Account names, passwords and recovery details for the domain, the host or the
  email routing.
- The master ingredients the archive was built from: the full copy of the
  original dynamic site, its MySQL database and the GEDCOM export.
- Present-day contact details for living people, which were removed in July 2026.
  Historical addresses belonging to deceased ancestors are kept, as genuine
  family history.

The custodian's own written instructions — kept privately with his will, and not
in this repository — record who takes over the archive and where the accounts and
the master material are held.

**Please do not add any of that to this file. This repository is public, and
everything in it can be read by anyone.**

## Licence and spirit of the thing

The family history is shared so that descendants and researchers can use it. If
you are related to these families, or you are simply someone who found this and
can keep a copy alive, you are welcome to take one. That is rather the point.
