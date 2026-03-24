import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { publisherConfig, siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Traitement des données personnelles sur le site ${siteConfig.name}.`,
}

export default function PolitiqueConfidentialitePage() {
  const { tradeName, representativeName, street, postalCode, city, country, email } = publisherConfig

  return (
    <LegalPageShell title="Politique de confidentialité">
      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données collectées via le site{" "}
          <strong className="text-foreground">{siteConfig.name}</strong> ({siteConfig.url}) est :
        </p>
        <p>
          <strong className="text-foreground">{tradeName}</strong> — {representativeName}
          <br />
          {street}, {postalCode} {city}, {country}
          <br />
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
        </p>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>Selon votre utilisation du Site, peuvent être collectées notamment :</p>
        <ul>
          <li>
            les données que vous nous transmettez volontairement (par exemple via un formulaire de contact ou d’inscription à
            une liste d’attente) : nom, adresse e-mail, et toute information que vous choisissez de fournir ;
          </li>
          <li>
            des données techniques et de fréquentation (adresse IP, type de navigateur, pages consultées, horodatage), dans
            la mesure où des outils d’analyse ou des journaux serveur sont utilisés.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités et bases légales</h2>
        <p>Les données sont traitées pour :</p>
        <ul>
          <li>répondre à vos demandes et vous contacter (intérêt légitime / exécution de mesures précontractuelles) ;</li>
          <li>améliorer le Site et en mesurer l’audience lorsque des outils d’analyse sont en place (intérêt légitime) ;</li>
          <li>respecter nos obligations légales le cas échéant.</li>
        </ul>
      </section>

      <section>
        <h2>4. Durée de conservation</h2>
        <p>
          Les données sont conservées pendant la durée nécessaire aux finalités poursuivies, puis archivées ou supprimées
          conformément aux délais légaux applicables.
        </p>
      </section>

      <section>
        <h2>5. Destinataires</h2>
        <p>
          Les données peuvent être communiquées à nos prestataires techniques strictement nécessaires à l’hébergement, à
          l’exploitation du Site et à l’envoi de communications (sous-traitants liés par des obligations de
          confidentialité et de sécurité).
        </p>
      </section>

      <section>
        <h2>6. Transferts hors Union européenne</h2>
        <p>
          Si des prestataires sont situés hors de l’UE, des garanties appropriées (clauses contractuelles types de la
          Commission européenne ou équivalent) peuvent être mises en œuvre conformément au RGPD.
        </p>
      </section>

      <section>
        <h2>7. Vos droits</h2>
        <p>
          Conformément au règlement (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés », vous disposez d’un droit
          d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité lorsque cela s’applique. Vous
          pouvez exercer ces droits en écrivant à{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          . Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" rel="noopener noreferrer" target="_blank">
            cnil.fr
          </a>
          ).
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          Le Site peut utiliser des cookies ou traceurs pour le fonctionnement technique, la mesure d’audience ou, le cas
          échéant, après votre consentement lorsque la loi l’exige. Vous pouvez paramétrer votre navigateur pour refuser
          certains cookies.
        </p>
      </section>

      <section>
        <h2>9. Modifications</h2>
        <p>
          La présente politique peut être mise à jour. La date de dernière mise à jour correspond à la version publiée sur
          cette page.
        </p>
      </section>
    </LegalPageShell>
  )
}
