import Icon from '../../../../resources/icons/regular/receipt.svg?react';
function StickyNoteIcon({id, name, onDelete}) {
    return (
        <div onClick={() => {onDelete(id)}} className="flex w-6 h-6 justify-center mx-auto align-middle items-center transition-all duration-[25ms] hover:scale-105">
            <Icon/>
        </div>
    )
}

export default StickyNoteIcon