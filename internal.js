//internal modules

import { type, release, totalmem, freemem} from 'os';

import {delimiter, sep, dirname} from 'path';

const currentOS = {
  name: type(),
  release: release(),
  totalMem: totalmem(),
  freeMem: freemem(),
}
console.log(currentOS);
console.log(delimiter);
console.log(sep);
console.log(process.env.CLASS);

