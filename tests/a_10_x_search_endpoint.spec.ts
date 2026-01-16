import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL } from '../dev_environment';
import { seedUsers, testNonExistentEmails } from '../test_data';


test('TC 10: Search All: Retrieve all accounts (using seed)',
    async ({ request }) => {

        //this should run before any creation - validating 4 records from seed 
        const endpoint = `${part2BaseURL}/account/search/all`

        const response = await request.get(endpoint)
        // const responseData: AccountResponse = await response.json();
        const responseData = await response.json();
        const account = responseData.data;

        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('\nResponse Body:', responseData)

        // validate entry count - 4
        expect(account.length).toEqual(4) // thi. might need to be removed since it will not stay at 4 with other tests

        // targetted validation 1st entry email add
        expect(account[0].emailAddress).toBe('e.choi@gmail.com')

        // targetted validation 4th entry id number is 203
        expect(account[3].id).toBe(203)
    });



test('TC 11: Search All: Validate response 405 for HTTP POST/PUT',
    async ({ request }) => {
        const endpoint = `${part2BaseURL}/account/search/all`
        let response = await request.post(endpoint)
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())

        // validate response code is 405
        expect(response.status()).toEqual(405)

        // validate response test is Method not allowed
        expect(response.statusText()).toEqual('Method Not Allowed')


        response = await request.put(endpoint)
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())

        // validate response code is 405
        expect(response.status()).toEqual(405)

        // validate response test is Method not allowed
        expect(response.statusText()).toEqual('Method Not Allowed')
    });


test('TC 12: Search by Id: Using a valid and existing account Ids (seed data)',
    async ({ request }) => {

        for (let i = 0; i < seedUsers.length; i++) {
            const seedUser = seedUsers[i];

            const endpoint = `${part2BaseURL}/account/search/id/${seedUser.id}`
            let response = await request.get(endpoint)
            const responseData: AccountResponse = await response.json();
            // const account = JSON.stringify(responseData.data[0]);
            const account = responseData.data[0];

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            // validation of account data - seedUsers array vs actual obj
            expect(account).toEqual(seedUser)

            // validate response status 
            expect(response.status()).toBe(200)
            // validate response text 
            expect(response.statusText()).toEqual('OK')
            // validate response body - success - value 
            expect(responseData.success).toBe(true)
            // validate  response body - message - value 
            expect(responseData.message).toEqual("Account retrieved successfully")
        }
    });



test('TC 13: Search by Id: Using a valid but non existent account Id (2025 )',
    async ({ request }) => {
        const testId = 2025

        const endpoint = `${part2BaseURL}/account/search/id/${testId}`
        let response = await request.get(endpoint)
        const responseData: AccountResponse = await response.json();
        // const account = JSON.stringify(responseData.data[0]);
        const account = responseData.data;

        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

        // // validation of account data - seedUsers array vs actual obj
        expect(account).toEqual([])

        // // validate response status 
        expect(response.status()).toBe(200)
        // // validate response text 
        expect(response.statusText()).toEqual('OK')
        // // validate response body - success - value 
        expect(responseData.success).toBe(true)
        // // validate  response body - message - value 
        expect(responseData.message).toEqual("There are no accounts on the database")
    }
);

test('TC 14: Search by Id: Using an invalid account Id (20a - text)',
    async ({ request }) => {


        const testId = "20a"

        const endpoint = `${part2BaseURL}/account/search/id/${testId}`
        let response = await request.get(endpoint)
        const responseData: AccountResponse = await response.json();
        // const account = JSON.stringify(responseData.data[0]);
        const account = responseData.data;

        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

        // // validation of account data - seedUsers array vs actual obj
        // expect(account).toEqual([])

        // // validate response status 
        expect(response.status()).toBe(400)
        // // validate response text 
        expect(response.statusText()).toEqual('Bad Request')
        // // validate response body - success - value 
        expect(responseData.success).toBe(false)
        // // validate  response body - message - value 
        expect(responseData.message).toEqual("'20a' is not a valid account Id")
    }
);


test('TC 15: Search by Id: Validate response 405 for HTTP POST/PUT',
    async ({ request }) => {
        const endpoint = `${part2BaseURL}/account/search/id/20`
        let response = await request.post(endpoint)
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())

        // validate response code is 405
        expect(response.status()).toEqual(405)

        // validate response test is Method not allowed
        expect(response.statusText()).toEqual('Method Not Allowed')


        response = await request.put(endpoint)
        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())

        // validate response code is 405
        expect(response.status()).toEqual(405)

        // validate response test is Method not allowed
        expect(response.statusText()).toEqual('Method Not Allowed')
    }
);

test('TC 16: Search by Email: Using valid and existing accounts (using seed)',
    async ({ request }) => {
        for (let index = 0; index < seedUsers.length; index++) {
            const seedUser = seedUsers[index]

            const endpoint = `${part2BaseURL}/account/search/email/${(seedUser.emailAddress)}`
            let response = await request.get(endpoint)
            const responseData: AccountResponse = await response.json()
            const account = responseData.data[0]

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())

            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
            expect.soft(response.status()).toEqual(200)
            expect(account).toEqual(seedUser)
        }

    }
);

test('TC 17: Search by Email: Using non existent accounts ()',
    async ({ request }) => {
        for (let index = 0; index < testNonExistentEmails.length; index++) {
            const endpoint = `${part2BaseURL}/account/search/email/${testNonExistentEmails[index]}`
            let response = await request.get(endpoint)
            const responseData: AccountResponse = await response.json()

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())

            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
            expect.soft(response.status()).toEqual(200)
            expect.soft(responseData.message).toEqual('There are no accounts on the database')
        }

    }
);



test('TC 18: Search by Email: Validate response 405 for HTTP POST or PUT (no content yet)',
    async ({ request }) => {
        const endpoint = `${part2BaseURL}/account/search/email/20`
        let response = await request.put(endpoint)
        expect.soft(response.status()).toEqual(405)

        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
    }
);

test('TC 19: Search by Email: Using partial string search (assertion using seed data)',
    async ({ request }) => {
        let partialString = 'g'

        const endpoint = `${part2BaseURL}/account/search/email/${partialString}`
        let response = await request.get(endpoint)
        const responseData: AccountResponse = await response.json()
        const data = responseData.data

        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())

        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
        expect.soft(response.status()).toEqual(200)
        expect.soft(data.length).toEqual(3)
     }
);