import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckIn = () => {
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const availableSpaces = spaces.filter(space => space.available === true);
  const [selectedSpaceId, setSelectedSpaceId] = useState('');
  const [totalToPay, setTotalToPay] = useState(0);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
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
        const booking = bookings.find(booking =>booking.userId === user._id);
        const space = spaces.find(space =>space._id === booking.spaceId);
        setSearchResult({ vehicle, user ,booking,space});
        const currentDate = new Date();
        const dateStartString = booking.dateStart;
        
        // Verifica si la cadena tiene el formato de fecha adecuado
        const dateStartRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        if (!dateStartRegex.test(dateStartString)) {
          console.error('El formato de fecha no es válido:', dateStartString);
          return;
        }
        
        // Crea el objeto de fecha si la cadena tiene el formato correcto
        const initDate = new Date(dateStartString);
        
        // Calcula la diferencia en milisegundos
        const differenceInMillis = currentDate.getTime() - initDate.getTime();
        
        // Convierte la diferencia a minutos
        const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
        
        console.log('Diferencia en minutos:', differenceInMinutes);
        
        const totalToPay = differenceInMinutes * booking.minuteValue;
        setTotalToPay(totalToPay);
        setShowInvoiceForm(true);        
      }
    }
  };


  const handleBuy = async () => {
    try {      

      const spaceId = searchResult.space._id;
      
      // Crea la reserva en el servidor     
      const responseSpace = await fetch(`http://localhost:3000/spaces/${spaceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ available: true })
    });
    if (!responseSpace.ok) {
      toast.error('Error al actualizar espacio');
      throw new Error('Error al actualizar disponibilidad del espacio');
    }   
    setShowInvoiceForm(null);
    setSearchResult(null);
    await Promise.all([fetchUsers(), fetchVehicles(), fetchSpaces(), fetchBookings()]);
      // Muestra un mensaje de éxito
      toast.success('Pago realizado  exitosamente');  
  
    } catch (error) {  
      console.log('error',error);
      toast.error('Error al realizar pago');
    }
  };

  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };

  return (
 
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4 mt-9">Facturación</h1>
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
                    <h1 class="text-4xl font-bold mb-4 mt-9">Facturar Vehiculo</h1>
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
                <br/>
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
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-100">
              <td className="px-4 py-2">{searchResult.vehicle?.plate}</td>
              <td className="px-4 py-2">{searchResult.vehicle?.model}</td>
              <td className="px-4 py-2">{searchResult.vehicle?.color}</td>
              <td className="px-4 py-2">{searchResult.user?.name} {searchResult.user.lastName}</td>
              <td className="px-4 py-2">{searchResult.user?.email}</td>
              <td className="px-4 py-2">Parqueadero {searchResult?.space?.number}</td>              
              <td className="px-4 py-2"> ${searchResult?.booking?.minuteValue}</td> 
            </tr>
          </tbody>
        </table>
        
      )}
 <br/> 
 {showInvoiceForm && (
  <div>
    <h1 className="text-4xl font-bold mb-4 mt-9">Factura</h1>
    <form className="bg-gray-100 rounded-lg overflow-hidden mt-2 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="plate" className="block text-gray-700 font-bold mb-2">Placa:</label>
          <input type="text" id="plate" name="plate" value={searchResult?.vehicle?.plate} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="model" className="block text-gray-700 font-bold mb-2">Modelo:</label>
          <input type="text" id="model" name="model" value={searchResult?.vehicle?.model} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="color" className="block text-gray-700 font-bold mb-2">Color:</label>
          <input type="text" id="color" name="color" value={searchResult?.vehicle?.color} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="owner" className="block text-gray-700 font-bold mb-2">Propietario:</label>
          <input type="text" id="owner" name="owner" value={`${searchResult.user.name} ${searchResult.user.lastName}`} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo:</label>
          <input type="text" id="email" name="email" value={searchResult.user.email} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Ubicación:</label>
          <input type="text" id="location" name="location" value={`Parqueadero ${searchResult.space.number}`} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="minuteValue" className="block text-gray-700 font-bold mb-2">Valor minuto:</label>
          <input type="text" id="minuteValue" name="minuteValue" value={`$${searchResult.booking.minuteValue}`} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="dateStart" className="block text-gray-700 font-bold mb-2">Fecha de inicio:</label>
          <input type="text" id="dateStart" name="dateStart" value={formatDate(searchResult.booking.dateStart)} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="dateEnd" className="block text-gray-700 font-bold mb-2">Fecha final:</label>
          <input type="text" id="dateEnd" name="dateEnd" value={formatDate(searchResult.booking.dateEnd)} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
        <div className="col-span-2">
          <label htmlFor="totalToPay" className="block text-gray-700 font-bold mb-2">Total a pagar:</label>
          <input type="text" id="totalToPay" name="totalToPay" value={`$${totalToPay}`} className="border border-gray-300 rounded px-4 py-2 w-full" readOnly />
        </div>
      </div>
    </form>
    <button 
  className="bg-red-500 text-white px-12 py-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
  onClick={handleBuy}
>
  Registrar pago
</button>

     
  </div>
  
)}

      </div>
  
  );
  
};

export default CheckIn;
