import React, { useState } from 'react';
import { Phone, X, Users, Delete } from 'lucide-react';

interface DialerProps {
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
}

const Dialer: React.FC<DialerProps> = ({ phoneNumber, setPhoneNumber }) => {
  const dialerButtons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '*', '0', '#'
  ];

  const handleKeyPress = (key: string) => {
    setPhoneNumber(phoneNumber + key);
  };

  const handleDelete = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
  };

  return (
    <div className="mt-4">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full text-2xl text-center font-mono bg-transparent focus:outline-none"
          placeholder="+1 (555) 000-0000"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {dialerButtons.map((button) => (
          <button
            key={button}
            onClick={() => handleKeyPress(button)}
            className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-medium"
          >
            {button}
          </button>
        ))}
        <button
          onClick={handleDelete}
          className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
        >
          <Delete className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const FloatingCallButton = () => {
  const [isDialerOpen, setIsDialerOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isContactListOpen, setIsContactListOpen] = useState(false);

  const handleCall = () => {
    // Implement call functionality
    console.log('Calling:', phoneNumber);
    setIsDialerOpen(false);
    setPhoneNumber('');
  };

  return (
    <>
      <button
        onClick={() => setIsDialerOpen(true)}
        className="fixed right-6 bottom-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50"
      >
        <Phone className="h-6 w-6" />
      </button>

      {/* Dialer Modal */}
      {isDialerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[100vh] overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Call</h2>
              <button
                onClick={() => {
                  setIsDialerOpen(false);
                  setPhoneNumber('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsContactListOpen(!isContactListOpen)}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Users className="h-5 w-5 mr-2" />
                Contacts
              </button>
            </div>

            <Dialer phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCall}
                disabled={!phoneNumber.trim()}
                className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Phone className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCallButton;