---
title: "Connect"
layout: contact
description: "Get in touch with Euro Team Outreach — send us a message and we'll do our best to reply quickly."

# Page copy, rendered by layouts/contact.html (the hero is the body). Source
# draft: planning/copy/connect.md. Tweaks happen in situ (#56).

# The inline confirmation the form swaps in after an AJAX submit. The no-JS
# fallback is the /thank-you/ page, which says the same thing.
success:
  heading: "Thank you!"
  text: "Your message has been sent — we'll be in touch."
error: "Something went wrong and your message wasn't sent. Please try again in a moment."

other:
  heading: "Other ways to reach us"
  # /team/ is a literal URL, not a pageRef: it is unrendered on the pre-UGO
  # track (hugo.toml cascade) and falls through to legacy.
  team:
    heading: "Reach a specific missionary family"
    text: "To write to one of our families directly, find them on our"
    href: "/team/"
    link: "Team page"
  mail:
    heading: "By mail"
    address:
      - "Euro Team Outreach, Inc."
      - "16723 Britford"
      - "Houston, TX 77084"
---

Need to get in touch? Send us a message and we'll do our best to reply quickly.
