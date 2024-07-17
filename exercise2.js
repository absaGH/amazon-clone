import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
/*console.log(today.add(1, 'month').format('MMMM, D'));
console.log(today.subtract(1, 'month').format('MMMM, D'));
console.log(deliveryDate.format('MMMM,  D'));
console.log(deliveryDate.format('dddd'));*/

export default function isWeeKend(date) {
    const newDate = date.format('dddd');
    return newDate === 'sunday' || newDate === 'saturday' ? true : false;
}
