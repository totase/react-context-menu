import { ReactNode } from "react";

import styles from "./styles.module.css";

export interface MenuItemProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

const MenuItem = ({ children, className }: MenuItemProps) => {
  return (
    <div
      className={`${styles.menuItem} ${className}`}
      aria-disabled={false}
      role="menuitem"
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

export default MenuItem;
