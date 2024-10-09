// /src/App.js
import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';



function App() {
    const [selectedMonth, setSelectedMonth] = useState('March');

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div className="App">
            <h1>Transaction Dashboard</h1>
            <div>
                <label>Select Month: </label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
            </div>
            
            {/* Transactions Table */}
            <TransactionsTable selectedMonth={selectedMonth} />

            {/* Statistics */}
            <Statistics selectedMonth={selectedMonth} />

            {/* Bar Chart */}
            <BarChart selectedMonth={selectedMonth} />

            {/* Pie Chart */}
            <PieChart selectedMonth={selectedMonth} />
        </div>
    );
};
export default App;
