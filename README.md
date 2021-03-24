# @zppack/glob

An expand package of node-glob.

## Features

- [x] glob (glob.sync)
- [x] glob.union, glob.intersection, glob.difference
- [x] glob minimatch rule with starting char "!" to exclude files

## Start

### Install

```sh
npm install --save @zppack/glob
```

### Usage

```js
import glob from '@zppack/glob';

// following two expressions have same results

glob.union(['**/*', '!.gitignore', '!.git/**', '!node_modules/**'], { dot: true, cwd: path.resolve(__dirname), nodir: true, realpath: true });

glob.difference(['**/*', '.gitignore', '.git/**', 'node_modules/**'], { dot: true, cwd: path.resolve(__dirname), nodir: true, realpath: true });

// intersection mode
glob.intersection(['*.js', 'glob.*']); // result will be `glob.js` only.

```

#### options

Options is the same as [`node-glob` options](https://github.com/isaacs/node-glob).

## Contributing

[How to contribute to this?](CONTRIBUTING.md)

## Recently changes

See the [change log](CHANGELOG.md).

## License

[MIT](LICENSE)
