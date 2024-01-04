import React, {FC} from "react";


export type AvatarProps = {
    src: string | Array<string>
    alt?: string
    name?: string
    subTitle?: string
    loading?: 'lazy' | 'eager'
}

export const Avatar: FC<AvatarProps> = ({ src, name, subTitle, loading}) => {
    const alt = name || 'アバター画像'
    const srcList = Array.isArray(src) ? src : [src]

    return (
        <div className="avatar">
            {srcList.map((src, i) => (
                <a
                    key={i}
                    className="avatar__photo-link avatar__photo avatar__photo--lg"
                    target="_blank"
                    href={src}
                >
                    <img
                        title={alt}
                        loading={loading}
                        alt={alt}
                        src={src} />
                </a>
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
