import { useState, useRef, useEffect } from 'react';
import StrikeThroughIcon from '../../../../resources/icons/regular/strike-through.svg?react';
import UnderlineIcon from '../../../../resources/icons/regular/Underline.svg?react';
import BoldIcon from '../../../../resources/icons/solid/bold-solid.svg?react';
import ItalicsIcon from '../../../../resources/icons/regular/italics.svg?react';
import BulletIcon from '../../../../resources/icons/regular/bullet-list.svg?react';
import DividerIcon from '../../../../resources/icons/regular/divider.svg?react';
import TitleBar from './TitleBar';
function StickyNote(){
    const [content, setContent] = useState('');
    const [stickynoteID, setStickynoteID] = useState(crypto.randomUUID())
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

    return(
        <div className="grid  grid-rows-[auto_1fr] w-screen h-screen bg-[#DDC7B9] gap-0">
            {/* Top Bar */}
            <TitleBar/>

            {/* //Text Area */}
            <div className="flex w-full min-h-[65%] overflow-x-hidden px-1">
                    <div className="flex bg-[#F9EEE7] min-h-auto w-full p-2 mx-auto max-w-[calc(100%-8px)]">
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
            <div className="flex justify-between items-center w-full min-h-[10%] mt-1 mb-3 px-1">
                <div className="flex bg-[#F9EEE7] min-h-full w-full p-2 mx-auto max-w-[calc(100%-8px)]">
                  <div className = "grid grid-cols-6">
                    <button onClick={() => formatText('bold')} className="flex justify-center items-center min-w-6 min-h-6 fill-[#747474] hover:fill-black rounded-sm"><BoldIcon className="w-3.5 h-3.5"/></button>
                    <button onClick={() => formatText('italic')} className="flex justify-center items-center min-w-6 min-h-6 fill-[#747474] hover:fill-black rounded-sm"><ItalicsIcon className="w-3.5 h-3.5"/></button>
                    <button onClick={() => formatText('underline')} className="flex justify-center items-center min-w-6 min-h-6 fill-[#747474] hover:fill-black rounded-sm"><UnderlineIcon className="w-3.5 h-3.5"/></button>
                    <button onClick={() => formatText('strikeThrough')} className="flex justify-center items-center min-w-6 min-h-6 fill-[#747474] hover:fill-black rounded-sm"><StrikeThroughIcon className="w-3.5 h-3.5"/></button>
                    <button onClick={() => formatText('insertUnorderedList')} className="flex justify-center items-center min-w-6 min-h-6 fill-[#747474] hover:fill-black rounded-sm"><BulletIcon className="w-3.5 h-3.5"/></button>
                    <button onClick={() => formatText('insertHorizontalRule')} className="flex justify-center items-center min-w-6 min-h-6 fill-[#747474] hover:fill-black rounded-sm"><DividerIcon className="w-3.5 h-3.5"/></button>
                  </div>

                  <div className="ml-auto">
                    <button 
                        onClick={() => console.log('Square Clicked')} 
                        className="w-6 h-6 bg-[#DDC7B9] border-1 border-[#747474] rounded-sm hover:bg-blue-700">
                    </button>
                  </div>

                </div>

            </div>


        </div>

    )
}

export default StickyNote