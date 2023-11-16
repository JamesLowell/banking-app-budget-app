const KEY = 'user-goals'

/**
 * 
 * []
 * @param {*} user 
 * @param {*} goals 
 */

export function StoreGoals(user, goal) {
    let goals = localStorage.getItem(`${KEY}:${user}`);
    
    if (goals === null || goals === undefined) {
        goals = [];
    } else {
        goals = JSON.parse(goals);
    }

    goals.push(goal);

    localStorage.setItem(`${KEY}:${user}`, JSON.stringify(goals));
}

export function GetGoals(user) {
    let goals = localStorage.getItem(`${KEY}:${user}`);

    return goals === null || goals === undefined ? [] : JSON.parse(goals);
}


export function DeleteGoal(user, index) {
    let goals = localStorage.getItem(`${KEY}:${user}`);

    if (goals === null) {
        return;
    } else {
        goals = JSON.parse(goals);
    }

    if (goals.length <= index) {
        return
    }

    goals.splice(index, 1)

    localStorage.setItem(`${KEY}:${user}`, JSON.stringify(goals));
}
