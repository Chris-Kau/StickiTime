import { useState } from 'react';

function AddBookMark() {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [name, setName] = useState('');
    const [hyperlink, setHyperlink] = useState('');

    const sendInfo = (data) => window.electron.ipcRenderer.send('addingBookMark', data);

    function submitForm(e) {
        e.preventDefault();
        console.log("Selected values:", { name, hyperlink, selectedIcon });
        sendInfo({ name, hyperlink, icon: selectedIcon });
    }

    return (
        <div className="bg-amber-100 h-screen px-3">
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
                <label htmlFor="hyperlink">
                    <p>Hyperlink:</p>
                    <input 
                        id="hyperlink" 
                        type="text" 
                        className="border-1 w-full"
                        value={hyperlink}
                        onChange={(e) => setHyperlink(e.target.value)}
                    />
                </label>
                <div>
                    <p>Icons:</p>
                    <ul className="grid grid-cols-2">
                        {['icon1', 'icon2', 'icon3', 'icon4'].map((icon) => (
                            <li key={icon}>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="icon" 
                                        value={icon}
                                        checked={selectedIcon === icon}
                                        onChange={(e) => setSelectedIcon(e.target.value)}
                                    />
                                    {icon}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <input type="submit" value="Submit" className="border-1"/>
            </form>
        </div>
    )
}

export default AddBookMark