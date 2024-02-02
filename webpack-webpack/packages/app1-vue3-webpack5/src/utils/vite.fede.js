const remotesMap = {};
// remotesMap[ViteRemoteName] = {
//   url: "http://localhost:3003/assets/remoteEntry.js",
//   format: "esm",
//   from: "vite",
// };

const loadJS = async (url, fn) => {
  const resolvedUrl = typeof url === "function" ? await url() : url;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.onload = fn;
  script.src = resolvedUrl;
  document.getElementsByTagName("head")[0].appendChild(script);
};

// function get(name, remoteFrom) {
//     return __federation_import(name).then(module => () => {
//         if (remoteFrom === 'webpack') {
//             return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
//         }
//         return module
//     })
// }

const wrapShareModule = (remoteFrom) => {
  return {
    // vue: xxx
  };
};

async function __federation_import(name) {
  return System.import(name);
}

const initMap = Object.create(null);

async function __federation_method_ensure(remoteId) {
  const remote = remotesMap[remoteId];
  if (!remote.inited) {
    if ("var" === remote.format) {
      // loading js with script tag
      return new Promise((resolve) => {
        const callback = () => {
          if (!remote.inited) {
            remote.lib = window[remoteId];
            remote.lib.init(wrapShareModule(remote.from));
            remote.inited = true;
          }
          resolve(remote.lib);
        };
        return loadJS(remote.url, callback);
      });
    } else if (["esm", "systemjs"].includes(remote.format)) {
      // loading js with import(...)
      return new Promise((resolve, reject) => {
        const getUrl =
          typeof remote.url === "function"
            ? remote.url
            : () => Promise.resolve(remote.url);
        getUrl().then((url) => {
          System.import(url)
            // import(url)
            .then((lib) => {
              if (!remote.inited) {
                const shareScope = wrapShareModule(remote.from);
                lib.init(shareScope);
                remote.lib = lib;
                remote.lib.init(shareScope);
                remote.inited = true;
              }
              resolve(remote.lib);
            })
            .catch(reject);
        });
      });
    }
  } else {
    return remote.lib;
  }
}

function __federation_method_unwrapDefault(module) {
  return module?.__esModule || module?.[Symbol.toStringTag] === "Module"
    ? module.default
    : module;
}

function __federation_method_wrapDefault(module, need) {
  if (!module?.default && need) {
    let obj = Object.create(null);
    obj.default = module;
    obj.__esModule = true;
    return obj;
  }
  return module;
}

async function __federation_method_getRemote(remoteName, componentName) {
  return __federation_method_ensure(remoteName).then((remote) =>
    remote.get(componentName).then((factory) => factory())
  );
}

function __federation_method_setRemote(remoteName, remoteConfig) {
  remotesMap[remoteName] = remoteConfig;
}

export default {
  ensure: __federation_method_ensure,
  getRemote: __federation_method_getRemote,
  setRemote: __federation_method_setRemote,
  unwrapDefault: __federation_method_unwrapDefault,
  wrapDefault: __federation_method_wrapDefault,
};
