function Bookmark({ classname, hyperlink }) {
    console.log("Is this working?")
    return (
        <div className={classname}>
            {hyperlink}
        </div>
    )
}

export default Bookmark