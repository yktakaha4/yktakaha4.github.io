import { CSSProperties, FC } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaCodeMerge, FaNewspaper } from 'react-icons/fa6';

export type Icon = 'heart' | 'publisher' | 'prMerge';

export type TagColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | undefined;

export type TagProps = {
  icon?: Icon;
  name: string;
  color?: TagColor;
};

const createIcon = (icon: Icon) => {
  const defaultStyle: CSSProperties = {
    marginRight: '0.2rem',
    verticalAlign: 'bottom',
  };
  switch (icon) {
    case 'heart':
      return <FaHeart style={{ ...defaultStyle }} />;
    case 'publisher':
      return <FaNewspaper style={{ ...defaultStyle }} />;
    case 'prMerge':
      return <FaCodeMerge style={{ ...defaultStyle }} />;
  }
};

export const Tag: FC<TagProps> = ({ icon, name, color }) => {
  return (
    <div
      className={`badge badge--${color ?? 'secondary'}`}
      style={{ whiteSpace: 'nowrap' }}
    >
      {icon && createIcon(icon)}
      {name.trim()}
    </div>
  );
};
