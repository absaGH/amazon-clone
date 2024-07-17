import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from './exercise2.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(today.add(1, 'month').format('MMMM, D'));
console.log(today.subtract(1, 'month').format('MMMM, D'));
console.log(deliveryDate.format('MMMM,  D'));
console.log(deliveryDate.format('dddd'));

/*function isWeekend(date) {
    console.log(date.format('dddd'));
}*/

//console.log(isWeeKend(dayjs()));
console.log(isSatSun(dayjs()));

function caldulatedelivery(deliverydate, r) {
    let remainingday = r;
    deliverydate = deliverydate;
    while(remainingday) {
        deliverydate = deliverydate.add(r, 'days');
        if(!isSatSun(deliverydate))
        {
            remainingday -= 1;
        }
    }
    return deliverydate;
}

console.log(caldulatedelivery(today, 3).format('MMMM, dddd, D'));

