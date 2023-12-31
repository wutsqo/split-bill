import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { appName } from "./config";
import { Toaster } from "react-hot-toast";
import { mergeClassname } from "@/utils/merge-classname";
import Drawer from "./drawer";
import { TrakteerProvider } from "./trakteer/provider";
import TrakteerModal from "./trakteer/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appName,
  description: "Split your bills hassle-free",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <title>SplitEasy | The Easiest Expense Sharing App</title>
      <meta
        name="description"
        content="Track your shared expenses and simplify debt calculations with friends and roommates hassle-free with SplitEasy."
      />

      <meta property="og:url" content="https://split-easy.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="SplitEasy | The Easiest Expense Sharing App"
      />
      <meta
        property="og:description"
        content="Track your shared expenses and simplify debt calculations with friends and roommates hassle-free with SplitEasy."
      />
      <meta
        property="og:image"
        content="https://opengraph.b-cdn.net/production/documents/29558b54-2223-486c-bb89-dd68df5e3049.png?token=OdifxerHQv6cIiabvnqNhnMNB-CEjzBZ2mN5v6XkwMo&height=675&width=1200&expires=33240020299"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="split-easy.vercel.app" />
      <meta
        property="twitter:url"
        content="https://split-easy.vercel.app/"
      />
      <meta
        name="twitter:title"
        content="SplitEasy | The Easiest Expense Sharing App"
      />
      <meta
        name="twitter:description"
        content="Track your shared expenses and simplify debt calculations with friends and roommates hassle-free with SplitEasy."
      />
      <meta
        name="twitter:image"
        content="https://opengraph.b-cdn.net/production/documents/29558b54-2223-486c-bb89-dd68df5e3049.png?token=OdifxerHQv6cIiabvnqNhnMNB-CEjzBZ2mN5v6XkwMo&height=675&width=1200&expires=33240020299"
      />

      <body className={mergeClassname(inter.className, "bg-base-200")}>
        <TrakteerProvider>
          <Drawer>{children}</Drawer>
          <TrakteerModal />
        </TrakteerProvider>
        <Toaster />
      </body>
    </html>
  );
}
