// /src/components/PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const PieChart = ({ selectedMonth }) => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchPieChart = async () => {
            const response = await axios.get('http://localhost:5000/api/pie-chart', {
                params: { month: selectedMonth }
            });
            setPieData(response.data);
        };
        fetchPieChart();
    }, [selectedMonth]);

    const chartData = {
        labels: pieData.map(item => item._id),
        datasets: [{
            label: 'Number of Items',
            data: pieData.map(item => item.count),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ]
        }]
    };

    return <Pie data={chartData} />;
};

export default PieChart;
