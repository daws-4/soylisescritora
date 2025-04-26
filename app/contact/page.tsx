"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    // Simulamos el envío del formulario
    try {
      // En un caso real, aquí iría la llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-rose-900 to-rose-700">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Contacto</h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-rose-50 p-6 rounded-lg text-center">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-rose-700" />
              </div>
              <h3 className="font-bold mb-2 text-rose-800 ">Email</h3>
              <p className="text-gray-700">contacto@lissamarah.com</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg text-center">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-rose-700" />
              </div>
              <h3 className="font-bold mb-2 text-rose-800">Teléfono</h3>
              <p className="text-gray-700">+34 612 345 678</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg text-center">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-rose-700" />
              </div>
              <h3 className="font-bold mb-2 text-rose-800">Ubicación</h3>
              <p className="text-gray-700">Madrid, España</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-rose-900">Envíanos un mensaje</h2>

            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p>¡Mensaje enviado con éxito! Nos pondremos en contacto contigo lo antes posible.</p>
              </div>
            )}

            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo <span className="text-rose-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-rose-700">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto <span className="text-rose-700">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="general">Consulta general</option>
                  <option value="books">Información sobre libros</option>
                  <option value="events">Eventos y firmas</option>
                  <option value="collaboration">Propuesta de colaboración</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje <span className="text-rose-700">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-rose-700 text-white rounded-md hover:bg-rose-800 transition-colors flex items-center gap-2 mx-auto ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-rose-900">Preguntas frecuentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-rose-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-rose-800">¿Cómo puedo conseguir un libro firmado?</h3>
              <p className="text-gray-700">
                Lis Samarah realiza regularmente eventos de firma de libros. Puedes consultar la sección de eventos para
                conocer las próximas fechas. También es posible solicitar un ejemplar firmado a través de la tienda
                online.
              </p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-rose-800">¿Realiza Lis Samarah envíos internacionales?</h3>
              <p className="text-gray-700">
                Sí, realizamos envíos a Europa y América. Los costes y tiempos de envío varían según el destino. Puedes
                consultar más información en la sección de envíos de nuestra tienda.
              </p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-rose-800">¿Cómo puedo solicitar una entrevista o colaboración?</h3>
              <p className="text-gray-700">
                Para solicitudes de entrevistas, colaboraciones o apariciones en medios, por favor utiliza el formulario
                de contacto seleccionando "Propuesta de colaboración" en el asunto. Nuestro equipo se pondrá en contacto
                contigo lo antes posible.
              </p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-rose-800">¿Cuándo se publicará el próximo libro de Lis Samarah?</h3>
              <p className="text-gray-700">
                Las fechas de lanzamiento de nuevos libros se anuncian en nuestra página principal y en las redes
                sociales. Suscríbete a nuestro boletín para ser el primero en enterarte de las novedades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
