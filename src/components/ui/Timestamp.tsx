import { FC } from 'react';
import dayjs from 'dayjs';
import Link from '@docusaurus/Link';
import { getCustomFields } from '@/components/helper';

export const Timestamp: FC = () => {
  const { buildAt, commitHash } = getCustomFields();
  const versionUrl = `https://github.com/yktakaha4/yktakaha4.github.io/tree/${commitHash}`;
  return (
    <table className="capy--plain-table" style={{ fontStyle: 'italic' }}>
      <tbody>
        <tr>
          <th>最終更新日:</th>
          <td>{dayjs(buildAt).format()}</td>
        </tr>
        <tr>
          <th>Version:</th>
          <td>
            <Link to={versionUrl}>{commitHash}</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
