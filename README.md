# Tincture

A watercolor color-mixing puzzle. Pour red, yellow, blue, black and white into the bowl to match
the color on the easel. Everything (artwork, font, sounds) is built into `index.html`;
`manifest.webmanifest`, `sw.js` and `icons/` make it installable and playable offline.

Version 1.0.0.

## Publish on GitHub Pages

1. Create a new public repository named `tincture`.
2. Upload the contents of this folder (not the folder itself): `index.html`, `sw.js`,
   `manifest.webmanifest`, `README.md` and the `icons` folder.
3. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`, Save.
4. The game is live at `https://<your-username>.github.io/tincture/` a minute or two later.
   Open it on your phone and use "Add to Home screen" / "Install app".

## Releasing an update

Upload the new `index.html` only. The game compares its own version with the published one
when it opens (and when you come back to it after an hour), and offers an Update button.
You can also tap the version number next to the title, or use Check for updates in the ⚙ menu.

The handwriting font is Caveat by Impallari Type, used under the SIL Open Font License 1.1.
