// /src/components/TransactionsTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Fetch transactions when the selectedMonth, search or page changes
        const fetchTransactions = async () => {
            const response = await axios.get('http://localhost:5000/api/transactions', {
                params: {
                    month: selectedMonth,
                    search: search,
                    page: page,
                    perPage: 10
                }
            });
            setTransactions(response.data.transactions);
            setTotalPages(Math.ceil(response.data.total / 10)); // Calculate total pages based on the API response
        };
        fetchTransactions();
    }, [selectedMonth, search, page]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search Transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>{`Page ${page}`}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
