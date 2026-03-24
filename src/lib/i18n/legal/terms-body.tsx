import type { Locale } from "@/lib/i18n/config"
import { publisherConfig, siteConfig } from "@/lib/site"

export function TermsBody({ lang }: { lang: Locale }) {
  return lang === "en" ? <TermsEn /> : <TermsFr />
}

function TermsFr() {
  const { tradeName, email } = publisherConfig

  return (
    <>
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions générales d&apos;utilisation (CGU) encadrent l&apos;accès et l&apos;utilisation du site{" "}
          <strong className="text-foreground">{siteConfig.name}</strong> accessible à l&apos;adresse {siteConfig.url} (le «
          Site »), édité par {tradeName}.
        </p>
      </section>

      <section>
        <h2>2. Acceptation</h2>
        <p>
          En naviguant sur le Site, vous acceptez sans réserve les présentes CGU. Si vous n&apos;acceptez pas ces
          conditions, veuillez ne pas utiliser le Site.
        </p>
      </section>

      <section>
        <h2>3. Description du service</h2>
        <p>
          Le Site a pour objet de présenter {siteConfig.name}, ses fonctionnalités et les modalités d&apos;accès au produit.
          Les services effectifs (création de compte, abonnement, etc.) peuvent être soumis à des conditions particulières
          distinctes.
        </p>
      </section>

      <section>
        <h2>4. Comportement de l&apos;utilisateur</h2>
        <p>Vous vous engagez à :</p>
        <ul>
          <li>utiliser le Site de manière loyale et conforme aux lois en vigueur ;</li>
          <li>ne pas tenter d&apos;accéder de façon non autorisée aux systèmes, données ou comptes ;</li>
          <li>ne pas diffuser de contenus illicites, diffamatoires ou portant atteinte aux droits de tiers.</li>
        </ul>
      </section>

      <section>
        <h2>5. Propriété intellectuelle</h2>
        <p>
          Les contenus du Site (textes, images, marques, logos) sont protégés. Toute utilisation non autorisée est
          interdite.
        </p>
      </section>

      <section>
        <h2>6. Disponibilité</h2>
        <p>
          {tradeName} s&apos;efforce d&apos;assurer la disponibilité du Site mais ne garantit pas un accès ininterrompu. Le
          Site peut être modifié ou suspendu pour maintenance ou pour toute autre raison jugée nécessaire.
        </p>
      </section>

      <section>
        <h2>7. Liens externes</h2>
        <p>
          Le Site peut renvoyer vers des sites tiers. {tradeName} n&apos;exerce pas de contrôle sur ces sites et décline
          toute responsabilité quant à leur contenu ou leurs pratiques.
        </p>
      </section>

      <section>
        <h2>8. Limitation de responsabilité</h2>
        <p>
          Dans les limites autorisées par la loi, {tradeName} ne saurait être tenu responsable des dommages indirects ou
          imprévisibles résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le Site.
        </p>
      </section>

      <section>
        <h2>9. Droit applicable</h2>
        <p>
          Les présentes CGU sont régies par le droit français. Les tribunaux français seront seuls compétents en cas de
          litige, sous réserve des règles impératives applicables aux consommateurs.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          Pour toute question relative aux CGU :{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          .
        </p>
      </section>
    </>
  )
}

function TermsEn() {
  const { tradeName, email } = publisherConfig

  return (
    <>
      <section>
        <h2>1. Purpose</h2>
        <p>
          These terms of use govern access to and use of the website{" "}
          <strong className="text-foreground">{siteConfig.name}</strong> at {siteConfig.url} (the &quot;Site&quot;),
          published by {tradeName}.
        </p>
      </section>

      <section>
        <h2>2. Acceptance</h2>
        <p>
          By using the Site, you accept these terms without reservation. If you do not agree, please do not use the Site.
        </p>
      </section>

      <section>
        <h2>3. Description of the service</h2>
        <p>
          The Site presents {siteConfig.name}, its features, and how to access the product. Actual services (account
          creation, subscription, etc.) may be subject to separate terms.
        </p>
      </section>

      <section>
        <h2>4. User conduct</h2>
        <p>You agree to:</p>
        <ul>
          <li>use the Site fairly and in compliance with applicable laws;</li>
          <li>not attempt unauthorised access to systems, data, or accounts;</li>
          <li>not publish unlawful, defamatory, or third-party rights–infringing content.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual property</h2>
        <p>Site content (text, images, trademarks, logos) is protected. Any unauthorised use is prohibited.</p>
      </section>

      <section>
        <h2>6. Availability</h2>
        <p>
          {tradeName} aims to keep the Site available but does not guarantee uninterrupted access. The Site may be changed
          or suspended for maintenance or other necessary reasons.
        </p>
      </section>

      <section>
        <h2>7. External links</h2>
        <p>
          The Site may link to third-party sites. {tradeName} does not control those sites and disclaims responsibility for
          their content or practices.
        </p>
      </section>

      <section>
        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {tradeName} shall not be liable for indirect or unforeseeable damage
          arising from use or inability to use the Site.
        </p>
      </section>

      <section>
        <h2>9. Governing law</h2>
        <p>
          These terms are governed by French law. French courts shall have exclusive jurisdiction, without prejudice to
          mandatory consumer protection rules.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          For questions about these terms:{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
          .
        </p>
      </section>
    </>
  )
}
