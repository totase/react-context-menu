import { ReactNode, useCallback, useEffect, useState } from "react";

import { cloneChildren, getCursorPosition } from "utils";

import styles from "./styles.module.css";
import MenuItem from "components/MenuItem";
import Separator from "components/Separator";

interface ContextMenuProps {
  triggerId: string;
  children: ReactNode;
}

const ContextMenu = ({ triggerId, children }: ContextMenuProps) => {
  const [state, setState] = useState({
    active: false,
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    const trigger = document.getElementById(triggerId);

    trigger?.addEventListener("contextmenu", show);

    return () => {
      trigger?.removeEventListener("contextmenu", show);
    };
  }, []);

  const show = useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const mousePos = getCursorPosition(event);

    setState({
      active: true,
      position: mousePos,
    });
  }, []);

  if (!state.active) return null;

  return (
    <div
      className={styles.contextMenu}
      style={{
        left: state.position.x,
        top: state.position.y,
        opacity: 1,
      }}
      role="menu"
    >
      {cloneChildren(children)}
    </div>
  );
};

ContextMenu.Item = MenuItem;
ContextMenu.Separator = Separator;

export default ContextMenu;
