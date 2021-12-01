#!/usr/bin/env node

import { startWatch } from './watch';

(async () => {
  await startWatch();
})();
