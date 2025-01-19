import { ReactNode, useCallback } from 'react';
import cx from 'clsx';

export interface MenuItemProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

const MenuItem = ({ children, onClick, disabled, className }: MenuItemProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.stopPropagation();

        return;
      }

      if (onClick) onClick(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClick],
  );

  const classNames = cx('react-context-menu__item', className, {
    ['react-context-menu__item--disabled']: disabled,
  });

  return (
    <div onClick={handleClick} className={classNames} aria-disabled={disabled} role="menuitem" tabIndex={-1}>
      {children}
    </div>
  );
};

export default MenuItem;
