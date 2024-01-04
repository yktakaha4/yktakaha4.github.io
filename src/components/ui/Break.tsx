import React, {FC} from "react";

export type BreakProps = {
    line?: boolean
    page?: boolean
}

export const Break: FC<BreakProps | undefined> = (props) => {
    return (
        <>
            {props?.page && <div style={{pageBreakAfter: 'always'}}></div>}
            {props?.line && <hr />}
        </>
    )
}
