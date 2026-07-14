export default async function handler(req, res) {
  try {
    const response = await fetch("https://remotive.com/api/remote-jobs", {
      headers: {
        // Remotive's edge/bot protection tends to reject requests that
        // don't look like they came from a real browser. Vercel's
        // serverless functions run from datacenter IPs with a bare
        // fetch() (no UA), which gets flagged. Spoofing a normal
        // browser UA + Accept header fixes that.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Remotive API error:", response.status, body.slice(0, 300));
      return res
        .status(502)
        .json({ error: `Remotive API returned ${response.status}` });
    }

    const data = await response.json();

    // Cache at the edge for 10 minutes so we're not hammering Remotive
    // on every page load (and less likely to trip rate limiting/bot
    // detection again).
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=300");
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}