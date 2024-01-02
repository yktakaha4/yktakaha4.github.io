import {FC} from "react";


export type TagColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | undefined

export interface TagProps {
    name: string
    color?: TagColor
}

export const Tag: FC<TagProps> = ({name, color}) => {
    return <span className={`badge badge--${color ?? 'secondary'}`}>{name.trim()}</span>
}
