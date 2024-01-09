const { User, Receipt, Item } = require('../models/user');

// Get the most visited merchant
async function getMostVisitedMerchant(userEmail) {
    console.log("Email found is: ", userEmail)
    const user = await User.findOne({email: userEmail});
    if (!user) {
      console.log("no user found")
      return null; // User not found
    }
  
    const merchants = {};
    user.receipts.forEach((receipt) => {
      merchants[receipt.merchant] = (merchants[receipt.merchant] || 0) + 1;
    });
  
    const mostVisitedMerchant = Object.keys(merchants).reduce((a, b) =>
      merchants[a] > merchants[b] ? a : b
    );
    console.log("Most visited: ", mostVisitedMerchant)
    return mostVisitedMerchant;
}
  
// Get the user's budget
async function getUserBudget(userEmail) {
    const user = await User.findOne({email: userEmail});
    return user ? user.budget : null;
}
  
async function getTotalAmountSpent(userEmail) {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        return null; // User not found
    }

    let totalAmount = 0;
    let totalAmountFromItems = 0;
    user.receipts.forEach((receipt) => {
        if (receipt.totalPrice) { // Check if totalPrice exists
            totalAmount += receipt.totalPrice;
        }
    });

    user.receipts.forEach((receipt) => {
        receipt.items.forEach((item) => {
            if (item.price !== null && item.price !== undefined) {
                totalAmountFromItems += item.price; // Add item price
            }
        });
    });
    totalAmount = +totalAmount.toFixed(2);
    totalAmountFromItems = +totalAmountFromItems.toFixed(2);
    console.log("Total spent: ", Math.max(totalAmount, totalAmountFromItems));
    return Math.max(totalAmount, totalAmountFromItems);
}
  
  // Get the list of items
async function getListOfItems(userEmail) {
    const user = await User.findOne({email: userEmail});
    if (!user) {
      return null; // User not found
    }
  
    const items = [];
    user.receipts.forEach((receipt) => {
      receipt.items.forEach((item) => {
        items.push({ name: item.name, price: item.price });
      });
    });
    console.log("Items List: ", items);
    return items;
}

// get list of last 6 months of spendings
async function getAmountSpentEachMonth(userEmail) {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        return null; // User not found
    }

    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const amountsPerMonth = {};

    // Create an array with the last 6 months' names (YYYY-MM)
    const lastSixMonths = [];
    for (let i = 0; i < 6; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        lastSixMonths.push(`${date.getMonth() + 1}-${date.getFullYear()}`);
    }

    // Initialize amountsPerMonth object with keys for the last 6 months
    lastSixMonths.forEach((monthYearKey) => {
        amountsPerMonth[monthYearKey] = 0;
    });

    user.receipts.forEach((receipt) => {
        if (receipt.date >= sixMonthsAgo && receipt.date <= currentDate) {
            let totalFromReceipts = 0;
            let totalFromItems = 0;
            const monthYearKey = `${receipt.date.getMonth() + 1}-${receipt.date.getFullYear()}`;

            totalFromReceipts += receipt.totalPrice || 0; // Add totalPrice, default to 0 if undefined

            receipt.items.forEach((item) => {
                totalFromItems += item.price || 0;
            })

            console.log()

            amountsPerMonth[monthYearKey] += Math.max(totalFromReceipts, totalFromItems);
        }
    });

    lastSixMonths.forEach((monthYearKey) => {
        amountsPerMonth[monthYearKey] = +amountsPerMonth[monthYearKey].toFixed(2);
    });


    console.log("Per month list: ", amountsPerMonth);
    return amountsPerMonth;
}

// Get the amount spent this month
async function getAmountSpentThisMonth(userEmail) {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        return null; // User not found
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let amountSpentThisMonth = 0;
    let totalFromReceipts = 0;
    let totalFromItems = 0;

    user.receipts.forEach((receipt) => {
        const receiptDate = new Date(receipt.date);
        const receiptMonth = receiptDate.getMonth();
        const receiptYear = receiptDate.getFullYear();

        if (receiptMonth === currentMonth && receiptYear === currentYear) {
            totalFromReceipts += receipt.totalPrice || 0;
            receipt.items.forEach((item) => {
                totalFromItems += item.price;
            })
        }
    });
    amountSpentThisMonth = Math.max(totalFromReceipts, totalFromItems);
    amountSpentThisMonth = +amountSpentThisMonth.toFixed(2);
    console.log("Amount spent this month:", amountSpentThisMonth);
    return amountSpentThisMonth;
}

const fetchDashboardInfo = async (req, res) => {
    try {
        const userEmail = req.query.uEmail;
        console.log("email in dash controller: ", userEmail)

        const mostVisitedMerchant = await getMostVisitedMerchant(userEmail)
        const userBudget = await getUserBudget(userEmail)
        const amountSpentEachMonth = await getAmountSpentEachMonth(userEmail)
        const amountSpentThisMonth = await getAmountSpentThisMonth(userEmail)
        const listOfItems = await getListOfItems(userEmail)
        const totalAmountSpent = await getTotalAmountSpent(userEmail)

        const dashboardData = {
          mostVisitedMerchant,
          userBudget,
          amountSpentThisMonth,
          amountSpentEachMonth,
          listOfItems,
          totalAmountSpent
        };

        console.log("dashboard data")
        console.log(dashboardData)

        res.json(dashboardData);

    } catch (error) {
        console.log(error);
    }
}

module.exports = { 
    fetchDashboardInfo
};
