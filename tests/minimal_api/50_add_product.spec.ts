import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse } from '../ApiInterfaces';
import { baseURL, divider } from '../../dev_environment';

test('Test 50: Sending JSON data Price as string (valid - parsable)',
    async ({ request }) => {
        let locationHeader
        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": "Slim fit tank top with ribbed texture for layering",
                "price": "22.99"
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
    });




test('Test 51a: Sending JSON data Price as number (valid - double 22.99)',
    async ({ request }) => {
        let locationHeader
        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": "Slim fit tank top with ribbed texture for layering",
                "price": 22.99
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
    });

test('Test 51b: Sending JSON data Price as number (valid - int 22)',
    async ({ request }) => {
        let locationHeader
        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": "Slim fit tank top with ribbed texture for layering",
                "price": 22
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
    });


test('Test 52: Sending JSON data Price as string (invalid - string 22.99a)',
    async ({ request }) => {
        let locationHeader
        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": "Slim fit tank top with ribbed texture for layering",
                "price": "22.99a"
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });


test('Test 53: Sending empty JSON data',
    async ({ request }) => {
        let locationHeader
        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
    });

test('Test 54: Sending JSON data Price - mixed input in a loop (T50-53)',
    async ({ request }) => {
        const price = [22.9, "22.9", "22.9a", "null"]
        for (let index = 0; index < price.length; index++) {
            let locationHeader
            let jsonData = null;
            if (index !== 3) {
                jsonData = {
                    "name": "Ribbed Tank Top",
                    "description": "Slim fit tank top with ribbed texture for layering",
                    "price": price[index]
                };
            }

            const endpoint = `${baseURL}/product/add/`
            const response = await request.post(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: jsonData
            })
            // const responseData: ProductResponse = await response.json();
            // const products = responseData.data;

            if (response.status() === 201) {
                locationHeader = response.headers()['location'] || 'Not present';
            }

            // these are for the report's console capture
            divider()
            console.log('Endpoint:', endpoint)
            console.log(`Location: ${locationHeader ?? "not available"}  `);
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            // console.log('Response Body:', responseData)
        }
    });



test('Test 55: ending JSON data Description as a number',
    async ({ request }) => {

        let locationHeader

        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": 2.00,
                "price": "22.99"
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });

test('Test 56: Sending JSON data Name as a number',
    async ({ request }) => {

        let locationHeader

        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": 22,
                "description": "test",
                "price": "22.99"
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });





test('Test 57: Sending malformed JSON data 1',
    async ({ request }) => {

        let locationHeader
        const malformedData = `{
            "name": "Sleepware", m
            "name2": "Sleepware2", 
            "description": "Laura Ashley Ladies Sleepware Pink Prints Strawberries",
            "price": 88.00
        }`
        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: malformedData // Send as raw string
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });

test.only('Test 58: Sending malformed JSON data 2',
    async ({ request }) => {
        let locationHeader
        const malformedData = `{
            "name": "Sleepware", 
            "name2": "Sleepware2", 
            "description": "Laura Ashley Ladies Sleepware Pink Prints Strawberries",
            "price": 88.00
        `
        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: null // Send as raw string
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
    });
