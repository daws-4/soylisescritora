export type Review = {
  id: string
  title: string
  slug: string
  coverImage: string
  excerpt: string
  content: string
  rating: number
  category: "book" | "movie"
  author: string
  publishDate: string
  tags: string[]
}

export const reviews: Review[] = [
  {
    id: "1",
    title: "El Laberinto de los Espíritus",
    slug: "el-laberinto-de-los-espiritus",
    coverImage: "/placeholder.svg?height=400&width=300&text=El+Laberinto",
    excerpt:
      "Una obra maestra que cierra el ciclo de El Cementerio de los Libros Olvidados con una trama que entrelaza misterio, amor y literatura.",
    content: `
# El Laberinto de los Espíritus

*Por Carlos Ruiz Zafón*

## Una despedida magistral

Carlos Ruiz Zafón cierra su tetralogía "El Cementerio de los Libros Olvidados" con esta novela monumental que entrelaza todas las historias anteriores y nos devuelve a la Barcelona de posguerra, un escenario gótico y misterioso que el autor ha convertido en su sello personal.

## La trama

Alicia Gris, una joven con un pasado enigmático, es contratada para investigar la desaparición del ministro Mauricio Valls. Esta búsqueda la llevará a adentrarse en los secretos más oscuros de la ciudad y a cruzarse con personajes ya conocidos de las novelas anteriores, como Daniel Sempere y Fermín Romero de Torres.

La narrativa avanza entre el presente de la investigación y flashbacks que nos revelan el pasado de Alicia y su conexión con los eventos que investiga. Zafón construye un intrincado puzzle donde cada pieza encaja perfectamente al final.

## Estilo y atmósfera

Como es habitual en Zafón, la prosa es rica y evocadora, creando atmósferas densas y casi cinematográficas. Barcelona se convierte en un personaje más, con sus callejuelas sombrías, sus edificios antiguos y sus secretos enterrados.

## Conclusión

"El Laberinto de los Espíritus" es una conclusión satisfactoria para la saga, que responde a las preguntas planteadas en los libros anteriores y cierra los arcos narrativos de manera coherente. Es una novela que atrapa desde la primera página y que deja al lector con la sensación de haber vivido una aventura extraordinaria.

**Calificación: 5/5 estrellas**

Una lectura imprescindible para los amantes de la literatura, el misterio y las historias bien contadas.
    `,
    rating: 5,
    category: "book",
    author: "Carlos Ruiz Zafón",
    publishDate: "2016-11-17",
    tags: ["novela", "misterio", "histórica", "Barcelona"],
  },
  {
    id: "2",
    title: "Parásitos",
    slug: "parasitos",
    coverImage: "/placeholder.svg?height=400&width=300&text=Parásitos",
    excerpt:
      "Una brillante sátira social que explora la desigualdad de clases a través de dos familias de diferentes estratos sociales en Corea del Sur.",
    content: `
# Parásitos (Parasite)

*Dirigida por Bong Joon-ho*

## Una obra maestra del cine contemporáneo

"Parásitos" se ha convertido por méritos propios en una de las películas más importantes de los últimos años. Ganadora del Oscar a Mejor Película (la primera de habla no inglesa en conseguirlo), esta producción surcoreana trasciende géneros y expectativas para ofrecer una experiencia cinematográfica única.

## La historia

La familia Kim vive hacinada en un sótano, luchando por sobrevivir con trabajos precarios. Su suerte cambia cuando el hijo consigue un empleo como tutor en la adinerada familia Park. Poco a poco, y mediante engaños, toda la familia Kim se infiltra en la casa de los Park, ocupando diferentes puestos de servicio.

Lo que comienza como una comedia de enredos se transforma gradualmente en un thriller psicológico y, finalmente, en una tragedia que reflexiona sobre la desigualdad social y sus consecuencias.

## Dirección y estilo visual

Bong Joon-ho demuestra un control absoluto de la narrativa visual. La casa de los Park, diseñada específicamente para la película, se convierte en un espacio simbólico donde los niveles físicos (arriba/abajo) reflejan la estratificación social.

La fotografía, a cargo de Hong Kyung-pyo, juega magistralmente con la luz y las sombras para reforzar los contrastes entre ambas familias y sus mundos.

## Mensaje social

Sin caer en el didactismo, "Parásitos" plantea preguntas incómodas sobre la desigualdad económica, el capitalismo y la ilusión de la movilidad social. ¿Quiénes son realmente los parásitos en esta historia? La respuesta no es tan sencilla como podría parecer.

## Conclusión

"Parásitos" es una película que merece ser vista y revisada. Cada visionado revela nuevas capas de significado y detalles que enriquecen la experiencia. Es cine en estado puro: entretenido, provocador y profundamente humano.

**Calificación: 5/5 estrellas**

Una obra imprescindible que demuestra que el cine comercial puede ser también artísticamente ambicioso y socialmente relevante.
    `,
    rating: 5,
    category: "movie",
    author: "Bong Joon-ho",
    publishDate: "2019-05-21",
    tags: ["cine", "drama", "thriller", "sátira social"],
  },
]

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((review) => review.slug === slug)
}

export function getReviewById(id: string): Review | undefined {
  return reviews.find((review) => review.id === id)
}

export function getAllReviews(): Review[] {
  return reviews
}

export function getBookReviews(): Review[] {
  return reviews.filter((review) => review.category === "book")
}

export function getMovieReviews(): Review[] {
  return reviews.filter((review) => review.category === "movie")
}
