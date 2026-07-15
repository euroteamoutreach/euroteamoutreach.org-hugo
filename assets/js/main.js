import Alpine from "alpinejs";

// Bundled into the site via Hugo's js.Build (esbuild resolves this import from
// node_modules) — self-hosted, fingerprinted, and SRI-verified, rather than
// pulled from a CDN. Exposing window.Alpine is Alpine's documented ESM setup.
window.Alpine = Alpine;
Alpine.start();
