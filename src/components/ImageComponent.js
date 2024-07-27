import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ImageComponent = ({ id, left, top, onDelete, moveComponent }) => {
    const [src, setSrc] = useState('');
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [{ isDragging }, drag] = useDrag({
        type: 'image',
        item: { id, left, top, type: 'image' },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: 'image',
        hover: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const newLeft = Math.round(item.left + delta.x);
            const newTop = Math.round(item.top + delta.y);
            moveComponent(item.id, newLeft, newTop);
        }
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setSrc(reader.result);
        reader.readAsDataURL(file);
    };

    const handleResize = (event, { size }) => {
        setSize(size);
    };

    return (
        <ResizableBox
            width={size.width}
            height={size.height}
            resizeHandles={['se']}
            onResize={handleResize}
            style={{ position: 'absolute', left, top, opacity: isDragging ? 0.5 : 1 }}
        >
            <div ref={node => drag(drop(node))} className="image-component">
                {src ? <img src={src} alt="Uploaded" style={{ width: '100%', height: '100%' }} /> : <input type="file" onChange={handleImageUpload} />}
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </ResizableBox>
    );
};

export default ImageComponent;
