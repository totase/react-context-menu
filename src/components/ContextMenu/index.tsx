import { ReactNode, useCallback, useEffect, useState } from "react";

import MenuItem from "components/MenuItem";
import Separator from "components/Separator";
import { cloneChildren, getCursorPosition } from "utils";
import { hideEvents } from "utils/constants";

import styles from "./styles.module.css";

interface ContextMenuProps {
  triggerId: string;
  children: ReactNode;
}

const ContextMenu = ({ triggerId, children }: ContextMenuProps) => {
  const [state, setState] = useState({
    active: false,
    position: { x: 0, y: 0 },
  })

  const show = useCallback(
    (event: MouseEvent) => {
      const mousePos = getCursorPosition(event);

      if (JSON.stringify(state.position) === JSON.stringify(mousePos)) return;

      event.stopPropagation();
      event.preventDefault();

      setState({
        active: true,
        position: mousePos,
      });
    },
    [state.position]
  );

  const hide = useCallback(() => {
    setState({
      active: false,
      position: { x: 0, y: 0 },
    });
  }, []);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);

    if (trigger) trigger.addEventListener("contextmenu", show);
    if (state.active) {
      for (const event of hideEvents) window.addEventListener(event, hide);
    }

    return () => {
      trigger?.removeEventListener("contextmenu", show);

      for (const event of hideEvents) window.removeEventListener(event, hide);
    };
  }, [triggerId, state.active, state.position, show, hide]);

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
