export const Category = {
  None: "none",
  Work: "work",
} as const;

export type Category = (typeof Category)[keyof typeof Category];
export const Categories = Object.values(Category);
