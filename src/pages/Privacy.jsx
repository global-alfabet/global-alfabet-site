import { company } from "../config.js";
import { openCookieSettings } from "../lib/consent.js";

// Plain-language notice describing what this website actually does. Have it reviewed before launch in each
// country Global Alfabet operates in, and update it when analytics, cookies or new services are added. The cookie
// section follows src/config.js: it describes Google Analytics only when a measurement ID is set.
export default function Privacy() {
  return (
    <article className="article">
      <div className="container narrow prose">
        <h1>Privacy</h1>
        <p className="meta">Last updated 29 October 2026</p>
        <p>
          This notice covers the {company.name} website at globalalfabet.com. Each Alfa product has its own notice:{" "}
          <a href="https://app.maps.globalalfabet.com/privacy">Alfa Maps</a>, covering maps.globalalfabet.com and the Alfa Maps
          app.
        </p>
        <h2>What we collect</h2>
        <p>
          Only what you type into our enquiry and support forms: your name, email address, and, if you add them, your
          phone number, company and message.
        </p>
        <h2>Why we collect it</h2>
        <p>To reply to you and help with your request. We don't sell it or use it for advertising.</p>
        <h2>Where it's kept</h2>
        <p>
          Form messages are received through Netlify, which hosts this website, and forwarded to our email. We send you
          a short email confirming we've received your message through Resend, our email provider.
        </p>
        <h2 id="cookies">Cookies and analytics</h2>
        {company.analytics.ga4 ? (
          <>
            <p>
              We use Google Analytics to count visits and see which pages help people, but only if you press Accept on
              the cookie banner. Until then Google's code isn't loaded and no analytics cookies are set. We don't use
              advertising or tracking tools, and we don't record screens or sessions.
            </p>
            <ul>
              <li>
                <b>ga_consent</b> remembers your answer (Accept or Reject). It's needed for the banner to work, so it's
                set either way. It lasts 6 months, then we ask again. It's set for globalalfabet.com, so one answer
                covers all Global Alfabet sites, including Alfa Maps, Alfa Finda and Alfa Shop.
              </li>
              <li>
                <b>_ga</b> and <b>_ga_&lt;ID&gt;</b> are Google Analytics cookies. They tell visits apart so they can be
                counted. They're set only after you accept, and last up to 13 months.
              </li>
            </ul>
            <p>
              <b>What's measured:</b> the pages you open, how you arrived (for example from a search engine or a link),
              your approximate region (worked out from your IP address, which Google Analytics doesn't store), your type
              of device and browser, and clicks on our email, phone and WhatsApp links. We never send Google your name,
              email, phone number or anything you type into a form. Google signals and advertising features are off.
            </p>
            <p>
              Google processes this data for us as our processor, under its data processing terms, and may process it
              outside your country. We keep the reports for no longer than 14 months.
            </p>
            <p>
              <b>Changing your mind:</b> choose{" "}
              <button type="button" className="inline-link" onClick={openCookieSettings}>
                Cookie settings
              </button>{" "}
              (also at the bottom of every page). If you reject after accepting, we stop measuring straight away and
              delete the Google Analytics cookies. If your browser sends Global Privacy Control, we treat that as Reject
              unless you accept in Cookie settings.
            </p>
          </>
        ) : (
          <p>
            This website doesn't set cookies. It doesn't use analytics, advertising or tracking tools, and doesn't
            record screens or sessions (no session replay).
          </p>
        )}
        <h2>How long we keep it</h2>
        <p>As long as we need to deal with your request and any follow-up, then we delete it.</p>
        <h2>Your choices</h2>
        <p>
          To see, correct or delete what you've sent us, email <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </div>
    </article>
  );
}
