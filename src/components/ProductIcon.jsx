import { asset } from "../lib/asset.js";
// App icon for a product, from the brand kit in /public/brand.
export default function ProductIcon({ id, size = 64, shadow = false, alt = "" }) {
  return (
    <img
      className={`product-icon${shadow ? " has-shadow" : ""}`}
      src={asset(`/brand/${id}/${id}-icon.svg`)}
      width={size}
      height={size}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
