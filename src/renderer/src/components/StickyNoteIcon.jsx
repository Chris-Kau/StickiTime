import Icon from '../../../../resources/icons/regular/receipt.svg?react';
function StickyNoteIcon({id, name, onDelete}) {
    return (
        <div onClick={() => {onDelete(id)}} className=" border w-fit flex h-6 justify-center mx-auto align-middle items-center transition-all duration-[25ms] hover:scale-105">
            <div className="flex flex-row gap-1 items-center px-1">
                <Icon className="w-6 h-6 shrink-0"/>
                <div className="whitespace-nowrap px-1 ">blehhhhddddh</div>
            </div>
        </div>
    )
}

export default StickyNoteIcon