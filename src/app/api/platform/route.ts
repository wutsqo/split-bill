export async function GET() {
  const platform = process.platform;
  return new Response(platform);
}
