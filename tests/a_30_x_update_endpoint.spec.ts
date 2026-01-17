import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL, updateUsingIdEndpointUrl } from '../dev_environment';
import { addNewUniqueUsers, headers, updateCombinations, singleRandom1to50 } from '../test_data';

test.describe.configure({ mode: 'serial' });

test('TC 30: Update: Update with valid json',
    async ({ request }) => {
        let id = 205
        const uri = '/account/search/id/'

        const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`
        const response = await request.patch(endpoint,
            {
                headers: headers,
                data: updateCombinations.updateAll
            })

        const responseData = await response.json();
        // const account = responseData.data;



        divider()
        console.log('random:', singleRandom1to50())
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)


        // assertions
        expect.soft(response.status()).toBe(200)
        expect.soft(response.statusText()).toBe('OK')
        expect.soft(responseData.success).toBe(true)
        expect.soft(responseData.message).toBe('Update successful')


    })
