import Image from "next/image"
import Link from "next/link"
import { Button } from "@heroui/react"
import { BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-rose-900 to-rose-700">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Sobre Lis Samarah</h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              Conoce más sobre la escritora y crítica literaria detrás de "Sentimientos Sangrientos"
            </p>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] w-full">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Lis Samarah"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-rose-900">Biografía</h2>
              <p className="text-lg">
                Lis Samarah nació en el corazón de España, donde desde temprana edad mostró una fascinación por las
                palabras y las historias. Creció rodeada de libros, desarrollando una sensibilidad especial para captar
                la belleza y la complejidad de la condición humana.
              </p>
              <p className="text-lg">
                Estudió Literatura en la Universidad de Madrid, donde descubrió su pasión por la crítica literaria y
                comenzó a forjar su propio estilo como escritora. Sus primeros relatos cortos llamaron la atención por
                su intensidad emocional y su prosa poética.
              </p>
              <p className="text-lg">
                En 2018, publicó su primera novela, "Sentimientos Sangrientos", que rápidamente captó la atención de
                lectores y críticos por su exploración profunda de las emociones humanas y su estilo único. La obra se
                convirtió en un referente dentro de su género y consolidó a Lis como una voz importante en el panorama
                literario español.
              </p>
              <p className="text-lg">
                Paralelamente a su carrera como escritora, Lis ha desarrollado una labor como crítica literaria y de
                cine, compartiendo su perspectiva única y su análisis profundo de obras contemporáneas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Journey */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-rose-900">Trayectoria Literaria</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                title: "Inicios",
                description:
                  "Los primeros pasos de Lis en el mundo literario comenzaron con relatos cortos publicados en revistas especializadas. Su estilo único y su capacidad para transmitir emociones complejas llamaron la atención desde el principio.",
              },
              {
                number: 2,
                title: "Consolidación",
                description:
                  'Con la publicación de "Sentimientos Sangrientos", Lis consolidó su posición en el panorama literario. La novela, aclamada por la crítica, mostró su madurez como escritora y su capacidad para crear personajes complejos y situaciones emocionalmente intensas.',
              },
              {
                number: 3,
                title: "Actualidad",
                description:
                  "Actualmente, Lis compagina su labor como escritora con su faceta de crítica literaria y cinematográfica. Sus reseñas, caracterizadas por su profundidad y sensibilidad, se han convertido en referencia para muchos amantes de la cultura.",
              },
            ].map((item) => (
              <div key={item.number} className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-rose-700 text-white rounded-full flex items-center justify-center mb-6 text-xl font-bold">
                  {item.number}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-rose-900">Filosofía Literaria</h2>
              <p className="text-lg">
                Para Lis Samarah, la literatura es mucho más que entretenimiento; es un vehículo para explorar la
                complejidad del alma humana y un puente que conecta experiencias y emociones universales.
              </p>
              <p className="text-lg">
                "Escribir es un acto de valentía", afirma Lis. "Requiere la disposición de sumergirse en las
                profundidades de uno mismo y extraer verdades que a veces pueden ser incómodas pero necesarias."
              </p>
              <p className="text-lg">
                En sus reseñas, Lis busca ir más allá de la superficie, analizando no solo los aspectos técnicos de las
                obras sino también su impacto emocional y su relevancia en el contexto cultural actual.
              </p>
              <p className="text-lg">
                Su enfoque crítico se caracteriza por la honestidad, la empatía y un profundo respeto por el trabajo
                creativo, valores que también guían su propia escritura.
              </p>
            </div>
            <div className="relative h-[400px] w-full order-1 md:order-2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Lis Samarah escribiendo"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rose-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Descubre la Obra de Lis Samarah</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Sumérgete en el universo literario de Lis a través de sus obras y reseñas.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button as={Link} href="/store" variant="light" size="lg" className="gap-2">
              <BookOpen className="h-5 w-5" />
              <span>Explorar Libros</span>
            </Button>
            <Button
              as={Link}
              href="/reviews"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Ver Reseñas
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
