import assert from 'assert';
import pathPkg from '../src';
import path from 'path';
import rpt from 'read-package-tree';
import { countBy, range } from 'lodash';

describe('path-pkg', () => {
  it('tests a module that is written by the author of this repo', () => {
    const modulePath = path.resolve(__dirname, '../node_modules/eslint-config-pwmckenna/');
    const pkg = pathPkg(modulePath);
    assert.equal(pkg.name, 'eslint-config-pwmckenna', 'expected eslint-config-pwmckenna to have the same author as this repo');
  });
  it('tests all files including dependencies and does not take forever', function sameAuthorSpeedTest(done) {
    this.timeout(10000);
    rpt(process.cwd(), (err, data) => {
      const getNodePaths = node => node.children.reduce((aggregator, child) => (
        aggregator.concat(getNodePaths(child))
      ), [node.path]);
      const paths = getNodePaths(data).reduce((prev, next) => (
        [...prev, ...range(500).map(n => `${next}/${n}`)]
      ), []);
      console.log(countBy(paths.map(pathPkg), 'name'));
      done(err);
    });
  });
});
