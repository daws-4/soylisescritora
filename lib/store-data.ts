export type Product = {
  id: string
  title: string
  slug: string
  coverImage: string
  price: number
  description: string
  longDescription: string
  author: string
  publishDate: string
  pages: number
  isbn: string
  inStock: boolean
  featured: boolean
  category: "book" | "ebook" | "merchandise"
}

export const products: Product[] = [
  {
    id: "1",
    title: "Sentimientos Sangrientos",
    slug: "sentimientos-sangrientos",
    coverImage: "/placeholder.svg?height=400&width=300&text=Sentimientos+Sangrientos",
    price: 19.99,
    description: "La obra maestra de Lis Samarah que explora las profundidades del alma humana.",
    longDescription: `
# Sentimientos Sangrientos

*Por Lis Samarah*

"Sentimientos Sangrientos" es la aclamada primera novela de Lis Samarah, una exploración profunda y conmovedora de las emociones humanas más intensas.

## Sinopsis

En un pequeño pueblo costero, Isabel, una joven con un pasado traumático, intenta reconstruir su vida tras una pérdida devastadora. Su camino se cruza con el de Adrián, un enigmático artista que esconde sus propios demonios. Juntos emprenderán un viaje emocional que les llevará a enfrentarse a sus miedos más profundos y a descubrir que, a veces, el amor puede surgir de las heridas más dolorosas.

Con una prosa poética y personajes de gran complejidad psicológica, Lis Samarah teje una historia donde el dolor y la esperanza se entrelazan, creando un tapiz emocional que resonará en el lector mucho después de haber terminado la última página.

## Críticas

"Una primera novela sorprendente que anuncia la llegada de una voz única en la literatura contemporánea." - El País

"Samarah escribe con la precisión de un cirujano y la sensibilidad de un poeta. 'Sentimientos Sangrientos' es una experiencia literaria que no se debe perder." - Revista Letras

"Una exploración valiente y honesta de las heridas emocionales y el poder curativo del amor y el arte." - La Vanguardia

Esta edición incluye un epílogo exclusivo escrito por la autora, donde reflexiona sobre el proceso creativo y las inspiraciones detrás de la novela.
    `,
    author: "Lis Samarah",
    publishDate: "2018-06-15",
    pages: 324,
    isbn: "978-8412345678",
    inStock: true,
    featured: true,
    category: "book",
  },
  {
    id: "2",
    title: "Ecos del Silencio",
    slug: "ecos-del-silencio",
    coverImage: "/placeholder.svg?height=400&width=300&text=Ecos+del+Silencio",
    price: 21.5,
    description: "La esperada segunda novela de Lis Samarah que explora los secretos familiares y la redención.",
    longDescription: `
# Ecos del Silencio

*Por Lis Samarah*

Tras el éxito de "Sentimientos Sangrientos", Lis Samarah regresa con una novela aún más ambiciosa que confirma su talento como narradora.

## Sinopsis

En una antigua casa solariega en las afueras de Madrid, tres generaciones de mujeres se reúnen tras la muerte de la matriarca de la familia. Lo que comienza como un encuentro para gestionar la herencia se convierte en un viaje al pasado cuando descubren un diario oculto que revela secretos familiares largamente enterrados.

A través de saltos temporales entre el presente y la España de posguerra, Samarah construye un relato coral donde cada personaje debe enfrentarse a las consecuencias del silencio y los secretos. Una historia sobre la memoria histórica, los lazos familiares y la posibilidad de sanar heridas que parecían imposibles de cerrar.

## Críticas

"Una novela ambiciosa y conmovedora que consolida a Samarah como una de las voces más interesantes de la literatura española actual." - ABC Cultural

"'Ecos del Silencio' confirma el talento de Samarah para crear personajes femeninos complejos y auténticos. Una lectura absorbente y emocionalmente resonante." - El Mundo

"Con una estructura narrativa sofisticada y una sensibilidad extraordinaria, Samarah entreteje lo personal y lo histórico en una novela que es a la vez íntima y universal." - Revista Qué Leer

Incluye un apéndice con documentación histórica y fotografías que complementan la experiencia de lectura.
    `,
    author: "Lis Samarah",
    publishDate: "2021-03-22",
    pages: 412,
    isbn: "978-8412345685",
    inStock: true,
    featured: true,
    category: "book",
  },
  {
    id: "3",
    title: "Sentimientos Sangrientos (E-book)",
    slug: "sentimientos-sangrientos-ebook",
    coverImage: "/placeholder.svg?height=400&width=300&text=Sentimientos+Sangrientos+Ebook",
    price: 9.99,
    description: "Versión digital de la aclamada primera novela de Lis Samarah.",
    longDescription: `
# Sentimientos Sangrientos (E-book)

*Por Lis Samarah*

La versión digital de la aclamada primera novela de Lis Samarah, una exploración profunda y conmovedora de las emociones humanas más intensas.

## Sinopsis

En un pequeño pueblo costero, Isabel, una joven con un pasado traumático, intenta reconstruir su vida tras una pérdida devastadora. Su camino se cruza con el de Adrián, un enigmático artista que esconde sus propios demonios. Juntos emprenderán un viaje emocional que les llevará a enfrentarse a sus miedos más profundos y a descubrir que, a veces, el amor puede surgir de las heridas más dolorosas.

Con una prosa poética y personajes de gran complejidad psicológica, Lis Samarah teje una historia donde el dolor y la esperanza se entrelazan, creando un tapiz emocional que resonará en el lector mucho después de haber terminado la última página.

## Características de la edición digital

- Formato optimizado para todos los dispositivos de lectura
- Incluye enlaces a contenido exclusivo
- Tipografía ajustable
- Marcadores y notas
- Actualización gratuita con contenido adicional

Esta edición incluye un epílogo exclusivo escrito por la autora, donde reflexiona sobre el proceso creativo y las inspiraciones detrás de la novela.
    `,
    author: "Lis Samarah",
    publishDate: "2018-06-15",
    pages: 324,
    isbn: "978-8412345678-e",
    inStock: true,
    featured: false,
    category: "ebook",
  },
  {
    id: "4",
    title: "Tote Bag - Sentimientos Sangrientos",
    slug: "tote-bag-sentimientos-sangrientos",
    coverImage: "/placeholder.svg?height=400&width=300&text=Tote+Bag",
    price: 15.0,
    description: 'Bolsa de tela con diseño inspirado en la novela "Sentimientos Sangrientos".',
    longDescription: `
# Tote Bag - Sentimientos Sangrientos

Lleva contigo la esencia de la aclamada novela de Lis Samarah con esta exclusiva bolsa de tela.

## Características

- Material: 100% algodón orgánico
- Dimensiones: 38 x 42 cm
- Asas largas para llevar cómodamente al hombro
- Diseño exclusivo inspirado en la portada de "Sentimientos Sangrientos"
- Impresión de alta calidad que mantiene los colores vivos incluso después de múltiples lavados
- Producción ética y sostenible

## Cuidados

- Lavar a máquina a 30°C
- No usar lejía
- No secar en secadora
- Planchar a temperatura media

El complemento perfecto para los amantes de la literatura y seguidores de la obra de Lis Samarah. Una pieza única que combina funcionalidad y estilo, ideal para llevar tus libros o para el uso diario.

Producto oficial de Lis Samarah. Cada compra apoya directamente a la autora.
    `,
    author: "Lis Samarah",
    publishDate: "2022-01-10",
    pages: 0,
    isbn: "",
    inStock: true,
    featured: false,
    category: "merchandise",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getAllProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getBookProducts(): Product[] {
  return products.filter((product) => product.category === "book")
}

export function getEbookProducts(): Product[] {
  return products.filter((product) => product.category === "ebook")
}

export function getMerchandiseProducts(): Product[] {
  return products.filter((product) => product.category === "merchandise")
}
