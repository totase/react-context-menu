import { useState, useCallback, ButtonHTMLAttributes } from 'react';
import cx from 'clsx';

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface MenuItemExternalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hide: () => void;
}

interface MenuItemState {
  clicked: boolean;
  eventRef: React.MouseEvent<HTMLButtonElement> | null;
}

const MenuItem = ({ children, onClick, className, disabled = false, ...rest }: MenuItemProps) => {
  const [state, setState] = useState<MenuItemState>({ clicked: false, eventRef: null });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onClick) setState({ clicked: true, eventRef: event });
  };

  const handleAnimationEnd = useCallback(() => {
    const { hide } = rest as MenuItemExternalProps;
    setState((prev) => ({ ...prev, clicked: false }));

    if (state.clicked && state.eventRef) {
      hide();
      onClick!(state.eventRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.clicked, state.eventRef]);

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
