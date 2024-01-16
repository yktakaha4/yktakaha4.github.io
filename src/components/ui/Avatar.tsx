import React, { FC } from 'react';
import Link from '@docusaurus/Link';

export type Src = {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
  srcSets?: Array<{
    src: string;
    width: string;
  }>;
  sizes?: Array<{
    size: string;
  }>;
  sources?: Array<{
    type: string;
    srcset: string;
  }>;
};

export type AvatarProps = {
  src: Src | Array<Src>;
  name?: string;
  subTitle?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
};

export const Avatar: FC<AvatarProps> = ({ src, name, subTitle, loading, decoding }) => {
  const srcList = Array.isArray(src) ? src : [src];

  const alt = ({ alt }: Src) => alt || 'アバター画像';
  const srcSet = ({ srcSets }: Src) =>
    srcSets?.map(({ src, width }) => `${src} ${width}`).join(',');
  const sizes = ({ sizes }: Src) => sizes?.map(({ size }) => size).join(',');

  return (
    <div className="avatar">
      {srcList.map((src, i) => (
        <Link
          key={i}
          className="avatar__photo-link avatar__photo avatar__photo--lg"
          target="_blank"
          to={src.src}
        >
          <picture>
            {src.sources?.map(({ type, srcset }, i) => (
              <source key={i} type={type} srcSet={srcset} />
            ))}
            <img
              title={alt(src)}
              loading={loading}
              decoding={decoding}
              alt={alt(src)}
              src={src.src}
              srcSet={srcSet(src)}
              sizes={sizes(src)}
              width={src.width}
              height={src.height}
            />
          </picture>
        </Link>
      ))}
      <div className="avatar__intro">
        <div className="avatar__name">{name}</div>
        <small className="avatar__subtitle">{subTitle}</small>
      </div>
    </div>
  );
};
