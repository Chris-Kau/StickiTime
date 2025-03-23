function StickyNoteIcon({id, name, onDelete}) {
    return (
        <div className="grid grid-cols-2 gap-2 p-2 bg-[#FFFAE4] hover:bg-gray-100">
            <button onClick={() => {onDelete(id)}}> {name} </button>
        </div>
    )
}

export default StickyNoteIcon