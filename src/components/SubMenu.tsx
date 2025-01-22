import cx from 'clsx';

export interface SubMenuProps {
  label: string;
  className?: string;
  disabled?: boolean;
}

const SubMenu = ({ label, className, disabled }: SubMenuProps) => {
  const classNames = cx('react-context-menu__item', className, {
    'react-context-menu__item--disabled': disabled,
  });

  return (
    <div className={classNames} onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}>
      <div className="react-context-menu__sub-menu">
        {label}
        <span className="react-context-menu__arrow" />
      </div>
    </div>
  );
};

export default SubMenu;
