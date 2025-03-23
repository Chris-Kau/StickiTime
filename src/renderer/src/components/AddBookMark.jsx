import { useState } from 'react';
import TitleBar from './TitleBar';

function AddBookMark() {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [name, setName] = useState('');
    const [hyperlink, setHyperlink] = useState('');

    const hyperlinkInput = document.getElementById("hyperlinkID")

    const sendInfo = (data) => window.electron.ipcRenderer.send('addingBookMark', data);

    function submitForm(e) {
        e.preventDefault();
        console.log("Selected values:", { name, hyperlink, selectedIcon });
        console.log(hyperlink.toString())
        let url = hyperlink.toString()
        console.log(url.slice(0, 8))
        let newDiv = document.getElementById("ErrorMsg")
        if (url.slice(0, 7) == "http://" || url.slice(0, 8) == "https://") {
            sendInfo({ name, hyperlink, icon: selectedIcon });
            newDiv.innerHTML = "&nbsp;"
        } else {
            newDiv.innerHTML = "ERROR: URL not found"
        }
    }

    return (
        <div className="bg-amber-100 h-screen px-3">
            <TitleBar hasThumbtack={false} ></TitleBar>
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="name">
                    <p>Name:</p>
                    <input 
                        id="name" 
                        type="text" 
                        className="border-1 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label htmlFor="hyperlink" id='hyperlinkID'>
                    <p>Hyperlink:</p>
                    <input 
                        id="hyperlink" 
                        type="text" 
                        className="border-1 w-full"
                        value={hyperlink}
                        onChange={(e) =>{ setHyperlink(e.target.value) }}
                    />
                    <div id="ErrorMsg" className='text-red-600'>&nbsp;</div>
                </label>
                
                <input type="submit" value="Submit" className="border-1 px-1"/>
            </form>
        </div>
    )
}

export default AddBookMark