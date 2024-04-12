import React, { useState } from 'react';
import '../../assets/styles/styles.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  return (
    <div className="landing-page">
      <header className="bg-blue-500 p-4">
        <h1 className="text-white text-3xl font-bold">Bienvenido al Parqueadero XYZ</h1>
        <br/>
        <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100" onClick={handleLoginClick}>Iniciar Sesión</button>
      </header>
      
      <main className="p-4">
        <section id="servicios" className="mt-8">
          <h2 className="text-2xl font-bold">Nuestros Servicios</h2>
          <p>Ofrecemos servicios de estacionamiento seguro las 24 horas del día, los 7 días de la semana.</p>
        </section>
        
        <section id="tarifas" className="mt-8">
          <h2 className="text-2xl font-bold">Tarifas</h2>
          <p>Nuestras tarifas son competitivas y adaptadas a tus necesidades. Contáctanos para obtener más información.</p>
        </section>
        
        <section id="ubicacion" className="mt-8">
          <h2 className="text-2xl font-bold">Ubicación</h2>
          <p>Estamos ubicados en una zona céntrica, de fácil acceso. Ven y visítanos.</p>
        </section>
      </main>

      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Usuario:</label>
                <input type="text" id="username" name="username" className="border border-gray-300 rounded px-4 py-2 w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" className="border border-gray-300 rounded px-4 py-2 w-full" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Iniciar Sesión</button>
              </div>
            </form>
            <button className="absolute top-4 right-4 text-gray-500" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
