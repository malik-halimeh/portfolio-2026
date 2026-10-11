import { profile, skills } from "@/data/profile";

/** Google-documented ProfilePage + Person structured data. */
export function PersonJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${profile.siteUrl}/#person`,
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    url: profile.siteUrl,
    image: `${profile.siteUrl}/malik.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: "LB",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    worksFor: { "@type": "Organization", name: profile.experience.org },
    knowsLanguage: profile.languages.map((l) => l.name),
    knowsAbout: skills.flatMap((g) => g.items.map((i) => i.name)).slice(0, 40),
    sameAs: [profile.github, profile.linkedin],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${profile.siteUrl}/#profilepage`,
        mainEntity: { "@id": person["@id"] },
        dateModified: profile.availability.updated,
      },
      person,
      {
        "@type": "WebSite",
        "@id": `${profile.siteUrl}/#website`,
        url: profile.siteUrl,
        name: profile.name,
        inLanguage: ["en", "ar"],
        author: { "@id": person["@id"] },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
