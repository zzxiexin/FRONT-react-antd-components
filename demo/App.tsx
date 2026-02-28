import React from 'react';
import { Button, useThemeSwitcher, useTheme, ThemeProvider } from '../src';

const ThemeDemo: React.FC = () => {
  const { switchToLightTheme, switchToDarkTheme, switchToCustomTheme, resetTheme } = useThemeSwitcher();
  const { currentTheme } = useTheme();

  const handleCustomTheme = () => {
    switchToCustomTheme({
      primaryColor: '#ff6b6b',
      successColor: '#51cf66',
      warningColor: '#ffd43b',
      errorColor: '#ff8787',
      textColor: '#2b2d42',
      backgroundColorBase: '#eee',
      backgroundColorLight: '#ffffff'
    });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--background-color-base, #fafafa)', minHeight: '100vh' }}>
      <h1 style={{ color: 'var(--text-color, #262626)' }}>动态主题组件库演示</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--text-color, #262626)' }}>当前主题配置:</h3>
        <pre style={{ 
          backgroundColor: 'var(--background-color-light, #ffffff)', 
          padding: '10px', 
          borderRadius: '4px',
          color: 'var(--text-color, #262626)'
        }}>
          {JSON.stringify(currentTheme, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--text-color, #262626)' }}>主题切换:</h3>
        <Button type="primary" onClick={switchToLightTheme} style={{ marginRight: '8px' }}>
          浅色主题
        </Button>
        <Button type="primary" onClick={switchToDarkTheme} style={{ marginRight: '8px' }}>
          深色主题
        </Button>
        <Button type="primary" onClick={handleCustomTheme} style={{ marginRight: '8px' }}>
          自定义主题
        </Button>
        <Button onClick={resetTheme}>
          重置主题
        </Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--text-color, #262626)' }}>按钮组件演示:</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button type="primary">主要按钮</Button>
          <Button type="default">默认按钮</Button>
          <Button type="danger">危险按钮</Button>
          <Button type="link">链接按钮</Button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button type="primary" size="large">大按钮</Button>
          <Button type="primary" size="middle">中按钮</Button>
          <Button type="primary" size="small">小按钮</Button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button type="primary" disabled>禁用按钮</Button>
          <Button type="primary" loading>加载中</Button>
        </div>
      </div>

      <div>
        <h3 style={{ color: 'var(--text-color, #262626)' }}>CSS变量演示:</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginTop: '16px'
        }}>
          <div style={{ 
            backgroundColor: 'var(--primary-color, #1890ff)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            主色调
          </div>
          <div style={{ 
            backgroundColor: 'var(--success-color, #52c41a)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            成功色
          </div>
          <div style={{ 
            backgroundColor: 'var(--warning-color, #fa8c16)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            警告色
          </div>
          <div style={{ 
            backgroundColor: 'var(--error-color, #f5222d)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            错误色
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  );
};

export default App;
