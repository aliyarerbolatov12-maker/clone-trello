export const Category = {
  All: "All",
  None: "None",
  Work: "Work",
  Home: "Home",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export const Categories = Object.values(Category) as Category[];
