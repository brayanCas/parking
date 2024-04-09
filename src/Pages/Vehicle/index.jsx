import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    plate: '',
    brand: '',
    model: '',
    color: '',
    userId: ''
  });
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:3000/vehicles');
      if (!response.ok) {
        throw new Error('Error al obtener vehículos');
      }
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Datos del formulario:', formData);
      if (isEditing) {
        // Realizar la actualización del vehículo
        const response = await fetch(`http://localhost:3000/vehicles/${editingVehicleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Error al editar vehículo');
        }

        toast.success('Vehículo editado exitosamente');
      } else {
        // Realizar la creación del vehículo
        const response = await fetch('http://localhost:3000/vehicles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Error al crear vehículo');
        }
        toast.success('Vehículo creado exitosamente');
      }

      // Limpiar el formulario después de enviar
      setFormData({
        plate: '',
        brand: '',
        model: '',
        color: '',
        userId: ''
      });

      fetchVehicles();
    } catch (error) {
      toast.error('Error al registrar el vehículo');
      console.error('Error al crear vehículo', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (vehicleId) => {
    try {
      const confirmDelete = window.confirm('¿Estás seguro de que quieres borrar este vehículo?');
      if (!confirmDelete) {
        return;
      }

      // Realizar la eliminación del vehículo
      const response = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al borrar vehículo');
      }

      // Actualizar la lista de vehículos después de borrar
      fetchVehicles();
      toast.success('Vehículo borrado exitosamente');
    } catch (error) {
      toast.error('Error al borrar vehículo');
      console.error('Error al borrar vehículo', error);
    }
  };

  const handleEdit = (vehicleId) => {
    // Buscar el vehículo por su ID
    const vehicleToEdit = vehicles.find(vehicle => vehicle._id === vehicleId);
    if (vehicleToEdit) {
      // Establecer los datos del vehículo en el formulario
      setFormData({
        plate: vehicleToEdit.plate,
        brand: vehicleToEdit.brand,
        model: vehicleToEdit.model,
        color: vehicleToEdit.color,
        userId: vehicleToEdit.userId
      });
      // Establecer el ID del vehículo y la bandera de edición
      setEditingVehicleId(vehicleId);
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-r p-8">
        <h1 className="text-4xl font-bold mb-4 mt-9">Gestionar vehículos</h1>
        <hr className="border-b-2 mb-6" />

        <div className="flex justify-center">
          <div className="flex-grow border rounded-lg p-4 mr-4 bg-white max-w-sm">
            <div className="max-w-md mx-auto mt-5">
              <h1 className="text-4xl font-bold mb-4 mt-9">{isEditing ? 'Editar Vehículo' : 'Registrar'}</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="plate" className="block">Placa:</label>
                  <input type="text" id="plate" name="plate" value={formData.plate} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <div>
                  <label htmlFor="brand" className="block">Marca:</label>
                  <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <div>
                  <label htmlFor="model" className="block">Modelo:</label>
                  <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <div>
                  <label htmlFor="color" className="block">Color:</label>
                  <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <div>
                  <label htmlFor="userId" className="block">Propietario:</label>
                  <select id="userId" name="userId" value={formData.userId} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full">
                    <option value="">Selecciona un usuario</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle._id} value={vehicle.userId}>{vehicle.userId}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{isEditing ? 'Guardar Cambios' : 'Crear Vehículo'}</button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4 mt-6">Lista de Vehículos</h1>
          <table className="table-auto bg-gray-100 rounded-lg overflow-hidden mt-2 w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-blue-500 text-white">Placa</th>
                <th className="px-4 py-2 bg-blue-500 text-white">Marca</th>
                <th className="px-4 py-2 bg-blue-500 text-white">Modelo</th>
                <th className="px-4 py-2 bg-blue-500 text-white">Color</th>
                <th className="px-4 py-2 bg-blue-500 text-white">Propietario</th>
                <th className="px-4 py-2 bg-blue-500 text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle._id} className="hover:bg-blue-100">
                  <td className="px-4 py-2">{vehicle.plate}</td>
                  <td className="px-4 py-2">{vehicle.brand}</td>
                  <td className="px-4 py-2">{vehicle.model}</td>
                  <td className="px-4 py-2">{vehicle.color}</td>
                  <td className="px-4 py-2">{vehicle.userId}</td>
                  <td className="px-4 py-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600" onClick={() => handleDelete(vehicle._id)}>Borrar</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleEdit(vehicle._id)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
