import Icon from '../../../../resources/icons/regular/receipt.svg?react';
function StickyNoteIcon({id, name, onDelete}) {
    return (
        <div onClick={() => {onDelete(id)}} className="flex min-w-[100%] justify-center mx-auto align-middle items-center hover:bg-gray-100/30 rounded-sm">
            <Icon/>
        </div>
    )
}

export default StickyNoteIcon