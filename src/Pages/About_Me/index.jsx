import { useState } from 'react';
import { FaReact, FaAngular, FaDatabase, FaServer, FaDotCircle } from 'react-icons/fa'

const Modal = ({ tecnologia, experiencia, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">{tecnologia}</h3>
        <p className="mb-2"><strong>Experiencia:</strong> {experiencia}</p>         
        <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cerrar
          </button>
      </div>
    </div>
  );
};

export default function About_Me() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tecnologiaSeleccionada, setTecnologiaSeleccionada] = useState({});

  const openModal = (tecnologia, experiencia) => {
    setTecnologiaSeleccionada({ tecnologia, experiencia });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-9">
     
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Perfil Profesional</h2>
        <p className="text-lg">
          Desarrollador de software apasionado con experiencia en el desarrollo web y backend.
          Me encanta trabajar en proyectos desafiantes y aprender nuevas tecnologías.
        </p>
      </section>      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tecnologías</h2>
        <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Tecnología</th>
                      <th className="px-4 py-2">Experiencia</th>
                      <th className="px-4 py-2">Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">
                        <FaReact className="mr-2 text-blue-500" /> React
                      </td>
                      <td className="border px-4 py-2">Principiante</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => openModal('React', 'Conocimientos en creación de páginas web React, manejo de Tailwind, hooks y componentes.')} 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Abrir
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <FaAngular className="mr-2 text-red-500" /> Angular
                      </td>
                      <td className="border px-4 py-2">Intermedio</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => openModal('Angular', 'Manejo y creación de componentes, creación de páginas web y PWA, manejo de indexedDB, autenticación por TOKEN')} 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Abrir
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <FaDotCircle className="mr-2 text-yellow-500" /> C# .NET
                      </td>
                      <td className="border px-4 py-2">Avanzado</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => openModal('C# .NET', 'Creación e implementación de software empresarial usando arquitectura limpia DDD y TDD')} 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Abrir
                        </button>
                      </td>
                    </tr>  
                    <tr>
                      <td className="border px-4 py-2">
                        <FaServer className="mr-2 text-green-500" /> SQL SERVER
                      </td>
                      <td className="border px-4 py-2">Avanzado</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => openModal('SQL SERVER', 'Creación e implementación de bases de datos relacionales procedimientos almacenados, funciones y triggers')} 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Abrir
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <FaDatabase className="mr-2 text-yellow-500" /> MONGO DB
                      </td>
                      <td className="border px-4 py-2">Avanzado</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => openModal('MONGO DB', 'Implementación de colecciones y estructuras como modelos no relacionales')} 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Abrir
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Experiencias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experiencia Profesional */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Desarrollador de software en SoftwareOne</h3>
            <p className="text-sm text-gray-700">
              Construir Analizar e implementar desarrollos a la medida usando ultimas tecnologias con C# .NET CORE y Angular,
              bajo implementaciones de arquitecturas limpias.
            </p>
          </div>

          {/* Experiencia Académica */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ingeniero de Software</h3>
            <p className="text-sm text-gray-700">
              Durante mis estudios universitarios, me enfoqué en el desarrollo de software y completé cursos avanzados
              en algoritmos, estructuras de datos y programación orientada a objetos.
            </p>
          </div>
        </div>
      </section>

      {/* Renderizar el modal si está abierto */}
      {modalOpen && (
        <Modal
          tecnologia={tecnologiaSeleccionada.tecnologia}
          experiencia={tecnologiaSeleccionada.experiencia}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
