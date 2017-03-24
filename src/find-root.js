export default pathname => {
  const match = pathname.match(/(.*\/node_modules\/(@[^/]*\/)?[^/]*)/);
  return match && match[0];
};
