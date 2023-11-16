
const KEY = 'user-budget'

/**
 * 
 * []
 * @param {*} user 
 * @param {*} budget 
 */

export function StoreBudget(user, budget) {
    let budgets = localStorage.getItem(`${KEY}:${user}`);
    
    if (budgets === null || budgets === undefined) {
        budgets = [];
    } else {
        budgets = JSON.parse(budgets);
    }

    budgets.push(budget);

    localStorage.setItem(`${KEY}:${user}`, JSON.stringify(budgets));
}

export function GetBudgets(user) {
    let budgets = localStorage.getItem(`${KEY}:${user}`);

    return budgets === null || budgets === undefined ? [] : JSON.parse(budgets);
}


export function DeleteBudget(user, index) {
    let budgets = localStorage.getItem(`${KEY}:${user}`);

    if (budgets === null) {
        return;
    } else {
        budgets = JSON.parse(budgets);
    }

    if (budgets.length <= index) {
        return
    }

    budgets.splice(index, 1)

    localStorage.setItem(`${KEY}:${user}`, JSON.stringify(budgets));
}


