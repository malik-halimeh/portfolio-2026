import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <Container className="py-24">
      <h1 className="display text-5xl sm:text-7xl">{profile.tagline}</h1>
      <p className="prose-measure mt-6 text-lg text-fg-muted">{profile.summary}</p>
    </Container>
  );
}
