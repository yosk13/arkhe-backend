import { useState } from 'react';
import NuevaEntrada from './pages/NuevaEntrada';
import LeerEntradas from './pages/LeerEntradas';

function App() {
  const [vista, setVista] = useState<'nueva' | 'leer' | 'refugio'>('nueva');

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1rem' }}>
      <button onClick={() => setVista('nueva')}>🕯️ Dejar entrada</button>
      <button onClick={() => setVista('leer')}>📖 Leer entradas</button>
      <button onClick={() => setVista('refugio')}>🌙 Mi refugio</button>
      </header>
      <main>
        {vista === 'nueva' && <NuevaEntrada />}
        {vista === 'leer' && <LeerEntradas />}
      </main>
    </div>
  );
}

export default App;
