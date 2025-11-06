import { useState, useEffect, useRef, HTMLAttributes } from 'react';
import cx from 'clsx';

import { BOTTOM_CLASS, CLOSE_DELAY, RIGHT_CLASS } from '../constants';
import { cloneChildren } from '../utils';

export interface SubMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Label to display for the submenu.
   */
  label: string;
  disabled?: boolean;
  /**
   * Custom icon to indicate a submenu.
   */
  iconElement?: React.ReactNode;
}

const SubMenu = ({
  label,
  children,
  className,
  iconElement = <span className="react-context-menu__arrow" />,
  disabled = false,
  ...rest
}: SubMenuProps) => {
  const [active, setActive] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const itemRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clearTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const calculatePosition = () => {
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
  };

  const onLeave = () => {
    clearTimer();

    timeoutRef.current = setTimeout(() => {
      setActive(false);
    }, CLOSE_DELAY);
  };

  const classNames = cx('react-context-menu__item', className, {
    'react-context-menu__item--disabled': disabled,
  });

  return (
    <div
      {...rest}
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

        {iconElement}
      </div>
      <div
        ref={subMenuRef}
        style={{ visibility: active ? 'visible' : 'hidden' }}
        className="react-context-menu__submenu"
      >
        {cloneChildren(children)}
      </div>
    </div>
  );
};

export default SubMenu;
