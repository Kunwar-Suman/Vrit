import React from 'react';
import Board from '../src/components/Board';  // Import the Board component

const App: React.FC = () => {
  return (
    <div>
      <h1>Kanban Board</h1>
      <Board />  {/* Render the Board component */}
    </div>
  );
};

export default App;
