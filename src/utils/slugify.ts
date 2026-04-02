export const slugify = (name: string) => {
  return name
    .normalize("NFD") // split accented characters into base + diacritics
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics (accents)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // replace multiple hyphens with a single hyphen
};
