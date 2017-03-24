import assert from 'assert';
import pathPkg from '../src';
import path from 'path';
import rpt from 'read-package-tree';
import { countBy, range } from 'lodash';
import findRoot from 'find-root';
import findRootFast from '../src/find-root';

describe('path-pkg', () => {
  it('tests a module', () => {
    const modulePath = path.resolve(__dirname, '../node_modules/eslint-config-pwmckenna/');
    const pkg = pathPkg(modulePath);
    assert.equal(pkg.name, 'eslint-config-pwmckenna', 'expected package name to be "eslint-config-pwmckenna"');
  });
  it('tests a scoped module', () => {
    const modulePath = path.resolve(__dirname, '../node_modules/@webpack-blocks/core/');
    const pkg = pathPkg(modulePath);
    assert.equal(pkg.name, '@webpack-blocks/core', 'expected package name to be "@webpack-blocks/core"');
  });
  it('tests all files including dependencies and internal find-root matches find-root dependency', done => {
    rpt(process.cwd(), (err, data) => {
      const getNodePaths = node => node.children.reduce((aggregator, child) => (
        aggregator.concat(getNodePaths(child))
      ), [node.path]);
      const paths = getNodePaths(data);
      paths.forEach(p => {
        if (p !== path.resolve(__dirname, '..')) {
          assert.equal(findRoot(p), findRootFast(p));
        }
      });
      done(err);
    });
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
