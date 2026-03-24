import type { Locale } from "@/lib/i18n/config"
import { hostingConfig, publisherConfig, siteConfig } from "@/lib/site"

export function MentionsLegalesBody({ lang }: { lang: Locale }) {
  return lang === "en" ? <MentionsEn /> : <MentionsFr />
}

function MentionsFr() {
  const { tradeName, representativeName, street, postalCode, city, country, email, siret } =
    publisherConfig
  const host = siteConfig.url.replace(/^https?:\/\//, "")

  return (
    <>
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong className="text-foreground">{host}</strong> (ci-après « le Site ») est édité par :
        </p>
        <p>
          <strong className="text-foreground">{tradeName}</strong>
          <br />
          {representativeName}
          <br />
          {street}
          <br />
          {postalCode} {city}, {country}
          <br />
          E-mail :{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          <br />
          SIRET : {siret}
        </p>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>{representativeName}</p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le Site est hébergé par <strong className="text-foreground">{hostingConfig.company}</strong>, dont le siège
          social est situé {hostingConfig.address}. Site web :{" "}
          <a href={hostingConfig.website} rel="noopener noreferrer" target="_blank">
            {hostingConfig.website}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des éléments du Site (textes, visuels, logo, structure) sont la propriété de {tradeName} ou font
          l&apos;objet d&apos;une autorisation d&apos;utilisation. Toute reproduction ou représentation, totale ou
          partielle, sans autorisation écrite préalable, est interdite.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question relative au Site, vous pouvez écrire à{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          .
        </p>
      </section>
    </>
  )
}

function MentionsEn() {
  const { tradeName, representativeName, street, postalCode, city, country, email, siret } =
    publisherConfig
  const host = siteConfig.url.replace(/^https?:\/\//, "")

  return (
    <>
      <section>
        <h2>Website publisher</h2>
        <p>
          The website <strong className="text-foreground">{host}</strong> (the &quot;Site&quot;) is published by:
        </p>
        <p>
          <strong className="text-foreground">{tradeName}</strong>
          <br />
          {representativeName}
          <br />
          {street}
          <br />
          {postalCode} {city}, {country}
          <br />
          Email:{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          <br />
          Company ID (SIRET): {siret}
        </p>
      </section>

      <section>
        <h2>Publication director</h2>
        <p>{representativeName}</p>
      </section>

      <section>
        <h2>Hosting</h2>
        <p>
          The Site is hosted by <strong className="text-foreground">{hostingConfig.company}</strong>, registered at{" "}
          {hostingConfig.address}. Website:{" "}
          <a href={hostingConfig.website} rel="noopener noreferrer" target="_blank">
            {hostingConfig.website}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          All elements of the Site (text, visuals, logo, structure) are owned by {tradeName} or used under licence. Any
          reproduction or representation, in whole or in part, without prior written permission is prohibited.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For any question about the Site, write to{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          .
        </p>
      </section>
    </>
  )
}
