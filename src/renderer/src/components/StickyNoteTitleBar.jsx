import { useState,useEffect } from 'react';

import WindowCloseIcon from '../../../../resources/icons/yay_xm_icons/xx.svg?react';
import WindowCloseSolidIcon from '../../../../resources/icons/yay_xm_icons/inverse xx.svg?react';

import MinusIcon from '../../../../resources/icons/yay_xm_icons/mm.svg?react';
import MinusSolidIcon from '../../../../resources/icons/yay_xm_icons/inverse mm.svg?react';
import ThumbtackIcon from '../../../../resources/icons/regular/thumbtack.svg?react';
import ThumbtackSolidIcon from '../../../../resources/icons/solid/thumbtack-solid.svg?react';
function StickyNoteTitleBar(){
    const [isThumbtackHovered, setIsThumbtackHovered] = useState(false);
    const [isClosedHovered, setIsClosedHovered] = useState(false);
    const [isWindowPinned, setIsWindowPinned] = useState(false);
    const [isMinimizeHovered, setIsMinimizeHovered] = useState(false);
    const [name, setName] = useState('');
    const [windowId, setWindowId] = useState(null);
    const minimizeWindow = () => window.electron.ipcRenderer.send('minimize-window', true);


    useEffect(() => {
        window.electron.ipcRenderer.invoke('get-window-id').then(id => {
            setWindowId(id);
        });
    }, []);


    useEffect(() => {
        if (windowId) {
            window.electron.ipcRenderer.send('update-sticky-name', windowId, name);
        }
    }, [name, windowId]);


    const pinWindow = () =>{ 
        window.electron.ipcRenderer.send('pin-window')
        if (isWindowPinned)
            setIsWindowPinned(false)
        else
            setIsWindowPinned(true)
    };
    return(
        <div className="flex justify-center self-center items-center w-full max-w-[calc(100%-16px)] mx-auto" id="draggable">
        <div className = "grid grid-cols-2 grid-rows-1 min-w-full">
            <div className = "flex float-left">
                <div className = "flex justify-center items-center align-middle pt-2 pb-2 gap-x-3">
                        <div 
                            id="not-draggable"
                            onClick={()=>pinWindow()}
                            onMouseEnter={() => setIsThumbtackHovered(true)}
                            onMouseLeave={() => setIsThumbtackHovered(false)}
                            >
                            {isWindowPinned ? (<ThumbtackSolidIcon className="w-5 h-5 hover:scale-125 fill-[#747474]" />) : (isThumbtackHovered ? ( <ThumbtackSolidIcon className="w-5 h-5 hover:scale-125 fill-[#747474]" />) : (<ThumbtackIcon className="w-5 h-5 hover:scale-125 fill-[#747474]" />))}
                        </div>
                        <input 
                            type="text" 
                            id="not-draggable"  // Add this to prevent drag interference
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-2xl bg-transparent text-[#747474] border-none outline-none placeholder-[#747474] w-full px-2"
                            placeholder="Untitled"
                        />
                    </div>
                

            </div>
            <div className = "flex justify-end gap-3">
                <div className = "flex justify-center items-center align-middle pt-2 pb-2 gap-2">
                    <div 
                    onClick = {()=>minimizeWindow()} 
                    id="not-draggable"  
                    onMouseEnter={() => setIsMinimizeHovered(true)}
                    onMouseLeave={() => setIsMinimizeHovered(false)}>
                        {isMinimizeHovered ? (<MinusSolidIcon className = "hover:scale-115"/>) : (<MinusIcon className = "hover:scale-115"/>)}
                    </div>

                    <div
                    onClick = {()=>window.close()} 
                    id="not-draggable"
                    onMouseEnter={() => setIsClosedHovered(true)}
                    onMouseLeave={() => setIsClosedHovered(false)}>
                        {isClosedHovered ? (<WindowCloseSolidIcon className = "hover:scale-115"/>) : (<WindowCloseIcon className = "hover:scale-115"/>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  
}

export default StickyNoteTitleBar