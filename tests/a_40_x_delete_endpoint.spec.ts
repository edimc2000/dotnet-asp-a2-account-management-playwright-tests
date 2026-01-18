import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL, deleteUsingIdEndpointUrl } from '../dev_environment';
import { addNewUniqueUsers, headers, updateCombinations, singleRandom1to50 } from '../test_data';

test.describe.configure({ mode: 'serial' });

//These test are dependent on 20_x test package which registers accounts 204, 205 and 206
test.describe('Delete Endpoint', () => {

    test('TC 40: HTTP 200: Delete registered accounts 204, 205, 206',
        async ({ request }) => {
            let ids = [204, 205, 206]

            for (let index = 0; index < ids.length; index++) {
                const id = ids[index]

                const endpoint = `${part2BaseURL}${deleteUsingIdEndpointUrl}${id}`
                const response = await request.delete(endpoint)
                const responseData = await response.json();

                divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('Response Body:', responseData)

                // assertions
                expect.soft(response.status()).toBe(200)
                expect.soft(response.statusText()).toBe('OK')
                expect.soft(responseData.success).toBe(true)
                expect.soft(responseData.message).toBe('Account deleted successfully')
            }
        })

    test('TC 41: HTTP 400: Delete invalid accounts 204a, 205a, 206a (string input - unparsable)',
        async ({ request }) => {
            let ids = ['204a', '205a', '206a']

            for (let index = 0; index < ids.length; index++) {
                const id = ids[index]

                const endpoint = `${part2BaseURL}${deleteUsingIdEndpointUrl}${id}`
                const response = await request.delete(endpoint)
                const responseData = await response.json();

                divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('Response Body:', responseData)

                // assertions
                expect.soft(response.status()).toBe(400)
                expect.soft(response.statusText()).toBe('Bad Request')
                expect.soft(responseData.success).toBe(false)
                expect.soft(responseData.message).toBe(`'${id}' is not a valid account Id`)


            }
        })
    test.only('TC 42: HTTP 400: Delete restricted accounts 200, 201, 202, 203',
        async ({ request }) => {
            let ids = [200, 201, 202, 203]

            for (let index = 0; index < ids.length; index++) {
                const id = ids[index]

                const endpoint = `${part2BaseURL}${deleteUsingIdEndpointUrl}${id}`
                const response = await request.delete(endpoint)
                const responseData = await response.json();

                divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('Response Body:', responseData)

                // assertions
                expect.soft(response.status()).toBe(400)
                expect.soft(response.statusText()).toBe('Bad Request')
                expect.soft(responseData.success).toBe(false)
                expect.soft(responseData.message).toBe(`Account ID '${id}' is restricted and cannot be deleted`)
            }
        })


})