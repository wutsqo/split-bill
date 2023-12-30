import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { appName } from "./config";
import { Toaster } from "react-hot-toast";
import { mergeClassname } from "@/utils/merge-classname";
import Drawer from "./drawer";

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
      <body className={mergeClassname(inter.className, "bg-base-200")}>
        <Drawer>{children}</Drawer>
        <Toaster />
      </body>
    </html>
  );
}
