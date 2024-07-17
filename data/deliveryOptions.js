import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) { 
        let deliveryOption;

        deliveryOptions.forEach((option) => {
        //console.log(option);
        //console.log(deliveryOptionId);
        if (option.id === deliveryOptionId) {
        deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    const deliveryDate = adjustForWeekend(today, deliveryOption.deliveryDays);/*.add(
          deliveryOption.deliveryDays,
          'days'
        );*/
    
    return deliveryDate;
}

export function isWeeKend(date) {
    const newDate = date.format('dddd');
    return newDate === 'sunday' || newDate === 'saturday' ? true : false;
}

function adjustForWeekend(deliverydate, r) {
    let remainingday = r;
    deliverydate = deliverydate;
    while(remainingday) {
        deliverydate = deliverydate.add(1, 'days');
        if(!isWeeKend(deliverydate))
        {
            remainingday -= 1;
        }
    }
    return deliverydate;
}