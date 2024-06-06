import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// const valueFormatter = (value: number | null) => `${value}mm`;

const ApexChart = ({ orderMonthData }) => {
    const dataset = orderMonthData.map((data) => ({
        month: data.time,
        money_received: data.money_received,
        money_cancellation: data.money_cancellation,
        money_cancel: data.money_cancel,
    }));

    const chartSetting = {
        yAxis: [
            {
                label: 'VND',
            },
        ],
        width: 1200,
        height: 500,
    };
    const valueFormatter = (value) => {
        if (value === null) return '';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                { dataKey: 'money_received', label: 'Đơn hàng hoàn thành', valueFormatter },
                { dataKey: 'money_cancellation', label: 'Đơn hàng hoàn trả', valueFormatter },
                { dataKey: 'money_cancel', label: 'Đơn hàng bị hủy', valueFormatter },
            ]}
            colors={['#65B599', '#B5659E', '#B82626']}
            {...chartSetting}
        />
    );
}
export default ApexChart;