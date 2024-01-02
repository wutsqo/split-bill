import { appName } from "@/app/config";
import { NextRequest } from "next/server";
import puppeteer, { PuppeteerLaunchOptions } from "puppeteer-core";
import chrome from "@sparticuz/chromium";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : "/usr/bin/google-chrome";

async function getOptions(isDev: boolean): Promise<PuppeteerLaunchOptions> {
  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath(),
      headless: chrome.headless,
    };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const id = searchParams.get("id");
    if (!id) throw new Error("ID not found");
    const isDev = process.env.NODE_ENV === "development";
    const options = await getOptions(isDev);
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await page.goto(`${request.nextUrl.origin}/report/${id}`);
    const file = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    await browser.close();
    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${appName}-Report.pdf"`,
      },
    });
  } catch (e: any) {
    return new Response(e?.message || "Internal server error", {
      status: 500,
    });
  }
}
