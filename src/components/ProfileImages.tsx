import { FC } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getCustomFields } from '@/components/helper';
import Icon from '@site/static/img/icon.jpg';
import IconThumb from '@site/static/img/icon_thumb.jpg';
import IconThumbWebp from '@site/static/img/icon_thumb.webp';
import Yktakaha4 from '@site/static/img/yktakaha4.jpg';
import Yktakaha4Thumb from '@site/static/img/yktakaha4_thumb.jpg';
import Yktakaha4ThumbWebp from '@site/static/img/yktakaha4_thumb.webp';

export const ProfileImages: FC = () => {
  const { isProduction: absolute } = getCustomFields();
  const src = [
    {
      src: useBaseUrl(Icon, {
        absolute,
      }),
      alt: 'コウテイペンギン',
      srcSets: [
        {
          src: IconThumb,
          width: '128w',
        },
        {
          src: Icon,
          width: '400w',
        },
      ],
      sources: [
        {
          type: 'image/webp',
          srcset: IconThumbWebp,
        },
      ],
    },
    {
      src: useBaseUrl(Yktakaha4, {
        absolute,
      }),
      alt: '近影',
      srcSets: [
        {
          src: Yktakaha4Thumb,
          width: '128w',
        },
        {
          src: Yktakaha4,
          width: '400w',
        },
      ],
      sources: [
        {
          type: 'image/webp',
          srcset: Yktakaha4ThumbWebp,
        },
      ],
    },
  ];
  return <Avatar src={src} loading="lazy" decoding="async" />;
};
