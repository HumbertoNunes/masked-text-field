export default function useMask(mask, value, type = "text") {
  value = (
    type === "number" ? value.replace(/\D/g, "") : value.replace(/\W/g, "")
  ).trim();

  if (!value) {
    return value;
  }

  value.split("").forEach((letter) => (mask = mask.replace("#", letter)));

  return mask
    .slice(0, mask.search("#") > 0 ? mask.search("#") : mask.length)
    .trim()
    .replace(/\W$/, "");
}
