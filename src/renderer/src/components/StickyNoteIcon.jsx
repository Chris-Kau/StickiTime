import Icon from '../../../../resources/icons/mintcat_icons/stickynote_FillColor.svg?react';
function StickyNoteIcon({ id, name, color, onReopen }) {
  console.log(color)
    return (
      <div 
        onClick={() => onReopen(id)}
        className="w-fit flex h-10 transition-all duration-[25ms] hover:scale-105 cursor-pointer bg-[#FFFAE4]"
      >
        <div className="flex flex-row gap-1 items-center px-2">
          <Icon className="w-6 h-6 shrink-0" style={{color: color}}/>
          <div className="whitespace-nowrap text-2xl">
            {name || 'Untitled'} {/* Fallback for empty names */}
          </div>
        </div>
      </div>
    );
  }

export default StickyNoteIcon