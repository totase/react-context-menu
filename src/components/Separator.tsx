import { HTMLAttributes } from 'react';
import cx from 'clsx';

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {}

const Separator = ({ className, ...rest }: SeparatorProps) => {
  const classNames = cx('react-context-menu__separator', className);

  return <hr className={classNames} {...rest} />;
};

export default Separator;
