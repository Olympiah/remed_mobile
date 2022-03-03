/**
 * 
 * @param {*} users An Array of all users
 * @param {*} isDoctor condition to filter all users with
 * @returns An Array of filtered results.
 */

function users_filter(users, isDoctor){
    if (isDoctor){
        var filtered_users = users.filter(x => x.isDoctor === false);
    } else {
        var filtered_users = users.filter(x => x.isDoctor);
    }
    return filtered_users;
}

export default users_filter;