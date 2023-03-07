export default function useMask(mask, value, type = "number") {
  if (!mask || !value) {
    throw Error("No mask or value was provided!");
  }

  let expression = type === "number" ? /\D/g : /\W/g;

  value = value.replace(expression, "").trim();

  if (!value) {
    return value;
  }

  let last_replacement = 0;

  value.split("").forEach((letter) => {
    last_replacement = mask.search("#");
    mask = mask.replace("#", letter);
  });

  return mask.slice(0, mask.search("#") > 0 ? ++last_replacement : mask.length);
}
