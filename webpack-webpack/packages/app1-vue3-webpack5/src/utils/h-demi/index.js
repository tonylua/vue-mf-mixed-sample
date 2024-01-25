// https://raw.githubusercontent.com/dnldsht/vue-insta-stories/main/packages/lib/src/utils/h-demi.ts

import { h as hDemi, isVue2 } from "vue-demi";

/**
 * @typedef {Object} Options
 * @property {Object} [props]
 * @property {Object} [domProps]
 * @property {Object} [on]
 */

/**
 * @param {Object} ons
 * @returns {Record<string, any>}
 */
const adaptOnsV3 = (ons) => {
  if (!ons) return null;
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
};

/**
 * 将 options 统一为 vue2 的非扁平写法
 * @see https://juejin.cn/post/7158811544132780040
 * @param {Object | String} type
 * @param {Options} [options]
 * @param {any} [chidren]
 * @returns {ReturnType<hDemi>}
 */
const h = (type, options = {}, chidren) => {
  if (isVue2) return hDemi(type, options, chidren);

  const { props, domProps, on, ...rest } = options;

  return hDemi(
    type,
    { ...rest, ...props, ...domProps, ...adaptOnsV3(on) },
    chidren
  );
};

const slot = (s, attrs) => {
  if (typeof s == "function") return s(attrs);
  return s;
};

export { slot };
export default h;
