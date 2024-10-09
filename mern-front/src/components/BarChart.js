// /src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarChart = ({ selectedMonth }) => {
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        const fetchBarChart = async () => {
            const response = await axios.get('http://localhost:5000/api/bar-chart', {
                params: { month: selectedMonth }
            });
            setBarData(response.data);
        };
        fetchBarChart();
    }, [selectedMonth]);

    const chartData = {
        labels: [
            '0-100', '101-200', '201-300', '301-400', '401-500', '501-600',
            '601-700', '701-800', '801-900', '901-above'
        ],
        datasets: [{
            label: 'Number of Items',
            data: barData.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
    };

    return <Bar data={chartData} />;
};

export default BarChart;
