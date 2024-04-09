import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    rol: ''
  });
  const [editingUserId, setEditingUserId] = useState(null);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {     
      console.log('Datos del formulario:', formData);
      if (isEditing) {
        // Realizar la actualización del usuario
        const response = await fetch(`http://localhost:3000/users/${editingUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Error al editar usuario');
        }

        toast.success('Usuario editado exitosamente');
      } else {
        // Realizar la creación del usuario
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Error al crear usuario');
        }
        toast.success('Usuario creado exitosamente');
      }

      // Limpiar el formulario después de enviar
      setFormData({
        name: '',
        lastName: '',
        email: '',
        rol: ''
      });
      
      fetchUsers();
    } catch (error) {
      toast.error('Error al registrar el usuario');
      console.error('Error al crear usuario', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleDelete = async (userId) => {
    try {     
      const confirmDelete = window.confirm('¿Estás seguro de que quieres borrar este usuario?');
      if (!confirmDelete) {
        return; 
      }
  
      // Realizar la eliminación del usuario
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al borrar usuario');
      }
  
      // Actualizar la lista de usuarios después de borrar
      fetchUsers();
      toast.success('Usuario borrado exitosamente');
    } catch (error) {
      toast.error('Error al borrar usuario');
      console.error('Error al borrar usuario', error);
    }
  };

  const handleEdit = (userId) => {
    // Buscar el usuario por su ID
    const userToEdit = users.find(user => user._id === userId);
    if (userToEdit) {
      // Establecer los datos del usuario en el formulario
      setFormData({
        name: userToEdit.name,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        rol: userToEdit.rol
      });
      // Establecer el ID del usuario y la bandera de edición
      setEditingUserId(userId);
      setIsEditing(true);
    }
  };

  return (    
<div className="min-h-screen flex flex-col">
  <div className="flex-grow bg-gradient-to-r p-8">
    <h1 className="text-4xl font-bold mb-4 mt-9">Gestionar usuarios</h1>
    <hr className="border-b-2 mb-6" />

   <div className="flex justify-center"> {/* Usamos flexbox para centrar el contenido */}
    <div className="flex-grow border rounded-lg p-4 mr-4 bg-white max-w-sm"> 
      <div className="max-w-md mx-auto mt-5">
      <h1 className="text-4xl font-bold mb-4 mt-9">{isEditing ? 'Editar Usuario' : 'Registrar'}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block">Nombre:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label htmlFor="lastName" className="block">Apellido:</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block">Correo electrónico:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label htmlFor="rol" className="block">Rol:</label>
              <select id="rol" name="rol" value={formData.rol} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full">
                <option value="">Selecciona un rol</option> 
                <option value="Cliente">Cliente</option>
                <option value="Administrador">Administrador</option>
                <option value="Empleado">Empleado</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{isEditing ? 'Guardar Cambios' : 'Crear Usuario'}</button>
          </form>
        </div>
      </div>
    </div>
    <div>
  <h1 className="text-2xl font-bold mb-4 mt-6">Lista de Usuarios</h1>
  <table className="table-auto bg-gray-100 rounded-lg overflow-hidden mt-2 w-full">
    <thead>
      <tr>
        <th className="px-4 py-2 bg-blue-500 text-white">Nombre</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Apellido</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Correo electrónico</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Rol</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Acciones</th> {/* Nueva columna para acciones */}
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user._id} className="hover:bg-blue-100">
          <td className="px-4 py-2">{user.name}</td>
          <td className="px-4 py-2">{user.lastName}</td>
          <td className="px-4 py-2">{user.email}</td>
          <td className="px-4 py-2">{user.rol}</td>
          <td className="px-4 py-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600" onClick={() => handleDelete(user._id)}>Borrar</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleEdit(user._id)}>Editar</button>               
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

export default Users;
