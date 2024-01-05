import {FC} from "react";
import dayjs from "dayjs";


export const Timestamp: FC = () => {
    return (
        <>内容は{dayjs().format('YYYY/M/D')}時点の情報です</>
    );
};
