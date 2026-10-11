import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="font-mono text-sm text-accent">RELEASED</p>
      <h1 className="display mt-3 text-5xl sm:text-7xl">
        This page gave its slot back.
      </h1>
      <p className="prose-measure mt-6 text-lg text-fg-muted">
        Nothing is booked at this address. The interval was returned to
        availability.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-5 font-semibold text-accent-fg"
      >
        Back to the start
      </Link>
    </Container>
  );
}
