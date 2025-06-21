import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 產生過去 8 個月的日期
      const dates = [];
      const today = new Date();
      for (let i = 7; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        dates.push({
          name: d.toLocaleString('en-US', { month: 'short' }),
          dateString: `${year}-${month}-01`,
        });
      }

      // 串接 Frankfurter API
      const promises = dates.map(d => 
        fetch(`https://api.frankfurter.app/${d.dateString}?from=EUR&to=GBP,USD`)
      );
      
      const responses = await Promise.all(promises);
      const results = await Promise.all(responses.map(res => {
        if (!res.ok) throw new Error(`Failed to fetch data`);
        return res.json();
      }));

      // 整理成圖表所需格式
      const chartData = results.map((result, index) => ({
        name: dates[index].name,
        USD: result.rates.USD,
        GBP: result.rates.GBP,
      }));
      
      setData(chartData);
      setError(null);
    } catch (err) {
      setError('無法獲取匯率數據，請稍後再試');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const commonBoxStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  };

  if (loading) {
    return (
      <Box sx={commonBoxStyles}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={commonBoxStyles}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4}}>
        第二題：串接公開 API 畫圖表
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom align="right" sx={{ color: 'text.secondary' }}>
            圖表
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'dataMax + 0.5']} />
              <Tooltip
                cursor={{ fill: 'rgba(240, 240, 240, 0.5)' }}
                contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                formatter={(value, name) => [value.toFixed(3), name]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar dataKey="GBP" stackId="a" fill="#82ca9d" name="EUR to GBP" barSize={40} />
              <Bar dataKey="USD" stackId="a" fill="#8884d8" name="EUR to USD" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          📊 使用 Recharts 圖表庫
        </Typography>
        <Typography variant="body2" color="textSecondary">
          🔗 串接 Frankfurter.app 公開 API (獲取匯率數據)
        </Typography>
        <Typography variant="body2" color="textSecondary">
          📈 實現堆疊長條圖 (Stacked Bar Chart)
        </Typography>
        <Typography variant="body2" color="textSecondary">
          🎯 包含圖例 (Legend) 和工具提示 (Tooltip)
        </Typography>
      </Box>
    </Box>
  );
};

export default ChartComponent; 