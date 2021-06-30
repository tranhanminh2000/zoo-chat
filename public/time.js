function getTime(){
    setInterval(function(){
    let time = new Date()

    let day = dayInWeek(time.getDay());
    let date = time.getDate();
    let month = monthInYear(time.getMonth());
    let year = time.getFullYear();
    let h = zero(time.getHours())
    let m = zero(time.getMinutes())
    let s = zero(time.getSeconds())
    let amopm = aop(h)
    $('#time').html(`${h}:${m}:${s} ${amopm}
                    <br>
                    ${day}, ${month} ${date},${year}`)
    },1000)
}

function zero(i){
    if(i < 10){
        return "0"+i 
    }
    return i
}

function aop(h){
    if(h>=0 && h<12){
        return 'AM'
    }
    return 'PM'
}

function dayInWeek(day){
    switch(day){
        case 0: return 'Monday';break;
        case 1: return 'Tuesday';break;
        case 2: return 'Wednesday';break;
        case 3: return 'Thursday';break;
        case 4: return 'Friday';break;
        case 5: return 'Saturday';break;
        case 6: return 'Sunday';break;
    }
}

function monthInYear(month){
    switch(month){
        case 0: return 'Jan ';break;
        case 1: return 'Feb ';break;
        case 2: return 'March ';break;
        case 3: return 'April ';break;
        case 4: return 'May ';break;
        case 5: return 'June ';break;
        case 6: return 'July ';break;
        case 7: return 'Aug ';break;
        case 8: return 'Sept ';break;
        case 9: return 'Oct ';break;
        case 10: return 'Nov ';break;
        case 11: return 'Dec ';break;
    }
}

module.exports = function(){
    let time = new Date();
    let h = zero(time.getHours())
    let m = zero(time.getMinutes())
    let amopm = aop(h)
    return `${h}:${m} ${amopm}`
}