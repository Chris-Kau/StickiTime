import Icon from '../../../../resources/icons/mintcat_icons/stickynote_16.svg?react';
function StickyNoteIcon({id, name, onDelete}) {
    return (
        <div onClick={() => {onDelete(id)}} className="w-fit flex h-6 bg-[#FFFAE4] transition-all duration-[25ms] hover:scale-105">
            <div className="flex flex-row gap-1 items-center px-1">
                <Icon className="w-4 h-4 shrink-0"/>
                <div className="whitespace-nowrap">{name}</div>
            </div>
        </div>
    )
}

export default StickyNoteIcon