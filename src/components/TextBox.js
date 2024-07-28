import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Define font size styles
const fontSizeStyleMap = {
  'FONTSIZE-12': { fontSize: '12px' },
  'FONTSIZE-14': { fontSize: '14px' },
  'FONTSIZE-16': { fontSize: '16px' },
  'FONTSIZE-18': { fontSize: '18px' },
  'FONTSIZE-20': { fontSize: '20px' },
};


const TextBox = ({ id, left, top, text, onDelete, moveComponent, isPreview }) => {
    const [localText, setLocalText] = useState(text);
    const [editing, setEditing] = useState(false);
    const [fontSize, setFontSize] = useState('16'); // Default font size
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'text',
        item: { id, left, top, type: 'text' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'text',
        hover: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const newLeft = Math.round(item.left + delta.x);
            const newTop = Math.round(item.top + delta.y);
            moveComponent(item.id, newLeft, newTop);
        },
    });

    const handleTextChange = (event) => {
        setLocalText(event.target.value);
    };

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const toggleBold = () => {
        setBold(!bold);
    };

    const toggleItalic = () => {
        setItalic(!italic);
    };

    const getTextStyle = () => {
        let style = '';
        if (bold) style += 'font-weight: bold; ';
        if (italic) style += 'font-style: italic; ';
        return style;
    };

    return (
        <div
            ref={node => drag(drop(node))}
            style={{
                position: 'absolute',
                left,
                top,
                opacity: isDragging ? 0.5 : 1,
                padding: '10px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                maxWidth: '300px', // Adjust width as needed
                maxHeight: '200px', // Adjust height as needed
                overflow: 'auto',
                pointerEvents: isPreview ? 'none' : 'auto', // Disable pointer events in preview mode
                ...fontSizeStyleMap[`FONTSIZE-${fontSize}`], // Apply font size style
                ...{ cssText: getTextStyle() } // Apply text styles as a string
            }}
            className="text-box"
        >
            {!isPreview && (
                <div className="toolbar">
                    <button onClick={toggleBold}>
                        {bold ? 'Unbold' : 'Bold'}
                    </button>
                    <button onClick={toggleItalic}>
                        {italic ? 'Unitalicize' : 'Italic'}
                    </button>
                    <button onClick={() => setEditing(!editing)}>
                        {editing ? 'Save' : 'Edit'}
                    </button>
                    <select onChange={handleFontSizeChange} value={fontSize}>
                        <option value="12">12px</option>
                        <option value="14">14px</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                    </select>
                </div>
            )}
            {editing ? (
                <textarea
                    value={localText}
                    onChange={handleTextChange}
                    style={{
                        width: '100%',
                        height: '100px',
                        resize: 'none',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            ) : (
                <div
                    style={{
                        padding: '5px',
                        whiteSpace: 'pre-wrap', // Preserve whitespace formatting
                        wordBreak: 'break-word',
                    }}
                >
                    {localText}
                </div>
            )}
            {!isPreview && (
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
            )}
        </div>
    );
};

export default TextBox;
