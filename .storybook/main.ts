import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // 确保有 rules 数组
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // 添加 TypeScript 处理规则，使用 ts-loader
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true, // 加快编译速度
            compilerOptions: {
              jsx: 'react',
              allowSyntheticDefaultImports: true,
              esModuleInterop: true,
            },
          },
        },
      ],
    });
    
    // 添加 LESS 文件处理规则
    config.module.rules.push({
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        {
          loader: require.resolve('less-loader'),
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    });
    
    // 确保 resolve.extensions 包含 .ts 和 .tsx
    config.resolve = config.resolve || {};
    config.resolve.extensions = config.resolve.extensions || [];
    if (!config.resolve.extensions.includes('.ts')) {
      config.resolve.extensions.push('.ts', '.tsx');
    }
    
    return config;
  },
};
export default config;
