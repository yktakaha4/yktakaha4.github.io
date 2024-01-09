import { FC } from 'react';
import dayjs from 'dayjs';
import { getCustomFieldValue } from '@/constants';
import Link from '@docusaurus/Link';

export const Timestamp: FC = () => {
  const buildAt = getCustomFieldValue('buildAt');
  const commitHash = getCustomFieldValue('commitHash');
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
