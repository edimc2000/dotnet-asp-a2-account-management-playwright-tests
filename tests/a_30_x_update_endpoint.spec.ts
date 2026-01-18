import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL, updateUsingIdEndpointUrl } from '../dev_environment';
import { addNewUniqueUsers, headers, updateCombinations, singleRandom1to50 } from '../test_data';

test.describe.configure({ mode: 'serial' });
test.describe('Update Endpoint HTTP 200', () => {

    // these can run after add tests are done
    test('TC 30: Update with valid JSON, unique values for firstname, lastname, email',
        async ({ request }) => {
            let id = 205
            const uri = '/account/search/id/'

            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`
            const response = await request.patch(endpoint,
                {
                    headers: headers,
                    data: updateCombinations.randomUpdateAll
                })

            const responseData = await response.json();

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            // assertions
            expect.soft(response.status()).toBe(200)
            expect.soft(response.statusText()).toBe('OK')
            expect.soft(responseData.success).toBe(true)
            expect.soft(responseData.message).toBe('Update successful')
        })

    // this test is dependent on TC 30
    test('TC 31: update using the same field values (dependent on TC30)',
        async ({ request }) => {
            let id = 205
            const uri = '/account/search/id/'
            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`

            const response = await request.patch(endpoint,
                {
                    headers: headers,
                    data: updateCombinations.randomUpdateAll
                })

            const responseData = await response.json();

            divider()
            console.log(`Second update `)
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
            // assertions
            expect.soft(response.status()).toBe(200)
            expect.soft(response.statusText()).toBe('OK')
            expect.soft(responseData.success).toBe(true)
            expect.soft(responseData.message).toBe('Request processed successfully. No modifications made. Null fields and empty values were ignored to preserve existing data.')

        })

    test('TC 32: update with JSON missing the email field',
        async ({ request }) => {
            let id = 205
            const uri = '/account/search/id/'
            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`

            const response = await request.patch(endpoint,
                {
                    headers: headers,
                    data: updateCombinations.updateMissingEmail
                })

            const responseData = await response.json();

            divider()
            console.log(`Second update `)
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
            // assertions
            expect.soft(response.status()).toBe(200)
            expect.soft(response.statusText()).toBe('OK')
            expect.soft(responseData.success).toBe(true)
            expect.soft(responseData.message).toBe('Update successful')
            expect.soft(responseData.changes).toEqual((updateCombinations.updateMissingEmail))

        })

    test('TC 33: update using the same field values (dependent on TC30)',
        async ({ request }) => {
            let id = 205
            const uri = '/account/search/id/'
            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`

            const response = await request.patch(endpoint,
                {
                    headers: headers,
                    data: updateCombinations.updateMissingAllFields
                })

            const responseData = await response.json();

            divider()
            console.log(`Second update `)
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
            // assertions
            expect.soft(response.status()).toBe(200)
            expect.soft(response.statusText()).toBe('OK')
            expect.soft(responseData.success).toBe(true)
            expect.soft(responseData.message).toBe('Request processed successfully. No modifications made. Null fields and empty values were ignored to preserve existing data.')
        })
})

test.describe('Update Endpoint HTTP 400', () => {

    test('TC 30a-1: updating using no JSON body ',
        async ({ request }) => {

            let id = 205
            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`

            const response = await request.patch(endpoint,
                {
                    headers: headers,
                    // data: updateCombinations.updateMissingAllFields
                })

            const responseData = await response.json();
            divider()
            console.log(`Second update `)
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            expect.soft(response.status()).toBe(400)
            expect.soft(response.statusText()).toBe('Bad Request')
            expect.soft(responseData.success).toBe(false)
            expect.soft(responseData.message).toBe('Request body is empty')
        })

        test('TC 30a-2: updating a restricted account',
        async ({ request }) => {

            let id = 203
            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`

            const response = await request.patch(endpoint,
                {
                    headers: headers,
                     data: updateCombinations.randomUpdateAll
                })

            const responseData = await response.json();
            divider()
            console.log(`Second update `)
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            expect.soft(response.status()).toBe(400)
            expect.soft(response.statusText()).toBe('Bad Request')
            expect.soft(responseData.success).toBe(false)
            expect.soft(responseData.message).toBe(`Account ID '${id}' is restricted and cannot be updated`)
        })


})


test.describe('Update Endpoint HTTP 422', () => {

    test('TC 30b-1: updating using malformed JSON data',
        async ({ request }) => {

            let id = 205
            const uri = '/account/search/id/'
            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`

            const response = await request.patch(endpoint,
                {
                    headers: headers,
                    data: updateCombinations.updateUsingMalformed
                })

            const responseData = await response.json();
            divider()
            console.log(`Second update `)
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            expect.soft(response.status()).toBe(422)
            expect.soft(response.statusText()).toBe('Unprocessable Entity')
            expect.soft(responseData.success).toBe(false)
            expect.soft(responseData.message).toBe('Malformed JSON in request body')

        })

})


test.describe('Update Endpoint HTTP 409', () => {
    test('TC 30c-1: updating using and email that is registered to other accounts',
        async ({ request }) => {

            let id = 205
            const uri = '/account/search/id/'
            const endpoint = `${part2BaseURL}${updateUsingIdEndpointUrl}${id}`

            const response = await request.patch(endpoint,
                {
                    headers: headers,
                    data: updateCombinations.emailRegistredToOthers
                })

            const responseData = await response.json();
            divider()
            console.log(`Second update `)
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            expect.soft(response.status()).toBe(409)
            expect.soft(response.statusText()).toBe('Conflict')
            expect.soft(responseData.success).toBe(false)
            expect.soft(responseData.message).toBe('The email address is either tied to an account or cannot be used for registration')

        })

})