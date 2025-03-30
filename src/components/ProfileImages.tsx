import { FC } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getCustomFields } from '@/components/helper';
import iconJpg from '@site/static/img/icon.jpg';
import iconThumbJpg from '@site/static/img/icon_thumb.jpg';
import iconThumbWebp from '@site/static/img/icon_thumb.webp';
import yktakaha4Jpg from '@site/static/img/yktakaha4.jpg';
import yktakaha4ThumbJpg from '@site/static/img/yktakaha4_thumb.jpg';
import yktakaha4ThumbWebp from '@site/static/img/yktakaha4_thumb.webp';

export const ProfileImages: FC = () => {
  const { isProduction: absolute } = getCustomFields();
  const src = [
    {
      src: useBaseUrl(iconJpg, {
        absolute,
      }),
      alt: 'コウテイペンギン',
      srcSets: [
        {
          src: iconThumbJpg,
          width: '128w',
        },
        {
          src: iconJpg,
          width: '400w',
        },
      ],
      sources: [
        {
          type: 'image/webp',
          srcset: iconThumbWebp,
        },
      ],
    },
    {
      src: useBaseUrl(yktakaha4Jpg, {
        absolute,
      }),
      alt: '近影',
      srcSets: [
        {
          src: yktakaha4ThumbJpg,
          width: '128w',
        },
        {
          src: yktakaha4Jpg,
          width: '400w',
        },
      ],
      sources: [
        {
          type: 'image/webp',
          srcset: yktakaha4ThumbWebp,
        },
      ],
    },
  ];
  return <Avatar src={src} loading="lazy" decoding="async" />;
};
