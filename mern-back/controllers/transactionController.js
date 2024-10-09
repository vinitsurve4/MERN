const axios = require('axios');
const Transaction = require('./models/Transaction');

const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        await Transaction.deleteMany(); // Clear existing data
        await Transaction.insertMany(data); // Seed new data
        
        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to initialize database' });
    }
};
const listTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    const startDate = new Date(`${month} 1, 2022`);
    const endDate = new Date(`${month} 31, 2022`);

    try {
        const query = {
            dateOfSale: { $gte: startDate, $lte: endDate },
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } }
            ]
        };

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        const total = await Transaction.countDocuments(query);

        res.json({ transactions, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};
const statistics = async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`${month} 1, 2022`);
    const endDate = new Date(`${month} 31, 2022`);

    try {
        const totalSales = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, totalAmount: { $sum: '$price' } } }
        ]);

        const soldItems = await Transaction.countDocuments({
            dateOfSale: { $gte: startDate, $lte: endDate },
            sold: true
        });

        const notSoldItems = await Transaction.countDocuments({
            dateOfSale: { $gte: startDate, $lte: endDate },
            sold: false
        });

        res.json({
            totalSales: totalSales[0]?.totalAmount || 0,
            soldItems,
            notSoldItems
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};
const barChart = async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`${month} 1, 2022`);
    const endDate = new Date(`${month} 31, 2022`);

    try {
        const transactions = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            { 
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "901-above",
                    output: { count: { $sum: 1 } }
                }
            }
        ]);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bar chart data' });
    }
};
const pieChart = async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`${month} 1, 2022`);
    const endDate = new Date(`${month} 31, 2022`);

    try {
        const categories = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pie chart data' });
    }
};
const combinedAPI = async (req, res) => {
    const { month } = req.query;

    try {
        const [transactionsData, statisticsData, barChartData, pieChartData] = await Promise.all([
            listTransactions(req, res),  // Assuming pagination and search applied
            statistics(req, res),
            barChart(req, res),
            pieChart(req, res)
        ]);

        res.json({
            transactions: transactionsData,
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch combined data' });
    }
};

