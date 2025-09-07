import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export default baseUrl;
