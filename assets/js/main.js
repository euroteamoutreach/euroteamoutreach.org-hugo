import Alpine from "alpinejs";

// The Connect form's inline submit (layouts/partials/contact-form.html). Posts
// the form's own fields to Netlify as urlencoded data — the same payload as the
// no-JS POST — then swaps in the confirmation. Netlify accepts an AJAX
// submission at "/" and routes it by the form-name field. HTML5 validation
// still runs first: @submit.prevent only fires once the browser's required and
// type="email" checks pass.
Alpine.data("contactForm", () => ({
  status: "idle", // idle → sending → sent | error

  async submit(event) {
    this.status = "sending";
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(event.target)).toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.status = "sent";
      this.$nextTick(() => this.$refs.success.focus());
    } catch {
      // Entries stay in the fields, so the visitor can just press Send again.
      this.status = "error";
    }
  },
}));

// Bundled into the site via Hugo's js.Build (esbuild resolves this import from
// node_modules) — self-hosted, fingerprinted, and SRI-verified, rather than
// pulled from a CDN. Exposing window.Alpine is Alpine's documented ESM setup.
window.Alpine = Alpine;
Alpine.start();
