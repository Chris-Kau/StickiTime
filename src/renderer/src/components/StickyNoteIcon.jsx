import Icon from '../../../../resources/icons/mintcat_icons/stickynote_16.svg?react';
function StickyNoteIcon({ id, name, onReopen }) {
    return (
      <div 
        onClick={() => onReopen(id)}
        className="w-fit flex h-6 bg-[#FFFAE4] transition-all duration-[25ms] hover:scale-105 cursor-pointer"
      >
        <div className="flex flex-row gap-1 items-center px-1">
          <Icon className="w-4 h-4 shrink-0"/>
          <div className="whitespace-nowrap text-xl">
            {name || 'Untitled'} {/* Fallback for empty names */}
          </div>
        </div>
      </div>
    );
  }

export default StickyNoteIcon