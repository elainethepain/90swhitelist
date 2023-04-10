import logo from './logo.svg';
import { useBlock, useWallet } from 'fuels-react';
import './App.css';

function App() {
  const wallet = useWallet();
  const block = useBlock({ idOrHeight: 900000 });
  return (
    <div className="App">
      <div className="card">
        {wallet.isConnected ? (
          <button onClick={wallet.disconnect}>Disconnect</button>
        ) : (
          <button onClick={wallet.connect}>Connect</button>
        )}
        <p>
          Edit <code>src/App.tsx</code>
        </p>
      </div>
    </div>

  );
}

export default App;
