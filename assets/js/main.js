import Alpine from "alpinejs";

// Inline submit for a Netlify form (first user: contact-form.html; the /serve/
// gateway form will share it). Posts the form's own fields to Netlify as
// urlencoded data — the same payload as the no-JS POST — then swaps in the
// confirmation, which the form marks with x-ref="success". Netlify accepts an AJAX
// submission at "/" and routes it by the form-name field. HTML5 validation
// still runs first: @submit.prevent only fires once the browser's required and
// type="email" checks pass.
Alpine.data("netlifyForm", () => ({
  status: "idle", // idle → sending → sent | error

  async submit(event) {
    this.status = "sending";
    try {
      // A URLSearchParams body makes fetch send it urlencoded, header included.
      const response = await fetch("/", {
        method: "POST",
        body: new URLSearchParams(new FormData(event.target)),
      });
      this.status = response.ok ? "sent" : "error";
    } catch {
      this.status = "error"; // network failure
    }
    // On error the entries stay in the fields, so the visitor can just press
    // Send again.
    if (this.status === "sent")
      this.$nextTick(() => this.$refs.success.focus());
  },
}));

// Bundled into the site via Hugo's js.Build (esbuild resolves this import from
// node_modules) — self-hosted, fingerprinted, and SRI-verified, rather than
// pulled from a CDN. Exposing window.Alpine is Alpine's documented ESM setup.
window.Alpine = Alpine;
Alpine.start();
