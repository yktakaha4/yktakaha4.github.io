declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import type { ComponentProps, FC } from 'react';
  const Svg: FC<ComponentProps<'svg'>>;
  export default Svg;
}
