
import React, { FC } from 'react';

export type MarginProps = {
    children?: React.ReactNode
}

export const Margin: FC<MarginProps> = ({ children }) => {
    return (
        <div style={{ margin: '1rem 0' }}>
            {children}
        </div>
    )
}
