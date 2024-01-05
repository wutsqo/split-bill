import { SITE_URL, appName } from "@/app/config";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import puppeteer, { Browser } from "puppeteer-core";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const BYPASS_KEY = process.env.NEXT_PUBLIC_BYPASS_KEY;

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : "/usr/bin/google-chrome";

const getBrowser = () =>
  IS_PRODUCTION
    ? puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`,
      })
    : puppeteer.launch({
        args: [],
        executablePath: exePath,
        headless: true,
      });

const generatePdf = async (id: string) => {
  let browser: Browser | null = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await page.goto(`${SITE_URL}/report/${id}?key=${BYPASS_KEY}`);
    const file = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    await browser.close();
    return file;
  } catch (error: any) {
    throw new Error(error?.message ?? "Internal server error");
  } finally {
    if (browser) browser.close();
  }
};

const getSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  );
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const group_id = searchParams.get("group_id");
  const user_id = searchParams.get("user_id");
  const key = searchParams.get("key");
  if (key !== BYPASS_KEY || !BYPASS_KEY)
    return new Response("Not authorized", {
      status: 401,
    });
  if (!group_id || !user_id)
    return new Response("Bad request", {
      status: 400,
    });
  try {
    const [supabase, pdf] = await Promise.all([
      getSupabaseClient(),
      generatePdf(group_id),
    ]);
    const { data, error } = await supabase.storage
      .from("pdf")
      .upload(`${user_id}/${appName} Summary ${group_id}.pdf`, pdf, {
        upsert: true,
      });
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return new Response(data.path, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error?.message ?? "Internal server error", {
      status: 500,
    });
  }
}
