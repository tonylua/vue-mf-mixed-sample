// 动态引入远端MF组件
export type DynamicGetFederated = (
  options: {
    remoteType?: "vite" | "webpack";
    remoteAppName: string; // 是对方remoteEntry实际暴露的名称，而不是本项目webpack配置中重命名的
    remoteEntryURL: string;
  },
  ...componentNames: string[]
) => Promise<
  {
    name: string;
    component: any;
  }[]
>;
