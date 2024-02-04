// 动态引入远端MF组件
export type DynamicGetFederated = (
  remoteAppName: string,
  remoteEntryURL: string,
  ...componentNames: string[]
) => Promise<
  {
    name: string;
    component: any;
  }[]
>;
