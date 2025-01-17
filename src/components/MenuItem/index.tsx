import { ReactNode, useCallback } from "react";

import styles from "./styles.module.css";

export interface MenuItemProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

const MenuItem = ({
  children,
  onClick,
  disabled,
  className,
}: MenuItemProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onClick) onClick(event);
    },
    [onClick]
  );

  return (
    <div
      onClick={handleClick}
      className={`${styles.menuItem} ${className}`}
      aria-disabled={disabled}
      role="menuitem"
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

export default MenuItem;
