import axios from 'axios';
/*
async function getCurrencyRates() {
    const response = await axios.get('https://api.apilayer.com/exchangerates_data/latest?base=UAH&symbols=UAH,USD,EUR', {
        headers: {
            'apikey': 'UWOTQbudj6v72u03GEyJVvUd1po5z4Er'
        }
    });

    return response.data.rates;
}
const conversionRates = await getCurrencyRates();
console.log(conversionRates);

export default conversionRates
*/

export default {
    UAH: 1,
    USD: 0.027051,
    EUR: 0.025825,
};
