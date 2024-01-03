import React, {FC} from "react";


export type AvatarProps = {
    src: string | Array<string>
    name?: string
    subTitle?: string
}

export const Avatar: FC<AvatarProps> = ({ src, name, subTitle}) => {
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
                        alt={name}
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
