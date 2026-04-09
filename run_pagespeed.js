const urls = [
  "https://fat-chef-web.vercel.app/",
  "https://fat-chef-web.vercel.app/menu",
  "https://fat-chef-web.vercel.app/reservations"
];

async function runAudit() {
  for (const url of urls) {
    for (const strategy of ['mobile', 'desktop']) {
      console.log(`\nFetching Lighthouse Audit for: ${url} (${strategy})`);
      try {
        const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`);
        const data = await res.json();
        
        if (data.error) {
           console.error("API Error:", data.error.message);
           continue;
        }
        
        const lh = data.lighthouseResult.categories;
        console.log(`Performance:    ${Math.round(lh.performance.score * 100)}`);
        console.log(`Accessibility:  ${Math.round(lh.accessibility.score * 100)}`);
        console.log(`Best Practices: ${Math.round(lh['best-practices'].score * 100)}`);
        console.log(`SEO:            ${Math.round(lh.seo.score * 100)}`);

        // Check for specific metrics if needed
        const metrics = data.lighthouseResult.audits;
        console.log(`LCP:            ${metrics['largest-contentful-paint'].displayValue}`);
        console.log(`CLS:            ${metrics['cumulative-layout-shift'].displayValue}`);
      } catch(e) {
        console.error("Fetch failed:", e);
      }
    }
  }
}
runAudit();
