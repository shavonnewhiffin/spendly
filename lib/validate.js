import { CATEGORIES } from "./categories";

export function validateExpense({ title, amount, category, date }) {
  if (typeof title !== "string" || title.trim() === "") {
    return "Please add a title for the expense";
  }
  if (typeof amount !== "number" || !(amount > 0)) {
    return "Amount must be a value greater than 0";
  }
  if (!CATEGORIES.includes(category)) {
    return "Please pick a category";
  }
  if (!date) {
    return "Please pick a date";
  }
  return null;
}
