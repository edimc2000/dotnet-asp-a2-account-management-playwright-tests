import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL } from '../dev_environment';


test.only('Test x20: Testing with valid json datav1 ',
    async ({ request }) => {

        let locationHeader
        const uri = '/account/search/id/'
        let jsonData = null
        jsonData = `{
            "firstName": "10",
            "lastname": "Ulseco",
            "emailaddress": "du@rocket.com.ph"
        }`


        const endpoint = `${part2BaseURL}/account/register`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonData
        })
        const responseData: AccountResponse = await response.json();
         const account = responseData;

        if (response.status() === 201) {
            locationHeader = response.headers()['location'] || 'Not present';
        }

        // // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log(`Location: ${locationHeader ?? "not available"}  `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
        // console.log('account id:', responseData.data)

        // expect(locationHeader).toContain(uri + responseData.id)

    });



test('Test x20: Testing with malformed json ',
    async ({ request }) => {

        let locationHeader
        const uri = '/account/search/id/'
        let jsonData = null
        jsonData = `{  nnn
            "firstName": "10",
            "lastname": "Ulseco",
            "emailaddress": "du@rocket.com.ph"
        }`


        const endpoint = `${part2BaseURL}/account/register`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonData
        })
        const responseData: AccountResponse = await response.json();
         const account = responseData;

        if (response.status() === 201) {
            locationHeader = response.headers()['location'] || 'Not present';
        }

        // // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log(`Location: ${locationHeader ?? "not available"}  `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
        // console.log('account id:', responseData.data)

        // expect(locationHeader).toContain(uri + responseData.id)

    });




test('Test x22: Testing with null body ',
    async ({ request }) => {

        let locationHeader
        const uri = '/account/search/id/'
        let jsonData = null
        // jsonData = `{  nnn
        //     "firstName": "10",
        //     "lastname": "Ulseco",
        //     "emailaddress": "du@rocket.com.ph"
        // }`


        const endpoint = `${part2BaseURL}/account/register`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonData
        })
        const responseData: AccountResponse = await response.json();
         const account = responseData;

        if (response.status() === 201) {
            locationHeader = response.headers()['location'] || 'Not present';
        }

        // // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log(`Location: ${locationHeader ?? "not available"}  `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
        // console.log('account id:', responseData.data)

        // expect(locationHeader).toContain(uri + responseData.id)

    });


