import {FC} from "react";


export type TagColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | undefined

export type TagProps = {
    icon?: string
    name: string
    color?: TagColor
}

export const Tag: FC<TagProps> = ({icon, name, color}) => {
    return <span className={`badge badge--${color ?? 'secondary'}`} style={{whiteSpace: 'nowrap'}}>{icon ? `${icon}\x20` : ''}{name.trim()}</span>
}
