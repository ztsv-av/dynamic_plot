function getWorkingDays() {
    var current = '2020-06-01';
    var end = 89;
    var weekdays = [];
    var i = 0;
    while (i < end) {
        if (!isWeekEnd(current)) {
            toPush = current.replace(/['"]+/g, '')
            weekdays.push(toPush);
            i++;
        }
        currentObj = new Date(current);
        currentObjNext = addDays(currentObj, 1);
        current = formatDate(currentObjNext)
    }
    return weekdays
}

function isWeekEnd(date) {
    dateObj = new Date(date);
    if (dateObj.getDay() == 6 || dateObj.getDay() == 0) {
        return true;
    } else {
        return false;
    }
}

function addDays(date, days) {
    result = date
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date) {
    dd = date.getDate();
    mm = date.getMonth() + 1;
    yy = date.getFullYear()
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return "'" + yy + '-' + mm + '-' + dd + "'"
}
var days = getWorkingDays()


    // var sending = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(days)
    // }
    // fetch('/s', sending)





// var start = '2020-06-01 00:00';
// var daysAhead = 5;

// var getWorkingDays = function(start,endCount){		
//     var weekdays = [];
//     var current = start;

//     var i = 0; 
//     while(i < endCount){
//         if (!isWeekEnd(current)) {
//             weekdays.push(current);
//             i++;
//         }
//         currentObj = new Date(current);
//         current = currentObj.addDays(1).format();
//     }

//     function isWeekEnd(date){
//         dateObj = new Date(date);
//         if (dateObj.getDay() == 6 || dateObj.getDay() == 0) {
//             return true;
//         }else{
//             return false;
//         }
//     }

//     return weekdays;
// }

// // check if weekend
// // isWeekEnd = function(date){
// //     dayOfWeek = date.getDay();
// //     return (dayOfWeek == 6 || dayOfWeek == 0);
// // }

// // // check if value exist in array
// // Array.prototype.contains = function(obj) {
// //     var i = this.length;
// //     while (i--) {
// //         if (this[i] == obj) {
// //             return true;
// //         }
// //     }
// //     return false;
// // }

// // get next day
// Date.prototype.addDays = function(days) {
//     var dat = new Date(this.valueOf())
//     dat.setDate(dat.getDate() + days);
//     return dat;
// }

// //format date
// Date.prototype.format = function() {
//     var mm = this.getMonth() + 1;
//     var dd = this.getDate();
//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     if (dd < 10) {
//         dd = '0' + dd;
//     }
//     return this.getFullYear()+'-'+mm+'-'+dd;
// };

// var result = getWorkingDays(start,daysAhead);
// // result.forEach(function(item,index){
// //   document.getElementById('result').insertAdjacentHTML('beforeend','<span>'+item+'<br>');
// // })
// console.log(result);