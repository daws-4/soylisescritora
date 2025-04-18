import Image from "next/image"
import Link from "next/link"
import { Button } from "@heroui/react"
import { BookOpen, Star, ShoppingBag } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-rose-900 to-rose-700">
        <div className="container mx-auto gap-0 md:gap-4 lg:gap-0 px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="z-10 grid place-content-center space-y-5 py-10 md:w-1/2">
            <h1 className="text-4xl md:text-7xl font-bold text-white font-roman">Lis Samarah</h1>
            <p className="text-xl md:text-2xl text-rose-200">Escritora y Crítica Literaria</p>
            <p className="text-rose-200/80 text-balance text-lg max-w-md">
              Explorando mundos a través de palabras y compartiendo perspectivas únicas sobre literatura y cine.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                as={Link}
                href="/reviews"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                Leer Reseñas
              </Button>
              <Button
                as={Link}
                href="/store"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                Visitar Tienda
              </Button>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] mt-8 md:mt-0">
            <Image
              src="https://random-image-pepebigotes.vercel.app/api/random-image"
              alt="Lis Samarah"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-rose-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-rose-900">Sobre Lis Samarah</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-rose-700">
                <strong>Lis Samarah</strong> es una apasionada escritora y crítica literaria española, cuya pluma da vida a historias que
                cautivan y conmueven. Con una sensibilidad única para captar la esencia de las emociones humanas, Lis ha
                conquistado a lectores con su estilo distintivo y profundo.
              </p>
              <p className="text-lg text-rose-700">
                Nacida y criada en <strong>España</strong>, su amor por la literatura comenzó desde temprana edad, llevándola a explorar
                diversos géneros y estilos que han enriquecido su propia voz como autora.
              </p>
              <p className="text-lg text-rose-700">
                Además de su labor como escritora, Lis comparte su pasión por la literatura y el cine a través de
                reseñas detalladas y perspicaces que invitan a los lectores a descubrir nuevos mundos.
              </p>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="https://random-image-pepebigotes.vercel.app/api/random-image"
                alt="Lis Samarah escribiendo"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Book Section */}
      <section className="py-16 bg-gradient-to-b from-rose-100 to-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-rose-900">Obra Destacada</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] w-full order-2 md:order-1">
              <Image
                src="https://random-image-pepebigotes.vercel.app/api/random-image"
                alt="Portada de Sentimientos Sangrientos"
                fill
                className="object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-rose-800">Sentimientos Sangrientos</h3>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_: undefined, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-rose-700">
                "Sentimientos Sangrientos" es la obra maestra de Lis Samarah que ha cautivado a lectores de todas
                partes. Una novela que explora las profundidades del alma humana, donde el amor y el dolor se entrelazan
                en una danza apasionada y a veces desgarradora.
              </p>
              <p className="text-lg text-rose-700">
                Con una prosa poética y personajes inolvidables, esta obra invita al lector a sumergirse en un viaje
                emocional que deja una huella imborrable en el corazón.
              </p>
              <Button
                as={Link}
                href="/store/sentimientos-sangrientos"

                size="lg"
                className="mt-4 bg-rose-700 hover:bg-rose-800"
              >
                Adquirir Libro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-rose-900">Reseñas Recientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={`https://random-image-pepebigotes.vercel.app/api/random-image`}
                    alt={`Reseña ${item}`}
                    fill
                    className="object-fill"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-rose-800">Título de la Reseña {item}</h3>
                  <p className="text-gray-600 mb-4">
                    Una mirada profunda a esta fascinante obra que combina elementos de...
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_: undefined, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 fill-none text-yellow-400" />
                    </div>
                    <Button as={Link} href={`/reviews/${item}`} className="text-rose-700 p-0">
                      Leer más
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              as={Link}
              href="/reviews"

              size="lg"
              className="border-rose-700 text-rose-700 hover:bg-rose-50"
            >
              Ver Todas las Reseñas
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-900 to-rose-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Descubre el Mundo de Lis Samarah</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Sumérgete en historias cautivadoras, reseñas perspicaces y descubre obras que transformarán tu perspectiva.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-white/10 p-6 rounded-full mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reseñas Literarias</h3>
              <p className="mb-4">Análisis profundos de las obras más impactantes del panorama literario actual.</p>
              <Button
                as={Link}
                href="/reviews/books"

                className="border-white text-white hover:bg-white/10"
              >
                Explorar
              </Button>
            </div>
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-white/10 p-6 rounded-full mb-4">
                <Star className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Críticas de Cine</h3>
              <p className="mb-4">Perspectivas únicas sobre las películas que están dando que hablar.</p>
              <Button
                as={Link}
                href="/reviews/movies"

                className="border-white text-white hover:bg-white/10"
              >
                Explorar
              </Button>
            </div>
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-white/10 p-6 rounded-full mb-4">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tienda Literaria</h3>
              <p className="mb-4">Adquiere las obras originales de Lis Samarah y lleva su magia a tu biblioteca.</p>
              <Button as={Link} href="/store" className="border-white text-white hover:bg-white/10">
                Visitar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
