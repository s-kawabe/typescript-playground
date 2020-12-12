import React, { useState } from 'react';
import Hello from './component/Hello'

function App() {
  // nullable
  const [name, setName] = useState<string | null>('Jack');
  return (
    <div>
      <Hello message={`I am ${name}!`} />
    </div>
  );
}

export default App;
