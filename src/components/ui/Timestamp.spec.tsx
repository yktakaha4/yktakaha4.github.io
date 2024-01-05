import {render} from "@testing-library/react";
import {Timestamp} from "@/components/ui/Timestamp";
import dayjs from "dayjs";


describe('Timestamp', () => {
    test('現在時刻が描画される', () => {
        const {container} = render(
            <Timestamp/>,
        );
        expect(container.textContent).toBe(`内容は${dayjs().format('YYYY/M/D')}時点の情報です`);
    })
});
