import Vue from "vue";
import {
  remotes,
  shareScopes,
  initSharing,
  registerShared,
  findShared,
  registerRemotes,
  findRemote,
  findModule,
} from "module-federation-runtime";

/** @type {import('./types.d.ts').DynamicGetFederated} */
export const getWebpackFederated = async (options, ...componentNames) => {
  const { remoteAppName, remoteEntryURL } = options;

  await registerRemotes({
    [remoteAppName]: {
      url: remoteEntryURL,
    },
  });
  const res = [];
  for await (let value of componentNames) {
    const remoteModule = await findModule(remoteAppName, `./${value}`);
    res.push({
      name: value,
      component: remoteModule,
    });
  }
  return res;
};
