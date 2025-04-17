import { useState, useCallback, ButtonHTMLAttributes } from 'react';
import cx from 'clsx';

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface MenuItemExternalProps {
  hide: () => void;
}

interface MenuItemState {
  clicked: boolean;
  eventRef: React.MouseEvent<HTMLButtonElement> | null;
}

const MenuItem = ({ children, onClick, className, disabled = false, ...rest }: MenuItemProps) => {
  const [state, setState] = useState<MenuItemState>({ clicked: false, eventRef: null });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!disabled && onClick) {
        setState({ clicked: true, eventRef: event });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClick],
  );

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
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      className={classNames}
      aria-disabled={disabled}
      role="menuitem"
      tabIndex={-1}
    >
      {children}
    </button>
  );
};

export default MenuItem;
