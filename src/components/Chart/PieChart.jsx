import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


const PieChartData = ({ orderStatusData }) => {
    const data = Object.keys(orderStatusData).map((key, index) => ({
        id: index,
        value: orderStatusData[key],
        label: key,
    }));

    return (
        <PieChart
            series={[
                {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
                },
            ]}
            height={200}
            colors={['#82D9FF', '#FFAF82', '#8DD3BB', '#B5659E', '#B82626']}
        />
    );
};

export default PieChartData;