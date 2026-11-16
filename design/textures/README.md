# Paper texture sources

Original paper photos used to make the background grain. They are not served by the website.

The site uses processed tiles in `app/textures/` (`kraft-grain.webp` for light, `espresso-grain.webp` for dark):
each original was made seamless, converted to a neutral grey detail layer (mean 50% grey) and compressed.
The CSS blends that tile over the theme colour with `background-blend-mode: soft-light`, so the colour always
comes from the tokens in `app/tailwind.input.css` and the grain just adds paper texture.

To use a different paper, replace the tile in `app/textures/` with any seamless, mid-grey, low-contrast image.
