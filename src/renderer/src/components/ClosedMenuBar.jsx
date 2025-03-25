import DownIcon from '../../../../resources/icons/regular/chevron-down.svg?react';
function ClosedMenuBar() {
  const openMainWindow = () => window.electron.ipcRenderer.send('minimize-main', "open")
  return (
    <div className='flex justify-center items-center h-screen w-screen ' onClick={()=>openMainWindow()}>
        <DownIcon className="w-4 h-4 hover:scale-110 bg-white/30 rounded-sm" />
    </div>
    )
}

export default ClosedMenuBar;
