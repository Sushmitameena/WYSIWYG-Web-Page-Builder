import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ButtonComponent = ({ id, left, top, onDelete, moveComponent }) => {
    const [text, setText] = useState('Button');
    const [{ isDragging }, drag] = useDrag({
        type: 'button',
        item: { id, left, top, type: 'button' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'button',
        hover: (item, monitor) => {
            if (!monitor.isOver()) {
                return;
            }
            const delta = monitor.getDifferenceFromInitialOffset();
            const newLeft = Math.round(item.left + delta.x);
            const newTop = Math.round(item.top + delta.y);
            moveComponent(item.id, newLeft, newTop);
        },
    });

    return (
        <div
            ref={node => drag(drop(node))}
            style={{
                position: 'absolute',
                left,
                top,
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                padding: '10px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                textAlign: 'center'
            }}
            className="button-component"
        >
            <button>{text}</button>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                    marginTop: '5px',
                    width: '100%',
                    padding: '5px',
                    boxSizing: 'border-box'
                }}
            />
            <button
                onClick={() => onDelete(id)}
                style={{
                    marginTop: '10px',
                    backgroundColor: '#e57373',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px',
                    cursor: 'pointer'
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default ButtonComponent;
