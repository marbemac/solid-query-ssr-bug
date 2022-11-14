import { hydrate } from 'solid-js/web';

import { Browser } from './Browser';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
hydrate(() => <Browser />, document.getElementById('app')!);
