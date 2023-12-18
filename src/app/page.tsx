import ClientOnly from "./components/client-only";

export default function Home() {
  return (
    <ClientOnly>
      <Container>
      </Container>
    </ClientOnly>

  )
}
