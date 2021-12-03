#!/usr/bin/env node

import { startWatch } from './watch';
import * as TS from 'typescript';

(async () => {
  await startWatch();
})();
