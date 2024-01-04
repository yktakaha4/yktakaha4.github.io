export const LinkMock = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
) => {
  const newProps = {
    ...props,
    href: props.to,
  };
  // eslint-disable-next-line @docusaurus/no-html-links
  return <a {...newProps} data-mock="LinkMock" />;
};

export default LinkMock;
