import { company } from "../config.js";

// Plain-language notice describing what this website actually does. Have it reviewed before launch in each
// country Global Alfabet operates in, and update it when analytics, cookies or new services are added.
export default function Privacy() {
  return (
    <article className="article">
      <div className="container narrow prose">
        <h1>Privacy</h1>
        <p className="meta">Last updated 27 October 2026</p>
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
          Form messages are received through Netlify, which hosts this website, and forwarded to our email.
        </p>
        <h2>Cookies and tracking</h2>
        <p>
          This website doesn't set cookies. It doesn't use analytics, advertising or tracking tools, and doesn't record
          screens or sessions (no session replay). Only this website's own code runs on its pages.
        </p>
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
