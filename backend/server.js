const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const uri = 'mongodb+srv://kfc_test:kfc_test@cluster0.5dr7egc.mongodb.net/parkingDB';
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const Space = require('./models/Space');
const Booking = require('./models/Booking');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});



/* usuarios */
//get usuario por id
app.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
   
    const user = await User.findById(userId);
    if (!user) {   
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }  
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ message: 'Error al obtener usuario por ID' });
  }
});


//get usuarios
app.get('/users', async (req, res) => {
    try {      
      const users = await User.find({});      
      res.json(users);
    } catch (error) {
      
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  });

//post usuarios
app.post('/users', async (req, res) => {
  try {
    const { name, lastName, email, rol } = req.body; 
    const newUser = new User({ name, lastName, email, rol }); 
    await newUser.save(); 
    res.status(201).json(newUser); 
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});

//deleted
app.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Buscar y eliminar el usuario por su ID
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});

// update
app.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, lastName, email, rol } = req.body;

    // Buscar y actualizar el usuario por su ID
    const updatedUser = await User.findByIdAndUpdate(userId, { name, lastName, email, rol }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});

/* vehiculos */

// Obtener vehículos
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    res.status(500).json({ message: 'Error al obtener vehículos' });
  }
});

// Crear vehículo
app.post('/vehicles', async (req, res) => {
  try {
    const { plate, brand, model, color, userId } = req.body;
    const newVehicle = new Vehicle({ plate, brand, model, color, userId });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error al crear vehículo:', error);
    res.status(500).json({ message: 'Error al crear vehículo' });
  }
});

// Eliminar vehículo
app.delete('/vehicles/:vehicleId', async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    // Buscar y eliminar el vehículo por su ID
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    res.status(200).json({ message: 'Vehículo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar vehículo:', error);
    res.status(500).json({ message: 'Error al eliminar vehículo' });
  }
});

// Actualizar vehículo
app.put('/vehicles/:vehicleId', async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const { plate, brand, model, color, userId } = req.body;

    // Buscar y actualizar el vehículo por su ID
    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, { plate, brand, model, color, userId }, { new: true });

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.status(200).json({ message: 'Vehículo actualizado exitosamente', vehicle: updatedVehicle });
  } catch (error) {
    console.error('Error al actualizar vehículo:', error);
    res.status(500).json({ message: 'Error al actualizar vehículo' });
  }
});

/* ESPACIOS */
//get espacios
app.get('/spaces', async (req, res) => {
  try {      
    const spaces = await Space.find({});      
    res.json(spaces);
  } catch (error) {
    
    console.error('Error al obtener espacios:', error);
    res.status(500).json({ message: 'Error al obtener espacios' });
  }
});


/**RESERVAS */
// Crear reserva
app.post('/bookings', async (req, res) => {
  try {
    const { userId, vehicleId, spaceId, dateStart,dateEnd, minuteValue } = req.body;    
    const newBooking = new Booking({ userId, vehicleId, spaceId, dateStart,dateEnd, minuteValue });
    console.log('newBooking',newBooking);
    await newBooking.save();
    
    res.status(201).json(newBooking);
  } catch (error) {
    console.log('newBookingError');
    console.error('Error al crear reserva:', error);
    res.status(500).json({ message: 'Error al crear reserva' });
  }
});

//get reserva
app.get('/bookings', async (req, res) => {
  try {      
    const bookings = await Booking.find({});      
    res.json(bookings);
  } catch (error) {
    
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
});


// Actualizar disponibilidad del espacio
app.put('/spaces/:spaceId', async (req, res) => {
  try {
    const spaceId = req.params.spaceId;
    const updatedSpace = await Space.findByIdAndUpdate(spaceId, { available: false }, { new: true });

    if (!updatedSpace) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }

    res.status(200).json({ message: 'Disponibilidad del espacio actualizada exitosamente', space: updatedSpace });
  } catch (error) {
    console.error('Error al actualizar disponibilidad del espacio:', error);
    res.status(500).json({ message: 'Error al actualizar disponibilidad del espacio' });
  }
});


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connection success');
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Connection fail', error);
  });
