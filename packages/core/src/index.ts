import { Plugin } from './types';

import {
  sendMessage,
  addEventsListener,
  onReady,
} from './messages';

import { initSocket } from './socket';

import * as utils from './utils';

const o3dapiCore: any = {};
const isBrowser = typeof window !== 'undefined';

o3dapiCore.initPlugins = (plugins: Plugin[]) => {
  plugins.forEach(plugin => {
    o3dapiCore[plugin.blockchain] = new plugin(sendMessage, addEventsListener);
  });
};

if (isBrowser) {
  o3dapiCore.isAvailable = Boolean((window as any)._o3dapi.isAvailable);
}

if (!o3dapiCore.isAvailable) {
  initSocket()
  .catch(() => {});
}

o3dapiCore.openO3 = () => window.location.replace('o3network://deep');

o3dapiCore.utils = utils;

o3dapiCore.onReady = onReady;

export default o3dapiCore;
