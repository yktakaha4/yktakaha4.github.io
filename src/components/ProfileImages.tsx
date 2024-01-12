import { FC } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getCustomFields } from '@/constants';

export const ProfileImages: FC = () => {
  const { isProduction: absolute } = getCustomFields();
  const src = [
    {
      src: useBaseUrl(require('@site/static/img/icon.jpg').default, {
        absolute,
      }),
      alt: 'コウテイペンギン',
      srcSets: [
        {
          src: require('@site/static/img/icon_thumb.jpg').default,
          width: '128w',
        },
        {
          src: require('@site/static/img/icon.jpg').default,
          width: '400w',
        },
      ],
      sources: [
        {
          type: 'image/webp',
          srcset: require('@site/static/img/icon_thumb.webp').default,
        },
      ],
    },
    {
      src: useBaseUrl(require('@site/static/img/yktakaha4.jpg').default, {
        absolute,
      }),
      alt: '近影',
      srcSets: [
        {
          src: require('@site/static/img/yktakaha4_thumb.jpg').default,
          width: '128w',
        },
        {
          src: require('@site/static/img/yktakaha4.jpg').default,
          width: '400w',
        },
      ],
      sources: [
        {
          type: 'image/webp',
          srcset: require('@site/static/img/yktakaha4_thumb.webp').default,
        },
      ],
    },
  ];
  return <Avatar src={src} />;
};
