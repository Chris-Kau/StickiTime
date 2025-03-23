import { useState, useEffect } from "react";

function Bookmark({ name, hyperlink, icon_option}) {
    const [icon, setIcon] = useState('');

    useEffect(() => {
    window.electron.ipcRenderer.invoke('fetch-favicon', hyperlink)
        .then(setIcon)
        .catch(() => setIcon('data:image/png;base64,...'));
    }, [hyperlink]);

    return (
        <div className="flex items-center gap-2 p-2 hover:bg-gray-100">
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
    )
}

export default Bookmark