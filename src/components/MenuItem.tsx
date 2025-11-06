import { useState, ButtonHTMLAttributes, useContext } from 'react';
import cx from 'clsx';

import { ContextMenuContext } from '../context';

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface MenuItemState {
  clicked: boolean;
  eventRef: React.MouseEvent<HTMLButtonElement> | null;
}

const MenuItem = ({ children, onClick, className, disabled = false, ...rest }: MenuItemProps) => {
  const context = useContext(ContextMenuContext);
  const [state, setState] = useState<MenuItemState>({ clicked: false, eventRef: null });

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (onClick) setState({ clicked: true, eventRef: event });
  }

  function handleAnimationEnd() {
    setState((prev) => ({ ...prev, clicked: false }));

    if (state.clicked && state.eventRef) {
      context?.hide();
      onClick!(state.eventRef);
    }
  }

  const classNames = cx('react-context-menu__item', className, {
    'react-context-menu__item--disabled': disabled,
    'react-context-menu__item--clicked': state.clicked,
  });

  return (
    <button
      {...rest}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      className={classNames}
      aria-disabled={disabled}
      disabled={disabled}
      role="menuitem"
      type="button"
      tabIndex={-1}
    >
      {children}
    </button>
  );
};

export default MenuItem;
