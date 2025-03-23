import { useState, useEffect } from "react";
import TrashIcon from '../../../../resources/icons/regular/trash.svg?react';

function Bookmark({id, name, hyperlink, onDelete}) {
    const [icon, setIcon] = useState('');

    useEffect(() => {
    window.electron.ipcRenderer.invoke('fetch-favicon', hyperlink)
        .then(setIcon)
        .catch(() => setIcon('data:image/png;base64,...'));
    }, [hyperlink]);

    return (
        <div className="grid grid-cols-2 gap-2 p-2 bg-white hover:bg-gray-100">
            <div className="flex gap-2">
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
            </div>

            <button 
                onClick={() => {onDelete(id)}}
                className="justify-items-end text-red-500 hover:text-red-700p">
                <TrashIcon className="w-4 h-4 fill-red-400 transition-all duration-[25ms hover:scale-[120%]"/>
            </button>
        </div>
    )
}

export default Bookmark