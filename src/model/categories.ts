export interface Category {
  name: string;
  description?: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  name: string;
}

export const categoryData: Category[] = [
  {
    name: "Idea",
    description: "For an idea to be viable it must first work in theory.",
    subCategories: [{ name: "Problem" }, { name: "Solution" }],
  },
  {
    name: "Demand",
    subCategories: [
      { name: "Market" },
      { name: "Market Size" },
      { name: "Trend" },
    ],
  },
  {
    name: "Competition",
    subCategories: [{ name: "Similar products" }, { name: "Tried" }],
  },
];
