"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Gamepad2, Users, Zap, ChevronRight, Sparkles } from "lucide-react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background effect */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-5"></div>

        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  repeatDelay: 5,
                }}
                className="relative"
              >
                <Sparkles className="text-blue-500 absolute -top-6 -right-6 h-8 w-8" />
              </motion.div>
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                FIREPLAY
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              La nueva generación de plataformas de juegos. Más rápida. Más social. Más inmersiva.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/games"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-300/50 hover:shadow-blue-400/50 transition-all"
              >
                Jugar ahora <Zap className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/games"
                className="px-8 py-4 bg-white border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-md"
              >
                Explorar juegos
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* ¿Qué es Fireplay? Section */}
      <section id="que-es" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative bg-gradient-to-br from-white to-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                ¿Qué es Fireplay?
              </h2>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                Fireplay es la plataforma definitiva para disfrutar de tus juegos favoritos. Con una interfaz moderna y
                un acceso rápido a los títulos más populares, estamos redefiniendo la experiencia de juego. Únete a
                miles de jugadores y descubre un nuevo mundo de posibilidades.
              </p>

              <div className="flex flex-wrap gap-6 mt-10">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-gray-100 shadow-md"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Gamepad2 className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-medium">+500 juegos</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-gray-100 shadow-md"
                >
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="font-medium">Comunidad activa</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-gray-100 shadow-md"
                >
                  <div className="bg-pink-100 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-pink-500" />
                  </div>
                  <span className="font-medium">Rendimiento optimizado</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cómo funciona Section */}
      <section id="como-funciona" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Comienza tu aventura en Fireplay en tres simples pasos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Regístrate",
                description: "Crea una cuenta en Fireplay para acceder a todos los beneficios exclusivos.",
                color: "from-blue-400 to-blue-600",
                bgColor: "bg-blue-50",
                delay: 0.2,
              },
              {
                step: "2",
                title: "Explora los juegos",
                description: "Descubre una amplia selección de juegos listos para jugar en cualquier dispositivo.",
                color: "from-purple-400 to-purple-600",
                bgColor: "bg-purple-50",
                delay: 0.4,
              },
              {
                step: "3",
                title: "Disfruta",
                description: "Juega y compite con otros usuarios de la comunidad global de Fireplay.",
                color: "from-pink-400 to-pink-600",
                bgColor: "bg-pink-50",
                delay: 0.6,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative ${item.bgColor} rounded-2xl border border-gray-100 overflow-hidden group shadow-lg`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                <div className="p-8">
                  <div
                    className={`w-12 h-12 mb-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-xl font-bold text-white mx-auto`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/games"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-300/30 hover:shadow-blue-400/50 transition-all"
            >
              Comenzar ahora <ChevronRight className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}
