import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ type, children }) => {
    const [, drag] = useDrag({
        type,
        item: { type }
    });
    return (
        <div ref={drag} className="draggable-component">
            {children}
        </div>
    );
};

export default DraggableComponent;
