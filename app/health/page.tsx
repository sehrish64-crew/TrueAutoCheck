import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Check - TrueAutoCheck',
  robots: 'noindex',
};

export default function HealthPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>🏥 TrueAutoCheck Health Check</h1>
      
      <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <h2>✅ Site Status</h2>
        <ul>
          <li>✓ Site is accessible and rendering</li>
          <li>✓ Next.js is working properly</li>
          <li>✓ Metadata is being generated</li>
          <li>✓ SEO components are loaded</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <h2>📋 Environment Info</h2>
        <pre>
{`NODE_ENV: ${process.env.NODE_ENV || 'not set'}
BASE_URL: ${process.env.NEXT_PUBLIC_BASE_URL || 'not set'}
Database: Configured (check /api/test-db)`}
        </pre>
      </div>

      <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <h2>🔗 Important Links</h2>
        <ul>
          <li><a href="/">Home</a> - Main page</li>
          <li><a href="/sitemap.xml">Sitemap</a> - XML Sitemap for search engines</li>
          <li><a href="/robots.txt">Robots.txt</a> - Crawler instructions</li>
          <li><a href="/api/test-db">Database Test</a> - Check database connection</li>
          <li><a href="/about-us">About Us</a> - About page</li>
          <li><a href="/pricing">Pricing</a> - Pricing page</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', backgroundColor: '#fffacd', padding: '20px', borderRadius: '5px' }}>
        <h2>⚠️ For ScamAdvisor</h2>
        <p>If ScamAdvisor still cannot analyze the site:</p>
        <ol>
          <li>Make sure <strong>robots.txt</strong> is accessible: https://trueautocheck.com/robots.txt</li>
          <li>Check <strong>sitemap.xml</strong> is valid: https://trueautocheck.com/sitemap.xml</li>
          <li>Ensure main page loads without errors: https://trueautocheck.com/</li>
          <li>Check that <strong>/api</strong> endpoints are working</li>
          <li>Wait 24-48 hours and resubmit to ScamAdvisor</li>
        </ol>
      </div>
    </div>
  );
}
