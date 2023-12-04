import Link from "next/link";
import { appName } from "./config";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/app");

  return (
    <main className="container mx-auto px-4 py-16">
      <h1>{appName}</h1>
      <p>Split your bills hassle-free</p>
      <Link href="/app" className="btn mt-8">
        Try Now
      </Link>
    </main>
  );
}
