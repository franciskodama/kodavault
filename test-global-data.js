import fetch from 'node-fetch';

async function test() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/global', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_KEY || ''
            }
        });
        
        console.log('Status:', response.status);
        console.log('Headers:', response.headers.raw());
        
        const data = await response.json();
        console.log('Data:', JSON.stringify(data).substring(0, 200));
    } catch (e) {
        console.error(e);
    }
}
test();
