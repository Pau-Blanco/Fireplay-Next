export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Título principal */}
      <h1 className="flex items-center justify-center text-5xl font-bold m-10 tracking-widest">
        !BIENVENIDO A FIREPLAY!
      </h1>

      <p className="flex items-center justify-center text-red-600 font-bold">PONER CARROUSEL AQUI</p>

      {/* Sección "¿Qué es Fireplay?" */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 rounded-lg shadow-lg my-16">
        <h3 className="text-4xl font-bold text-blue-600 mb-6">¿Qué es Fireplay?</h3>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Fireplay es la plataforma definitiva para disfrutar de tus juegos favoritos. Con una interfaz moderna y un acceso rápido a los títulos más populares,
          estamos cambiando la forma en que juegas. ¡Únete a la comunidad hoy mismo!
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="#enlace1"
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Más información
          </a>
          <a
            href="#enlace2"
            className="px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-md border border-blue-600 hover:bg-blue-50 transition"
          >
            Ver juegos
          </a>
        </div>
      </section>

      {/* Sección "Cómo funciona" */}
      <section className="text-center my-16">
        <h3 className="text-3xl font-semibold mb-8">¿Cómo funciona?</h3>
        <div className="flex flex-wrap justify-center gap-6 text-black mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-80">
            <h4 className="text-2xl font-semibold mb-2">1. Regístrate</h4>
            <p className="text-lg">Crea una cuenta en Fireplay para acceder a todos los beneficios.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-80">
            <h4 className="text-2xl font-semibold mb-2">2. Explora los juegos</h4>
            <p className="text-lg">Descubre una amplia selección de juegos listos para jugar.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-80">
            <h4 className="text-2xl font-semibold mb-2">3. Disfruta</h4>
            <p className="text-lg">Juega y compite con otros usuarios de la comunidad.</p>
          </div>
        </div>
        <a
          href="/games"
          className="px-8 py-3 bg-blue-600 text-white font-bold text-xl rounded-lg hover:bg-blue-700 transition"
        >
          Jugar ahora
        </a>
      </section>
    </div>
  );
}
