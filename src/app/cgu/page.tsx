import type { Metadata } from "next"

import { LegalPageShell } from "@/components/legal/legal-page-shell"
import { publisherConfig, siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation",
  description: `Conditions d’utilisation du site ${siteConfig.name}.`,
}

export default function CGUPage() {
  const { tradeName, email } = publisherConfig

  return (
    <LegalPageShell title="Conditions générales d’utilisation">
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions générales d’utilisation (CGU) encadrent l’accès et l’utilisation du site{" "}
          <strong className="text-foreground">{siteConfig.name}</strong> accessible à l’adresse {siteConfig.url} (le « Site
          »), édité par {tradeName}.
        </p>
      </section>

      <section>
        <h2>2. Acceptation</h2>
        <p>
          En naviguant sur le Site, vous acceptez sans réserve les présentes CGU. Si vous n’acceptez pas ces conditions,
          veuillez ne pas utiliser le Site.
        </p>
      </section>

      <section>
        <h2>3. Description du service</h2>
        <p>
          Le Site a pour objet de présenter {siteConfig.name}, ses fonctionnalités et les modalités d’accès au produit. Les
          services effectifs (création de compte, abonnement, etc.) peuvent être soumis à des conditions particulières
          distinctes.
        </p>
      </section>

      <section>
        <h2>4. Comportement de l’utilisateur</h2>
        <p>Vous vous engagez à :</p>
        <ul>
          <li>utiliser le Site de manière loyale et conforme aux lois en vigueur ;</li>
          <li>ne pas tenter d’accéder de façon non autorisée aux systèmes, données ou comptes ;</li>
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
          {tradeName} s’efforce d’assurer la disponibilité du Site mais ne garantit pas un accès ininterrompu. Le Site peut
          être modifié ou suspendu pour maintenance ou pour toute autre raison jugée nécessaire.
        </p>
      </section>

      <section>
        <h2>7. Liens externes</h2>
        <p>
          Le Site peut renvoyer vers des sites tiers. {tradeName} n’exerce pas de contrôle sur ces sites et décline toute
          responsabilité quant à leur contenu ou leurs pratiques.
        </p>
      </section>

      <section>
        <h2>8. Limitation de responsabilité</h2>
        <p>
          Dans les limites autorisées par la loi, {tradeName} ne saurait être tenu responsable des dommages indirects ou
          imprévisibles résultant de l’utilisation ou de l’impossibilité d’utiliser le Site.
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
    </LegalPageShell>
  )
}
