async function runAudit() {
  const url = "https://fat-chef-web--constant-cursor-455715-p1.us-central1.hosted.app/menu";
  console.log("Fetching Lighthouse Audit for:", url);
  try {
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`);
    const data = await res.json();
    
    if (data.error) {
       console.error("API Error:", data.error.message);
       return;
    }
    
    const lh = data.lighthouseResult.categories;
    console.log("--- LIGHTHOUSE SCORES ---");
    console.log(`Performance:    ${Math.round(lh.performance.score * 100)}`);
    console.log(`Accessibility:  ${Math.round(lh.accessibility.score * 100)}`);
    console.log(`Best Practices: ${Math.round(lh['best-practices'].score * 100)}`);
    console.log(`SEO:            ${Math.round(lh.seo.score * 100)}`);
  } catch(e) {
    console.error("Fetch failed:", e);
  }
}
runAudit();
