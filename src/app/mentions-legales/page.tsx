import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { hostingConfig, publisherConfig, siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Informations sur l'éditeur du site ${siteConfig.name} et l'hébergement.`,
}

export default function MentionsLegalesPage() {
  const { tradeName, representativeName, street, postalCode, city, country, email, siret } = publisherConfig

  return (
    <LegalPageShell title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong className="text-foreground">{siteConfig.url.replace(/^https?:\/\//, "")}</strong> (ci-après « le
          Site ») est édité par :
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
          Le Site est hébergé par <strong className="text-foreground">{hostingConfig.company}</strong>, dont le siège social
          est situé {hostingConfig.address}. Site web :{" "}
          <a href={hostingConfig.website} rel="noopener noreferrer" target="_blank">
            {hostingConfig.website}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des éléments du Site (textes, visuels, logo, structure) sont la propriété de {tradeName} ou font l’objet
          d’une autorisation d’utilisation. Toute reproduction ou représentation, totale ou partielle, sans autorisation
          écrite préalable, est interdite.
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
    </LegalPageShell>
  )
}
