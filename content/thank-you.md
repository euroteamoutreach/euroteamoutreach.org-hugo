---
title: "Thank you!"
description: "Confirmation that your message to Euro Team Outreach was sent."

# The Connect form's no-JS fallback: the form's action posts here, so a
# visitor without JavaScript lands on this page after Netlify accepts the
# submission. With JavaScript, /contact/ shows the same message inline and
# this page is never seen — but its title and body ARE the inline
# confirmation (contact-form.html reads them), so the two can't drift. The
# legacy /contact/thanks/ 301s here (netlify.toml).
#
# Not a destination anyone should reach from search: out of the sitemap, and
# `noindex` keeps it out of the index in production too (seo.html).
noindex: true
sitemap:
  disable: true
---

Your message has been sent — we'll be in touch.
