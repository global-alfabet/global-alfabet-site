import { company } from "../config.js";

// Plain-language notice describing what this website actually does. Have it reviewed before launch in each
// country Global Alfabet operates in, and update it when analytics, cookies or new services are added.
export default function Privacy() {
  return (
    <article className="article">
      <div className="container narrow prose">
        <h1>Privacy</h1>
        <p className="meta">Last updated 22 October 2026</p>
        <p>
          This notice covers the {company.name} website at globalalfabet.com. Each Alfa product will have its own notice
          when it launches.
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
          Form messages are received through Netlify, which hosts this website, and forwarded to our email. This website
          doesn't use analytics or advertising cookies.
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
