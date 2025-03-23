import { useState, useRef, useEffect } from 'react';
import StrikeThroughIcon from '../../../../resources/icons/regular/strike-through.svg?react';
import UnderlineIcon from '../../../../resources/icons/regular/Underline.svg?react';
import BoldIcon from '../../../../resources/icons/regular/Bold.svg?react';
import ItalicsIcon from '../../../../resources/icons/regular/italics.svg?react';
import WindowCloseIcon from '../../../../resources/icons/regular/window-close.svg?react';
import BulletIcon from '../../../../resources/icons/regular/bullet-list.svg?react';
import DividerIcon from '../../../../resources/icons/regular/divider.svg?react';
function StickyNote(){
    const [content, setContent] = useState('');
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

    const minimizeWindow = () => window.electron.ipcRenderer.send('minimize-window')
    return(
            <div className="grid  grid-rows-[auto_1fr] w-screen h-screen bg-[#DDC7B9] gap-0">
                {/* Top Bar */}
                <div className="flex justify-center self-center items-center w-[95%] min-h-[15%] mx-auto" id="draggable">
                    <div className = "grid grid-cols-2 grid-rows-1 min-w-full">
                        <div className = "flex float-left">
                            <p id="not-draggable"><b>+</b></p>

                        </div>
                        <div className = "flex justify-end gap-3">
                            <p onClick = {()=>minimizeWindow()} id="not-draggable"><b>-</b></p>
                            <p onClick = {()=>window.close()} id="not-draggable"><b>x</b></p>
                        </div>
                    </div>
                </div>

                {/* //Text Area */}
                <div className="flex w-full min-h-[65%] overflow-x-hidden px-1">
                        <div className="flex bg-[#FFF5F7] min-h-auto w-full rounded-t-md p-2 mx-auto max-w-[calc(100%-8px)]">
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
                        <div className = "grid grid-cols-2 min-w-full">
                            <div className = "grid grid-cols-7 gap-8">
                                <button onClick={() => formatText('bold')} className="flex justify-center items-center min-w-6 min-h-6 hover:bg-gray-400 rounded-sm"><BoldIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('italic')} className="flex justify-center items-center min-w-6 min-h-6 hover:bg-gray-400 rounded-sm"><ItalicsIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('underline')} className="flex justify-center items-center min-w-6 min-h-6 hover:bg-gray-400 rounded-sm"><UnderlineIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('strikeThrough')} className="flex justify-center items-center min-w-6 min-h-6 hover:bg-gray-400 rounded-sm"><StrikeThroughIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('insertUnorderedList')} className="flex justify-center items-center min-w-6 min-h-6 hover:bg-gray-400 rounded-sm"><BulletIcon className="w-4 h-4"/></button>
                                <button onClick={() => formatText('insertHorizontalRule')} className="flex justify-center items-center min-w-6 min-h-6 hover:bg-gray-400 rounded-sm"><DividerIcon className="w-4 h-4"/></button>
                            </div>
                            <div className="flex justify-end items-center w-full">
                                <div className = "flex justify-center align-middle min-w-6 min-h-6 hover:bg-gray-400 rounded-sm"><p>//</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




    )
}

export default StickyNote