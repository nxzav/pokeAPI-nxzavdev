import { useState, useContext } from 'react';
import { AnimationContext } from '../App';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { animate, toggleAnimate } = useContext(AnimationContext);

  const openSidemenu = () => {
    setOpen((prev) => !prev);
  };

  const asideClass = open ? 'active' : '';
  const menuItemClass = animate ? 'active' : '';
  const menuButtonClass = open ? 'active' : '';

  return (
    <>
      <div className={`menu-btn ${menuButtonClass}`} onClick={openSidemenu}>
        <span>☰</span>
      </div>
      <aside className={asideClass}>
        <ul>
          <li className={menuItemClass} onClick={toggleAnimate}>
            Animate
          </li>
          <li>Mute</li>
        </ul>
      </aside>
    </>
  );
}
