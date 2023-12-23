import Link from "next/link";
import { appName } from "./config";

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col gap-16 lg:flex-row-reverse">
          <div className="mockup-phone hidden lg:block">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 bg-white"></div>
            </div>
          </div>
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">{appName}</h1>
            <p className="py-6">
              A free tool for friends and roommates to effortlessly track shared
              expenses and simplify debt calculations, ensuring everyone gets
              paid back accurately.
            </p>
            <Link href="/app">
              <button className="btn btn-primary">TRY NOW</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
