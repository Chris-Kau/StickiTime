function Bookmark({ name, hyperlink, icon }) {
    console.log("Is this working?")
    return (
        <div href={hyperlink}>
            {name}
        </div>
    )
}

export default Bookmark