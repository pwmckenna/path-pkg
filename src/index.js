import path from 'path';
import findRoot from 'find-root';

export default pathname => {
  const match = pathname.match('(.*\/node_modules\/[^/]*)');
  const root = match ? match[0] : findRoot(pathname);
  const pkgPath = path.resolve(root, 'package.json');
  return require(pkgPath);
};
