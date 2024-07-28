import React from 'react';
import { useDrop } from 'react-dnd';
import TextBox from './TextBox';
import ImageComponent from './ImageComponent';
import ButtonComponent from './ButtonComponent';
import '../App.css';

const Canvas = ({ components, onDrop, isPreview, onDelete, moveComponent,backgroundColor }) => {
    const [, drop] = useDrop({
        accept: ['text', 'image', 'button'],
        drop: onDrop,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const renderComponent = (component, index) => {
        const props = { key: index, id: index, ...component, onDelete, moveComponent };

        switch (component.type) {
            case 'text':
                return <TextBox {...props} />;
            case 'image':
                return <ImageComponent {...props} />;
            case 'button':
                return <ButtonComponent {...props} />;
            default:
                return null;
        }
    };

    return (
        <div ref={drop} className={`canvas ${isPreview ? 'preview' : ''}`}
        style={{ backgroundColor }} // Apply the background color
>
            
            {components.map((component, index) => renderComponent(component, index))}
        </div>
    );
};

export default Canvas;
