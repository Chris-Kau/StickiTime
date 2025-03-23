function StickyNoteIcon({id, name, onDelete}) {
    return (
        <button onClick={() => {onDelete(id)}}> STICK </button>
    )
}

export default StickyNoteIcon