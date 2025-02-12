import { useState, useEffect, useCallback, useRef } from 'react';
import cx from 'clsx';

import { cloneChildren } from '../utils';
import { MenuItemExternalProps, MenuItemProps } from './MenuItem';

export interface SubMenuProps extends Exclude<MenuItemProps, 'onClick'> {
  /**
   * Label to display for the submenu.
   */
  label: string;
}

const CLOSE_DELAY = 150;
const RIGHT_CLASS = 'react-context-menu__submenu-right';
const BOTTOM_CLASS = 'react-context-menu__submenu-bottom';

const SubMenu = ({ label, children, className, disabled = false, ...rest }: SubMenuProps) => {
  const [active, setActive] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const itemRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const calculatePosition = useCallback(() => {
    if (subMenuRef.current && itemRef.current) {
      clearTimer();
      setActive(true);

      // Reset position styling
      subMenuRef.current.style.top = '0';
      subMenuRef.current.classList.remove(RIGHT_CLASS, BOTTOM_CLASS);

      const { height } = itemRef.current.getBoundingClientRect();
      const { right, bottom } = subMenuRef.current.getBoundingClientRect();

      if (right > window.innerWidth) subMenuRef.current.classList.add(RIGHT_CLASS);
      if (bottom - window.innerHeight > 0) {
        subMenuRef.current.style.top = `${window.innerHeight - bottom - height}px`;
        subMenuRef.current.classList.add(BOTTOM_CLASS);
      }
    }
  }, [subMenuRef, itemRef, clearTimer]);

  const onLeave = useCallback(() => {
    clearTimer();

    timeoutRef.current = setTimeout(() => {
      setActive(false);
    }, CLOSE_DELAY);
  }, [clearTimer]);

  const classNames = cx('react-context-menu__item', className, { 'react-context-menu__item--disabled': disabled });

  return (
    <div
      ref={itemRef}
      className={classNames}
      aria-haspopup="true"
      role="menuitem"
      tabIndex={-1}
      onMouseEnter={calculatePosition}
      onMouseLeave={onLeave}
      onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
    >
      <div className="react-context-menu__label">
        {label}
        <span className="react-context-menu__arrow" />
      </div>
      <div
        ref={subMenuRef}
        style={{ visibility: active ? 'visible' : 'hidden' }}
        className="react-context-menu__submenu"
      >
        {/* rest is sent from the ContextMenu element */}
        {cloneChildren(children, rest as MenuItemExternalProps)}
      </div>
    </div>
  );
};

export default SubMenu;
