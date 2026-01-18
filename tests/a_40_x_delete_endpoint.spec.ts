import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL, deleteUsingIdEndpointUrl } from '../dev_environment';
import { addNewUniqueUsers, headers, updateCombinations, singleRandom1to50 } from '../test_data';

test.describe.configure({ mode: 'serial' });

//These test are dependent on 20_x test package which registers accounts 204, 205 and 206
test.describe('Delete Endpoint', () => {

    test('TC 40: Delete accounts 204, 205, 206',
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



})