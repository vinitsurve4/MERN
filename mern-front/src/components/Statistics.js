// /src/components/Statistics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = ({ selectedMonth }) => {
    const [stats, setStats] = useState({ totalSales: 0, soldItems: 0, notSoldItems: 0 });

    useEffect(() => {
        const fetchStatistics = async () => {
            const response = await axios.get('http://localhost:5000/api/statistics', {
                params: { month: selectedMonth }
            });
            setStats(response.data);
        };
        fetchStatistics();
    }, [selectedMonth]);

    return (
        <div className="statistics">
            <div>Total Sales: {stats.totalSales}</div>
            <div>Sold Items: {stats.soldItems}</div>
            <div>Not Sold Items: {stats.notSoldItems}</div>
        </div>
    );
};

export default Statistics;
