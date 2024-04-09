import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            setTimeOver(true);
            return;
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(5);
    setSeconds(0);
    setInputMinutes('');
    setTimeOver(false);
  };

  const handleInputChange = (e) => {
    setInputMinutes(e.target.value);
  };

  const startCustomTimer = () => {
    const inputMinutesInt = parseInt(inputMinutes, 10);
    if (!isNaN(inputMinutesInt)) {
      setMinutes(inputMinutesInt);
      setSeconds(0);
      setIsActive(true);
      setTimeOver(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-9 flex justify-center">
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold mb-8">Técnica Pomodoro</h1>
        <div className="text-2xl mb-4">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        {timeOver && (
          <div className="bg-red-500 text-white py-8 px-4 text-center rounded-lg mb-4">
            <h2 className="text-3xl font-bold">¡Tiempo terminado!</h2>
          </div>
        )}
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Minutos"
            value={inputMinutes}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-lg border"
          />
          <button onClick={startCustomTimer} className="py-2 px-4 rounded-lg bg-blue-500 text-white">
            Iniciar
          </button>
        </div>
        <div className="flex space-x-4">
          <button onClick={toggleTimer} className={`py-2 px-4 rounded-lg ${isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
            {isActive ? 'Pausar' : 'Reanudar'}
          </button>
          <button onClick={resetTimer} className="py-2 px-4 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800">
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
