import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from './components/Canvas';
import DraggableComponent from './components/DraggableComponent';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import './App.css';

const App = () => {
  const [components, setComponents] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default white background

  const handleDrop = (item, monitor) => {
    const clientOffset = monitor.getClientOffset();

    if (!clientOffset) {
      return; // Avoid processing if clientOffset is null
    }

    const canvasBounds = document.querySelector('.canvas').getBoundingClientRect();
    const left = Math.round(clientOffset.x - canvasBounds.left);
    const top = Math.round(clientOffset.y - canvasBounds.top);

    // Ensure the coordinates are within the canvas bounds
    addComponent(item.type, left, top);
  };

  const addComponent = (type, left, top) => {
    setComponents([...components, { type, left, top }]);
  };

  const deleteComponent = (id) => {
    setComponents(components.filter((comp, index) => index !== id));
  };

  const moveComponent = (id, left, top) => {
    const canvas = document.querySelector('.canvas');
    const canvasBounds = canvas.getBoundingClientRect();

    // Ensure the component stays within canvas bounds
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left > canvasBounds.width - 100) left = canvasBounds.width - 100; // Adjust width as needed
    if (top > canvasBounds.height - 50) top = canvasBounds.height - 50; // Adjust height as needed

    const updatedComponents = components.map((component, index) =>
      index === id ? { ...component, left, top } : component
    );
    setComponents(updatedComponents);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Header />
        <div className="toolbar">
          <DraggableComponent type="text">Text</DraggableComponent>
          <DraggableComponent type="image">Image</DraggableComponent>
          <DraggableComponent type="button">Button</DraggableComponent>
          <input
          style={{margin:"8px",padding:"1px"}}
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            title="Choose background color"
          />
          <button onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        <Canvas
          components={components}
          onDrop={handleDrop}
          isPreview={isPreview}
          onDelete={deleteComponent}
          moveComponent={moveComponent}
          backgroundColor={backgroundColor} // Pass the background color to Canvas

        />
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;
