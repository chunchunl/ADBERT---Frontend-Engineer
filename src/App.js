import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  CssBaseline, 
  Container, 
  Box, 
  Divider, 
  Typography, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CounterButtonGroup from './components/ButtonGroup';
import ChartComponent from './components/ChartComponent';

// 創建 Material-UI 主題
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '12px',
        },
      },
    },
  },
});

function App() {
  const features = [
    '使用 Material-UI 的 ButtonGroup 和 CSS API 實現美觀的按鈕組',
    '使用 Redux Toolkit 管理狀態，實現計數器和按鈕禁用邏輯',
    '串接 Frankfurter.app 公開 API 獲取真實匯率數據',
    '使用 Recharts 實現堆疊長條圖 (Stacked Bar Chart)',
    '包含圖例 (Legend) 和工具提示 (Tooltip)',
    '響應式設計，適配不同螢幕尺寸',
    '錯誤處理和載入狀態',
  ];

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  mb: 1,
                }}
              >
                ADBERT 前端工程師面試題目 - 林昱均
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                使用 React + Material-UI + Redux + Recharts 實現
              </Typography>
            </Box>

            {/* 第一題 */}
            <CounterButtonGroup />
            
            <Divider sx={{ my: 4 }} />
            
            {/* 第二題 */}
            <ChartComponent />
            
            <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h5" component="h3" sx={{ color: 'primary.main', mb: 2 }}>
                📋 項目特色
              </Typography>
              <List dense>
                {features.map((feature, index) => (
                  <ListItem key={index} sx={{ py: 0.5, pl: 0 }}>
                    <Typography component="span" sx={{ mr: 1.5 }}>✅</Typography>
                    <ListItemText 
                      primary={feature} 
                      primaryTypographyProps={{ color: 'text.secondary' }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 