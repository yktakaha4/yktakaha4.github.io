import React, {FC} from "react";
import Link from '@docusaurus/Link';

export type AvatarProps = {
    src: string | Array<string>
    alt?: string
    name?: string
    subTitle?: string
    loading?: 'lazy' | 'eager'
}

export const Avatar: FC<AvatarProps> = ({ src, name, subTitle, loading}) => {
    const alt = 'アバター画像'
    const srcList = Array.isArray(src) ? src : [src]

    return (
        <div className="avatar">
            {srcList.map((src, i) => (
                <Link
                    key={i}
                    className="avatar__photo-link avatar__photo avatar__photo--lg"
                    target="_blank"
                    to={src}
                >
                    <img
                        title={alt}
                        loading={loading}
                        alt={alt}
                        src={src} />
                </Link>
            ))}
            <div className="avatar__intro">
                <div className="avatar__name">{name}</div>
                <small className="avatar__subtitle">
                    {subTitle}
                </small>
            </div>
        </div>
    )
}
