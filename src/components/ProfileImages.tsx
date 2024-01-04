import { FC } from 'react';
import { Avatar } from '@/components/ui/Avatar';

export const ProfileImages: FC = () => {
  const src = [
    //
    require('@site/static/img/icon.jpg').default,
    require('@site/static/img/yktakaha4.jpg').default,
  ];
  return <Avatar src={src} />;
};
