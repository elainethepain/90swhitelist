import React from 'react';
import ReactDOM from 'react-dom/client';
import { FuelProvider, createClient } from 'fuels-react';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';

const client = createClient({ chains: ['beta-2'] });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <FuelProvider client={client}>
        <App />
      </FuelProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

