import { ReactNode } from 'react';

import { ContextMenuContext, ContextMenuContextProps } from './context';

export interface ContextProviderProps extends ContextMenuContextProps {
  children: ReactNode;
}

const ContextProvider = ({ hide, children }: ContextProviderProps) => {
  return <ContextMenuContext.Provider value={{ hide }}>{children}</ContextMenuContext.Provider>;
};

export default ContextProvider;
export { ContextMenuContext };
