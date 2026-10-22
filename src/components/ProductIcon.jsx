import { asset } from "../lib/asset.js";
// App icon for a product, from the brand kit in /public/brand.
// eager: for icons near the top of the page, so they are not held back by lazy loading.
export default function ProductIcon({ id, size = 64, shadow = false, alt = "", eager = false }) {
  return (
    <img
      className={`product-icon${shadow ? " has-shadow" : ""}`}
      src={asset(`/brand/${id}/${id}-icon.svg`)}
      width={size}
      height={size}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
