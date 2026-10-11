import { profile } from "@/data/profile";

/** vCard 4.0 for one-tap "add to contacts". */
export async function GET() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:4.0",
    `FN:${profile.name}`,
    "N:Halimeh;Malik;;;",
    `TITLE:${profile.title}`,
    `EMAIL;TYPE=work:${profile.email}`,
    `TEL;TYPE=cell;VALUE=uri:tel:${profile.phoneE164}`,
    `URL:${profile.siteUrl}`,
    `URL;TYPE=github:${profile.github}`,
    `URL;TYPE=linkedin:${profile.linkedin}`,
    `ADR;TYPE=home:;;;${profile.location.city};;;${profile.location.country}`,
    `NOTE:${profile.summary}`,
    "END:VCARD",
  ];
  return new Response(lines.join("\r\n") + "\r\n", {
    headers: { "Content-Type": "text/vcard; charset=utf-8", "Content-Disposition": 'attachment; filename="Malik_Halimeh.vcf"' },
  });
}
