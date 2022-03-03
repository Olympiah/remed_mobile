export const secToDate = secs => {
    var currDate = new Date(null)
    currDate.setTime(secs * 1000);
    var actDate = currDate.toLocaleString();
    return actDate
}