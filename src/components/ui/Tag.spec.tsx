import { Icon, Tag, TagColor } from '@/components/ui/Tag';
import { render } from '@testing-library/react';

describe('Tag', () => {
  test.each<[Icon | undefined, string, TagColor, string, string]>([
    [
      undefined,
      '\x20Tag\x20\x20ｎａｍｅ\x20',
      'primary',
      'Tag\x20\x20ｎａｍｅ',
      'primary',
    ],
    [undefined, 'Tag', 'secondary', 'Tag', 'secondary'],
    ['heart', 'ﾀｸﾞ名', undefined, 'ﾀｸﾞ名', 'secondary'],
  ])(
    'タグが描画される #%#',
    (icon, name, color, expectedName, expectedColor) => {
      const { container } = render(
        <Tag icon={icon} name={name} color={color} />,
      );
      const div = container.getElementsByTagName('div');
      expect(div.length).toBe(1);
      expect(div[0].textContent).toBe(expectedName);
      expect(div[0].className).toBe(`badge badge--${expectedColor}`);

      const svg = div[0].getElementsByTagName('svg');
      expect(svg.length).toBe(icon ? 1 : 0);
    },
  );
});
