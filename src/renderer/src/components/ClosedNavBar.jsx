import DownIcon from '../../../../resources/icons/regular/chevron-down.svg?react';
function closedNavbar() {
  const openNavbar = () => window.electron.ipcRenderer.send('minimize-navbar', "open")
  return (
        <DownIcon className="w-4 h-4 hover:scale-110 bg-white/30 rounded-sm" onClick={()=>openNavbar()}/>
    )
}
export default closedNavbar;
