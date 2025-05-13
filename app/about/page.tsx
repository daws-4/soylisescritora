import Image from "next/image"
import Link from "next/link"
import { Button } from "@heroui/react"
import { BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-pink-500 to-rose-700">
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
            <div className="relative h-[600px] w-full">
              <Image
                src="/pictures/lis3.jpg"
                alt="Lis Samarah"
                fill
                className="object-cover rounded-lg shadow-lg "
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-rose-900">Biografía</h2>
              <p className="text-lg text-rose-800">
              Nació en Puerto Cabello, en las costas Venezolanas. Creció como todo niño amante de la lectura: rodeada de libros; junto con una creciente curiosidad y amor por las historias que hicieron de su día a día una travesía más divertida. Fue  encontrando en las letras una salida a diversos desafíos vivenciales durante su educación primaria. Es en la literatura, donde ella encontró paz.
              </p>
              <p className="text-lg text-rose-800">
                Su infancia y adolescencia transcurrieron en el estado Táchira, educándose en música, arte, escritura y poesía. A los 14 años tuvo la oportunidad de publicar su primera novela "Sentimientos Sangrientos" en físico.
              </p>
              <p className="text-lg text-rose-800">
                En palabras de sus lectores, dicha obra "fue una luz en la oscuridad" ayudando a adolescentes, padres y educadores a entender un poco mejor temas como el acoso escolar, la depresión y la ansiedad en los jovenes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Journey */}
      {/* <section className="py-16 bg-rose-50">
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
                <p className='text-rose-800'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              {/* <h2 className="text-3xl font-bold text-rose-900">Filosofía Literaria</h2> */}
              <p className="text-lg text-rose-800">
                Y es justamente debido a esto, al fuerte deseo de concienciar a quienes la leen respecto a tópicos de salud mental, que decidió estudiar la carrera de sociologia.
              </p>
              <p className="text-lg text-rose-800">
                Sus siguientes obras han sido cuatro libros más en su perfil de Wattpad (@LisSamarah), y espera pronto materializarlos también para llegar a más personas con su mensaje de igualdad, inclusión y concienciación.
              </p>
              <p className="text-lg text-rose-800">
              "Pues, querido lector ideal, quiero que siempre recuerdes esto:"no estás solo".
              </p>
            </div>
            <div className="relative h-[500px] w-full order-1 md:order-2">
              <Image
                src="/pictures/lis4.jpg"
                alt="Lis Samarah escribiendo"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-500 text-white">
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
