import { useState } from 'react';
import TitleBar from './TitleBar';

function AddBookMark() {
    const [name, setName] = useState('');
    const [hyperlink, setHyperlink] = useState('');

    const hyperlinkInput = document.getElementById("hyperlinkID")

    const sendInfo = (data) => window.electron.ipcRenderer.send('addingBookMark', data);

    function submitForm(e) {
        e.preventDefault();
        let newDiv1 = document.getElementById("ErrorMsgN")
        if (name.length > 15) {
            newDiv1.innerHTML = "ERROR: name too long"
            return
        } else {
            newDiv1.innerHTML = "&nbsp;"
        }

        console.log("Selected values:", { name, hyperlink });
        console.log(hyperlink.toString())
        let url = hyperlink.toString()
        console.log(url.slice(0, 8))
        let newDiv2 = document.getElementById("ErrorMsgHL")
        if (url.slice(0, 7) == "http://" || url.slice(0, 8) == "https://") {
            sendInfo({ name, hyperlink });
            newDiv2.innerHTML = "&nbsp;"
        } else {
            newDiv2.innerHTML = "ERROR: Missing https://"
        }
    }
//Back #EFBFA7
//Fore #FFFBF5
//Text field : #FFEEDA
//Font: #747474
    return (
        <div className="flex flex-col bg-[#EFBFA7] h-screen max-h-screen max-w-screen p-2 text-[#747474]">
            <TitleBar hasThumbtack={false} topleftText={"Add Bookmark"}></TitleBar>
            <div className="flex bg-[#FFFBF5] w-full h-full max-h-[100%-15px] border p-1">
                <form onSubmit={(e) => submitForm(e)} className="grid grid-cols-1 gap-0 w-screen max-w-full">
                    <label htmlFor="name">
                        <p>Name:</p>
                        <input 
                            id="name" 
                            type="text" 
                            className=" w-full bg-[#FFEEDA]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div id="ErrorMsgN" className='text-red-600'>&nbsp;</div>
                    </label>
                    <label htmlFor="hyperlink" id='hyperlinkID' className="-my-5 ">
                        <p>Hyperlink:</p>
                        <input 
                            id="hyperlink" 
                            type="text" 
                            className="w-full bg-[#FFEEDA]"
                            value={hyperlink}
                            onChange={(e) =>{ setHyperlink(e.target.value) }}
                        />
                        <div id="ErrorMsgHL" className='text-red-600'>&nbsp;</div>
                    </label>
                    
                    <input type="submit" value="Submit" className="flex justify-center items-center border-1 h-7 w-20 text-center hover:bg-[#FFEEDA]"/>
                </form>
            </div>
      
        </div>
    )
}

export default AddBookMark