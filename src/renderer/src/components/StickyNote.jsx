import { useState, useRef, useEffect } from 'react';
import StrikeThroughIcon from '../../../../resources/icons/regular/strike-through.svg?react';
import UnderlineIcon from '../../../../resources/icons/regular/Underline.svg?react';
import BoldIcon from '../../../../resources/icons/solid/bold-solid.svg?react';
import ItalicsIcon from '../../../../resources/icons/regular/italics.svg?react';
import WindowCloseIcon from '../../../../resources/icons/regular/window-close.svg?react';
import WindowCloseSolidIcon from '../../../../resources/icons/solid/window-close-solid.svg?react';
import BulletIcon from '../../../../resources/icons/regular/bullet-list.svg?react';
import DividerIcon from '../../../../resources/icons/regular/divider.svg?react';
import MinusIcon from '../../../../resources/icons/regular/minus.svg?react';
import MinusSolidIcon from '../../../../resources/icons/solid/minus-solid.svg?react';
import ThumbtackIcon from '../../../../resources/icons/regular/thumbtack.svg?react';
import ThumbtackSolidIcon from '../../../../resources/icons/solid/thumbtack-solid.svg?react';
function StickyNote(){
    const [content, setContent] = useState('');
    const [isThumbtackHovered, setIsThumbtackHovered] = useState(false);
    const [isClosedHovered, setIsClosedHovered] = useState(false);
    const [isWindowPinned, setIsWindowPinned] = useState(false);
    const [isMinimizeHovered, setIsMinimizeHovered] = useState(false);
    const editorRef = useRef(null);
        const handleInput = () => {
            const html = editorRef.current.innerHTML;
            lastHtml.current = html;
            setPlaceholderVisible(html === '');
        };
    
        const saveSelection = () => {
            const sel = window.getSelection();
            return sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        };
    
        const restoreSelection = (range) => {
            if (range) {
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        };
    
        const formatText = (command, value = null) => {
            const selection = saveSelection();
            document.execCommand(command, false, value);
            restoreSelection(selection);
            editorRef.current.focus();
        };
    
        useEffect(() => {
            editorRef.current.focus();
        }, []);

    const minimizeWindow = () => window.electron.ipcRenderer.send('minimize-window');
    const pinWindow = () =>{ 
        window.electron.ipcRenderer.send('pin-window')
        if (isWindowPinned)
            setIsWindowPinned(false)
        else
            setIsWindowPinned(true)
    };
    return(
            <div className="grid  grid-rows-[auto_1fr] w-screen h-screen bg-[#DDC7B9] gap-0">
                {/* Top Bar */}
                <div className="flex justify-center self-center items-center w-[95%] min-h-[15%] mx-auto" id="draggable">
                    <div className = "grid grid-cols-2 grid-rows-1 min-w-full">
                        <div className = "flex float-left">
                            <div className = "flex justify-center items-center align-middle pt-2 pb-2">
                                <div 
                                    id="not-draggable"
                                    onClick={()=>pinWindow()}
                                    onMouseEnter={() => setIsThumbtackHovered(true)}
                                    onMouseLeave={() => setIsThumbtackHovered(false)}
                                    >
                                    {isWindowPinned ? (<ThumbtackSolidIcon className="w-4 h-4 hover:scale-125" />) : (isThumbtackHovered ? ( <ThumbtackSolidIcon className="w-4 h-4 hover:scale-125" />) : (<ThumbtackIcon className="w-4 h-4 hover:scale-125" />))}
                                </div>
                            </div>

                        </div>
                        <div className = "flex justify-end gap-3">
                            <div className = "flex justify-center items-center align-middle pt-2 pb-2 gap-2">
                                <div 
                                onClick = {()=>minimizeWindow()} 
                                id="not-draggable"  
                                onMouseEnter={() => setIsMinimizeHovered(true)}
                                onMouseLeave={() => setIsMinimizeHovered(false)}>
                                    {isMinimizeHovered ? (<MinusSolidIcon className = "w-4 h-4  hover:scale-125"/>) : (<MinusIcon className = "w-4 h-4 hover:scale-125"/>)}
                                </div>

                                <div
                                onClick = {()=>window.close()} 
                                id="not-draggable"
                                onMouseEnter={() => setIsClosedHovered(true)}
                                onMouseLeave={() => setIsClosedHovered(false)}>
                                    {isClosedHovered ? (<WindowCloseSolidIcon className = "w-4 h-4 hover:scale-125"/>) : (<WindowCloseIcon className = "w-4 h-4 hover:scale-125"/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* //Text Area */}
                <div className="flex w-full min-h-[65%] overflow-x-hidden px-1">
                        <div className="flex bg-[#FAF7F4] min-h-auto w-full rounded-t-md p-2 mx-auto max-w-[calc(100%-8px)]">
                            <div
                            ref={editorRef}
                            className="min-h-full min-w-full outline-none"
                            contentEditable
                            onInput={handleInput}
                            dangerouslySetInnerHTML={{ __html: content }}
                            data-placeholder="Start typing..."
                        />
                        </div>

                </div>

                {/* //Footer */}
                <div className="flex justify-center items-center w-full min-h-[10%] mt-1 mb-3 px-1">
                    <div className="flex bg-[#FFF5F7] min-h-full w-full rounded-b-md p-2 mx-auto max-w-[calc(100%-8px)]">
                        <div className = "grid grid-cols-6 min-w-full">
                                <button onClick={() => formatText('bold')} className="flex justify-center items-center min-w-6 min-h-6 fill-gray-400 hover:fill-black rounded-sm"><BoldIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('italic')} className="flex justify-center items-center min-w-6 min-h-6 fill-gray-400 hover:fill-black rounded-sm"><ItalicsIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('underline')} className="flex justify-center items-center min-w-6 min-h-6 fill-gray-400 hover:fill-black rounded-sm"><UnderlineIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('strikeThrough')} className="flex justify-center items-center min-w-6 min-h-6 fill-gray-400 hover:fill-black rounded-sm"><StrikeThroughIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('insertUnorderedList')} className="flex justify-center items-center min-w-6 min-h-6 fill-gray-400 hover:fill-black rounded-sm"><BulletIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('insertHorizontalRule')} className="flex justify-center items-center min-w-6 min-h-6 fill-gray-400 hover:fill-black rounded-sm"><DividerIcon className="w-4 h-4"/></button>
                        </div>
                    </div>
                </div>
            </div>




    )
}

export default StickyNote