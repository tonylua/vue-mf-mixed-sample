import { getWebpackFederated } from "./webpack";
import { getViteFederated } from "./vite";

/** @type {import('./types.d.ts').DynamicGetFederated} */
export const getRemoteDynamic = (options, ...componentNames) => {
  const fn =
    options.remoteType === "vite" ? getViteFederated : getWebpackFederated;
  return fn.call(null, options, ...componentNames);
};
