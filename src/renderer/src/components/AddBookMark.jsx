function AddBookMark() {
    const sendInfo = (data) => window.electron.ipcRenderer.send('addingBookMark', data)

    function submitForm() {
        console.log("YIPPIE")
        sendInfo("Yippie")
    }

    return (
        <div className="bg-amber-100 h-screen px-3">
            <form onClick={() => {submitForm()}}>
                <label htmlFor="">
                    <p>Name:</p>
                    <input type="text" name="name" className="border-1 w-full"/>
                </label>
                <label htmlFor="">
                    <p>Hyperlink:</p>
                    <input type="text" name="name" className="border-1 w-full"/>
                </label>
                <label>
                    <p>Icons:</p>
                    <div className="grid grid-cols-2">
                        <input type="Radio" placeholder=""/>
                        <input type="Radio" />
                        <input type="Radio" />
                        <input type="Radio" />
                    </div>
                </label>
                <input type="submit" value="Submit" className="border-1"/>
            </form>
        </div>
    )
}

export default AddBookMark