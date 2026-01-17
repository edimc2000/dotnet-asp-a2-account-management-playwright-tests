import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL } from '../dev_environment';
import { addNewUniqueUsers, headers } from '../test_data';


test.only('TC 20: Testing with valid json datav1 ',
    async ({ request }) => {

        let locationHeader
        const uri = '/account/search/id/'

        for (let index = 0; index < addNewUniqueUsers.length; index++) {
            const newUser = addNewUniqueUsers[index];
            const endpoint = `${part2BaseURL}/account/register`

            const response = await request.post(endpoint,
                {
                    headers: headers,
                    data: addNewUniqueUsers[index]
                })

            const responseData = await response.json();
            const account = responseData.data;

            if (response.status() === 201) {
                locationHeader = response.headers()['location'] || 'Not present';
            }

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
            console.log(`Search address: ${locationHeader}`)

            // assertions
            expect(response.status()).toBe(201)
            expect(response.statusText()).toBe('Created')
            expect(account.firstName).toBe(addNewUniqueUsers[index].firstName)
            expect(account.emailAddress).toBe(addNewUniqueUsers[index].emailAddress)
            expect(locationHeader).toBe(`${part2BaseURL}${uri}${account.id}`)



        }


    })




// const responseData: AccountResponse = await response.json();
// const account = responseData;

// if (response.status() === 201) {
//     locationHeader = response.headers()['location'] || 'Not present';
// }

// // // these are for the report's console capture
// divider()
// console.log('Endpoint:', endpoint)
// console.log(`Location: ${locationHeader ?? "not available"}  `);
// console.log('Response Status:', response.status())
// console.log('Response Status Text:', response.statusText())
// console.log('Response Body:', responseData)
// // console.log('account id:', responseData.data)

// // expect(locationHeader).toContain(uri + responseData.id)



