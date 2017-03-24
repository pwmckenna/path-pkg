import path from 'path';
import findRoot from 'find-root';
import findRootFast from './find-root';

export default pathname => {
  const pkgPath = path.resolve(findRootFast(pathname) || findRoot(pathname), 'package.json');
  return require(pkgPath);
};
