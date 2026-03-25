import type { Locale } from "@/lib/i18n/config"
import { publisherConfig, siteConfig } from "@/lib/site"

export function PrivacyPolicyBody({ lang }: { lang: Locale }) {
  return lang === "en" ? <PrivacyEn /> : <PrivacyFr />
}

function PrivacyFr() {
  const { tradeName, street, postalCode, city, country, email } = publisherConfig

  return (
    <>
      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données collectées via le site{" "}
          <strong className="text-foreground">{siteConfig.name}</strong> ({siteConfig.url}) est :
        </p>
        <p>
          <strong className="text-foreground">{tradeName}</strong>
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
            les données que vous nous transmettez volontairement (par exemple via un formulaire de contact ou
            d&apos;inscription à une liste d&apos;attente) : nom, adresse e-mail, et toute information que vous choisissez
            de fournir ;
          </li>
          <li>
            des données techniques et de fréquentation (adresse IP, type de navigateur, pages consultées, horodatage),
            dans la mesure où des outils d&apos;analyse ou des journaux serveur sont utilisés.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités et bases légales</h2>
        <p>Les données sont traitées pour :</p>
        <ul>
          <li>
            répondre à vos demandes et vous contacter (intérêt légitime / exécution de mesures précontractuelles) ;
          </li>
          <li>améliorer le Site et en mesurer l&apos;audience lorsque des outils d&apos;analyse sont en place (intérêt légitime) ;</li>
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
          Les données peuvent être communiquées à nos prestataires techniques strictement nécessaires à l&apos;hébergement,
          à l&apos;exploitation du Site et à l&apos;envoi de communications (sous-traitants liés par des obligations de
          confidentialité et de sécurité).
        </p>
      </section>

      <section>
        <h2>6. Transferts hors Union européenne</h2>
        <p>
          Si des prestataires sont situés hors de l&apos;UE, des garanties appropriées (clauses contractuelles types de la
          Commission européenne ou équivalent) peuvent être mises en œuvre conformément au RGPD.
        </p>
      </section>

      <section>
        <h2>7. Vos droits</h2>
        <p>
          Conformément au règlement (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés », vous disposez d&apos;un
          droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité
          lorsque cela s&apos;applique. Vous pouvez exercer ces droits en écrivant à{" "}
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
          Le Site peut utiliser des cookies ou traceurs pour le fonctionnement technique, la mesure d&apos;audience ou, le
          cas échéant, après votre consentement lorsque la loi l&apos;exige. Vous pouvez paramétrer votre navigateur pour
          refuser certains cookies.
        </p>
      </section>

      <section>
        <h2>9. Modifications</h2>
        <p>
          La présente politique peut être mise à jour. La date de dernière mise à jour correspond à la version publiée sur
          cette page.
        </p>
      </section>
    </>
  )
}

function PrivacyEn() {
  const { tradeName, street, postalCode, city, country, email } = publisherConfig

  return (
    <>
      <section>
        <h2>1. Data controller</h2>
        <p>
          The controller of personal data collected through the website{" "}
          <strong className="text-foreground">{siteConfig.name}</strong> ({siteConfig.url}) is:
        </p>
        <p>
          <strong className="text-foreground">{tradeName}</strong>
          <br />
          {street}, {postalCode} {city}, {country}
          <br />
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
        </p>
      </section>

      <section>
        <h2>2. Data collected</h2>
        <p>Depending on how you use the Site, we may collect in particular:</p>
        <ul>
          <li>
            information you voluntarily provide (for example via a contact or waitlist form): name, email address, and any
            other details you choose to share;
          </li>
          <li>
            technical and usage data (IP address, browser type, pages viewed, timestamps), where analytics tools or server
            logs are used.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Purposes and legal bases</h2>
        <p>Data is processed to:</p>
        <ul>
          <li>respond to your requests and contact you (legitimate interest / pre-contractual measures);</li>
          <li>improve the Site and measure its audience where analytics are in place (legitimate interest);</li>
          <li>comply with legal obligations where applicable.</li>
        </ul>
      </section>

      <section>
        <h2>4. Retention</h2>
        <p>
          Data is kept only as long as needed for these purposes, then archived or deleted in line with applicable legal
          time limits.
        </p>
      </section>

      <section>
        <h2>5. Recipients</h2>
        <p>
          Data may be shared with technical service providers strictly necessary for hosting, operating the Site, and
          sending communications (processors bound by confidentiality and security obligations).
        </p>
      </section>

      <section>
        <h2>6. Transfers outside the European Union</h2>
        <p>
          If providers are located outside the EU, appropriate safeguards (e.g. EU Commission standard contractual clauses
          or equivalent) may be used in line with the GDPR.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          Under the GDPR and applicable French law, you may have the right to access, rectify, erase, restrict, object, and
          request portability where applicable. To exercise these rights, email{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          . You may also lodge a complaint with the CNIL (
          <a href="https://www.cnil.fr" rel="noopener noreferrer" target="_blank">
            cnil.fr
          </a>
          ).
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          The Site may use cookies or similar technologies for technical operation, audience measurement, or — where
          required by law — after your consent. You can adjust your browser to refuse certain cookies.
        </p>
      </section>

      <section>
        <h2>9. Changes</h2>
        <p>This policy may be updated. The latest version is the one published on this page.</p>
      </section>
    </>
  )
}
