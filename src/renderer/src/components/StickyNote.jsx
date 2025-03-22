import { useState, useRef, useEffect } from 'react';

function StickyNote(){
    const [content, setContent] = useState('');
    const editorRef = useRef(null);
    const saveCursorPosition = useRef(null);

        // Handle content changes
        const handleInput = () => {
            const html = editorRef.current.innerHTML;
            lastHtml.current = html;
            setPlaceholderVisible(html === '');
        };
    
        // Save selection before formatting
        const saveSelection = () => {
            const sel = window.getSelection();
            return sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        };
    
        // Restore selection after formatting
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
    
        // Initialize content
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
                <div className="flex w-[96%] min-h-[65%] mx-auto overflow-x-hidden">
                        <div className="flex bg-[#FFF5F7] min-h-auto min-w-full rounded-t-md p-2 ">
                            {/* <textarea className="min-h-full min-w-full" placeholder="Start typing..." id = "noteTextArea"></textarea> */}
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
                <div className="flex justify-center items-center w-[96%] min-h-[10%] mt-1 mb-3 mx-auto">
                    <div className="flex bg-[#FFF5F7] min-h-full min-w-full rounded-b-md p-2 ">
                    <div className = "grid grid-cols-2 grid-rows-1 min-w-full">
                        <div className = "flex float-left gap-1">
                            {/* <p>B</p>
                            <p><i>I</i></p>
                            <p>U</p>
                            <p>abc</p>
                            <p>=</p>
                            <p>o</p> */}
                            <button onClick={() => formatText('bold')}>B</button>
                            <button onClick={() => formatText('italic')}><i>I</i></button>
                            <button onClick={() => formatText('underline')}>U</button>
                            <button onClick={() => formatText('strikeThrough')}>abc</button>
                            <button onClick={() => formatText('insertUnorderedList')}>•</button>
                            <button onClick={() => formatText('insertHorizontalRule')}>=</button>
                        </div>
                        <div className = "flex justify-end gap-3">
                            <p>//</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>




    )
}

export default StickyNote