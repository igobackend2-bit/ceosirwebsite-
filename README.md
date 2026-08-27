
## Running it locally

This is a static site with a PHP form handler, so it needs a PHP-capable server rather than a plain static file server:

```bash
cd ceoprofile/ceo
php -S localhost:8000
```

Then open `http://localhost:8000`.

## Deployment

Ships as a Docker image (`Dockerfile`) built on `nginx:alpine`: it copies `ceoprofile/ceo/` straight into `/usr/share/nginx/html` and serves it with the bundled `nginx.conf`, which does a plain SPA-style `try_files $uri $uri/ /index.html` fallback and listens on port 80.

```bash

docker build -t ceo-profile-site .
docker run -p 8080:80 ceo-profile-site
```

**Note:** nginx alone cannot execute the PHP contact form (`quform/contact.php`) — this Docker setup serves static assets only. To make the contact form work, this needs to run behind (or alongside) a PHP-FPM process, or the target host needs to be a standard PHP hosting environment.

## Contact form (Quform)

`ceoprofile/ceo/quform/` is the Quform PHP form-handling library bundled with the original template. Before the contact form will actually deliver mail, `quform/contact.php` needs real settings — as shipped, `$config['recipients']` is still the placeholder `'addyour@emailhere'`. Relevant settings in that file:

- `$config['recipients']` — who receives submissions (**must be changed from the placeholder**)
- `$config['from']` — the sender address used for outgoing notification emails
- `$config['email']` — whether to send a notification email at all
- `QUFORM_DEBUG` — currently `true`; should be set to `false` before going live

## Theme documentation

`ceoprofile/documentation/` is the original Webrik template's own docs (`index.html`, changelog, form-documentation for Quform). It's a reference for the underlying template's features and isn't required for the live site — safe to leave out of a production deploy if repo size matters.

## Notes

- Several pages (`services.html`, `404-page.html`) still carry the original template's `<title>` rather than the site's actual branding.
- `techfarming-innovation.html` has no `<title>` tag at all.
- No `package.json`, bundler, or build step — CSS/JS are edited and served as-is.
