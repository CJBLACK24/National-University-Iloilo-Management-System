import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to sign-in page by default
  // Once authenticated, users can be redirected to their appropriate dashboard
  redirect("/sign-in");
}
