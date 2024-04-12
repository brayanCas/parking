import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookings = () => {
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const availableSpaces = spaces.filter(space => space.available === true);
  const [selectedSpaceId, setSelectedSpaceId] = useState('');
  const [formData, setFormData] = useState({
    userId: '',
    vehicleId: '',
    spaceId: '',
    dateStart: '',
    dateEnd: '',
    minuteValue:''
  });
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    
    setInputValue(e.target.value);
  };
  
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

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      console.log('usuarios 1',data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpaces = async () => {
    try {
      const response = await fetch('http://localhost:3000/spaces');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
    
      const dataSpaces = await response.json();
      console.log('dataSpaces',dataSpaces);
      setSpaces(dataSpaces);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookings= async () => {
    try {
      const response = await fetch('http://localhost:3000/bookings');
      if (!response.ok) {
        throw new Error('Error al obtener reservas');
      }
      
      const dataBookings = await response.json();
    // Combina la información de las reservas con la información de los vehículos, usuarios y espacios

    const bookingsWithDetails = dataBookings.map(booking => {     
      const vehicle = vehicles.find(vehicle => vehicle._id === booking.vehicleId);
      const user = users.find(user => user._id === vehicle.userId);
      const space = spaces.find(space => space._id === booking.spaceId);     
      return { ...booking, vehicle, user, space };
    });
    setBookings(bookingsWithDetails);
      console.log('reservas',bookingsWithDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchVehicles();
        await fetchUsers();
        await fetchSpaces();
        await fetchBookings();
    
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  
  
  
  const searchVehiclebyPlate = (event) => {
    event.preventDefault();    
    const vehicle = vehicles.find(vehicle => vehicle.plate === formData.plate);
    if (vehicle) {      
      const user = users.find(user => user._id === vehicle.userId);
      if (user) {
        setSearchResult({ vehicle, user });
      }
    }
  };

  const handleSpaceChange = (event) => {
    setSelectedSpaceId(event.target.value); // Asigna el ID del espacio seleccionado
  };
  

  const handleReservation = async () => {
    try {   
      
      const currentDate = new Date();
      const userId = searchResult.user._id;
      const vehicleId = searchResult.vehicle._id;
      const spaceId = selectedSpaceId.toString();
      const dateStart = currentDate;
      const dateEnd = currentDate;
      const minuteValue = parseFloat(inputValue);
  
      // Crea la reserva en el servidor
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, vehicleId, spaceId,dateStart, dateEnd, minuteValue })
      });  
  
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }

      const responseSpace = await fetch(`http://localhost:3000/spaces/${spaceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ available: false })
    });
    if (!responseSpace.ok) {
      toast.error('Error al actualizar espacio');
      throw new Error('Error al actualizar disponibilidad del espacio');
    }
  
    await Promise.all([fetchUsers(), fetchVehicles(), fetchSpaces(), fetchBookings()]);
    setSearchResult(null);

      // Muestra un mensaje de éxito
      toast.success('Reserva creada exitosamente');  
  
    } catch (error) {  
      toast.error('Error al crear la reserva');
    }
  };
  
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };

  return (
 
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4 mt-9">Gestionar Reservas</h1>
        <hr className="border-b-2 mb-6" />
        <div className="flex flex-wrap justify-center">
            {[0, 1, 2].map((row) => (
              <div key={row} style={{ display: 'flex' }}>
                {[0, 1, 2].map((col) => {
                  const spaceIndex = row * 3 + col;
                  const space = spaces[spaceIndex];
                  const isAvailable = space && space.available;
  
                  return (
                    <div key={col} style={{ margin: '5px' }}>
                      <p>Espacio: {spaceIndex + 1}</p>
                      {isAvailable ? (
                        <div>
                          <img src="src\assets\imgs\green_car.jpg" alt="Green Car Icon" style={{ width: '50px', height: '50px' }}/>
                          <label style={{ color: 'green' }}>Libre</label>
                        </div>
                      ) : (
                        <div>
                          <img src="src\assets\imgs\red_car.jpg" alt="Red Car Icon"style={{ width: '50px', height: '50px' }} />
                          <label style={{ color: 'red' }}>Ocupado</label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}           
          </div>  
          <br/>   
          <div class="flex justify-center">
 
                <div class="flex flex-grow border rounded-lg p-4 mr-4 bg-white max-w-sm">
                  <div class="max-w-md mx-auto mt-5">
                    <h1 class="text-4xl font-bold mb-4 mt-9">{isEditing ? 'Editar Vehículo' : 'Registrar'}</h1>
                    <form onSubmit={searchVehiclebyPlate} class="space-y-4">
                    <div>
                      <label for="plate" class="block">Placa:</label>
                      <input type="text" id="plate" name="plate" value={formData.plate} onChange={(event) => setFormData({ ...formData, plate: event.target.value })} class="border border-gray-300 rounded px-3 py-2 w-full" />
                    </div>                    
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buscar</button>
                  </form>
                  </div>
                </div>
                </div>
              
                  <h1 class="text-4xl font-bold mb-4 mt-9">Datos del vehiculo</h1>
                  {searchResult && (
        <table className="table-auto bg-gray-100 rounded-lg overflow-hidden mt-2 w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-500 text-white">Placa</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Modelo</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Color</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Propietario</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Correo</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Ubicacion</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Valor minuto</th>
              <th className="px-4 py-2 bg-blue-500 text-white">Acciones</th> 
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-100">
              <td className="px-4 py-2">{searchResult.vehicle.plate}</td>
              <td className="px-4 py-2">{searchResult.vehicle.model}</td>
              <td className="px-4 py-2">{searchResult.vehicle.color}</td>
              <td className="px-4 py-2">{searchResult.user.name} {searchResult.user.lastName}</td>
              <td className="px-4 py-2">{searchResult.user.email}</td>
              <td className="px-4 py-2">
                  <select value={selectedSpaceId} onChange={handleSpaceChange}>
                    <option value="">Selecciona un espacio disponible</option>
                    {availableSpaces.map(space => (
                      <option key={space._id} value={space._id}>Parqueadero {space.number}</option>
                    ))}
                  </select>
                </td>
              <td>
              <input type="number" value={inputValue} onChange={handleInputChange} />
              </td>
              <td className="px-4 py-2">                             
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleReservation}>Reservar</button>               
              </td>
            </tr>
          </tbody>
        </table>
        
      )}
 <br/>
 <h1 class="text-4xl font-bold mb-4 mt-9">Reservas</h1>
 {bookings.length > 0 ? (
  <table className="table-auto bg-gray-100 rounded-lg overflow-hidden mt-2 w-full">
    <thead>
      <tr>
        <th className="px-4 py-2 bg-blue-500 text-white">Placa</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Modelo</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Color</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Propietario</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Correo</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Ubicacion</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Valor Minuto</th>
        <th className="px-4 py-2 bg-blue-500 text-white">Fecha Reserva</th> 
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking, index) => (
        <tr key={index} className="hover:bg-blue-100">
          <td className="px-4 py-2">{vehicles.find(vehicle => vehicle._id === booking.vehicleId)?.plate}</td>
          <td className="px-4 py-2">{vehicles.find(vehicle => vehicle._id === booking.vehicleId)?.model}</td>
          <td className="px-4 py-2">{vehicles.find(vehicle => vehicle._id === booking.vehicleId)?.color}</td>                    
          <td className="px-4 py-2">{booking.user?.name} {booking.user?.lastName}</td>
          <td className="px-4 py-2">{booking.user?.email}</td>
          <td className="px-4 py-2">Parqueadero {spaces.find(space => space._id === booking.spaceId)?.number}</td>
          <td>{booking.minuteValue}</td>
          <td className="px-4 py-2">{formatDate(booking.dateStart)}</td>
        </tr>
      ))}
    </tbody>
  </table> 
) : (
  <p>Cargando...</p>
)}


      </div>
  
  );
  
};

export default Bookings;
