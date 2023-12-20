import ClientOnly from "./components/client-only";
import Container from "./components/container";
import EmptyState from "./components/empty-state";

export default function Home() {
  const isEmpty = true

  if (isEmpty) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          <div>
            My Feature Listings
          </div>
        </div>
      </Container>
    </ClientOnly>

  )
}
