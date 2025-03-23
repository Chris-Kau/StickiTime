import { useState, useEffect } from "react";

function Bookmark({id, name, hyperlink, onDelete}) {
    const [icon, setIcon] = useState('');

    useEffect(() => {
    window.electron.ipcRenderer.invoke('fetch-favicon', hyperlink)
        .then(setIcon)
        .catch(() => setIcon('data:image/png;base64,...'));
    }, [hyperlink]);

    return (
        <div className="flex items-center gap-2 p-2 bg-white hover:bg-gray-100">
            <img 
                src={icon}
                alt="favicon"
                className="w-5 h-5"
            />
            <a 
                href={hyperlink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
                {name}
            </a>
            <button 
                onClick={() => {onDelete(id)}}
                className="text-red-500 hover:text-red-700"
            >
                X
            </button>
        </div>
    )
}

export default Bookmark