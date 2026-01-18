import { test, expect } from '@playwright/test'
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces'
import { baseURL, divider, part2BaseURL } from '../dev_environment'
import { addNewUniqueUsers, headers, negativeData, assertCustom400Messages, negativeMalformed } from '../test_data'

test.describe.configure({ mode: 'serial' })

test.describe('Register Endpoint', () => {
test('TC 20: HTTP 201: Register using valid accounts  ',
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

            const responseData = await response.json()
            const account = responseData.data

            if (response.status() === 201) {
                locationHeader = response.headers()['location'] || 'Not present';
            }

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
            console.log(`Search address: ${locationHeader}`)

            // assertions
            expect.soft(response.status()).toBe(201)
            expect.soft(response.statusText()).toBe('Created')
            expect.soft(account.firstName).toBe(addNewUniqueUsers[index].firstName)
            expect.soft(account.emailAddress).toBe(addNewUniqueUsers[index].emailAddress)
            expect.soft(locationHeader).toBe(`${part2BaseURL}${uri}${account.id}`)
        }
    })


test('TC 21: HTTP 409: Register using emails that are already registered',
    async ({ request }) => {
        const uri = '/account/search/id/'

        for (let index = 0; index < addNewUniqueUsers.length; index++) {
            const newUser = addNewUniqueUsers[index]
            const endpoint = `${part2BaseURL}/account/register`

            const response = await request.post(endpoint,
                {
                    headers: headers,
                    data: addNewUniqueUsers[index]
                })

            const responseData = await response.json()
            const account = responseData.data

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            // assertions
            expect.soft(response.status()).toBe(409)
            expect.soft(response.statusText()).toBe('Conflict')
            expect.soft(responseData.success).toBe(false)
            expect.soft(responseData.message).toBe('The email address is either tied to an account or cannot be used for registration')
        }
    })


test('TC 22: HTTP 400: Register with empty fields, firstname, lastname, email',
    async ({ request }) => {
        const uri = '/account/search/id/'
        for (let index = 0; index < negativeData.length; index++) {
            const newUser = negativeData[index];
            const endpoint = `${part2BaseURL}/account/register`

            const response = await request.post(endpoint,
                {
                    headers: headers,
                    data: negativeData[index]
                })

            const responseData = await response.json()
            const account = responseData.data

            divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)

            // assertions
            expect.soft(response.status()).toBe(400)
            expect.soft(response.statusText()).toBe('Bad Request')
            expect.soft(responseData.success).toBe(false)
            expect.soft(assertCustom400Messages.includes(responseData.message)).toBe(true)
        }
    })



test('TC 23: HTTP 400: Register with missing JSON on body',
    async ({ request }) => {
        const uri = '/account/search/id/'
        const endpoint = `${part2BaseURL}/account/register`
        const response = await request.post(endpoint,
            {
                headers: headers,
            })

        const responseData = await response.json()
        const account = responseData.data

        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

        // assertions
        expect.soft(response.status()).toBe(400)
        expect.soft(response.statusText()).toBe('Bad Request')
        expect.soft(responseData.success).toBe(false)
        expect.soft(responseData.message).toBe('Request body is empty')
    })


test('TC 24: HTTP 422: Register with malformed JSON',
    async ({ request }) => {
        const uri = '/account/search/id/'
        const endpoint = `${part2BaseURL}/account/register`
        const response = await request.post(endpoint,
            {
                headers: headers,
                data: negativeMalformed
            })

        const responseData = await response.json()
        const account = responseData.data

        divider()
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

        // assertions
        expect.soft(response.status()).toBe(422)
        expect.soft(response.statusText()).toBe('Unprocessable Entity')
        expect.soft(responseData.success).toBe(false)
        expect.soft(responseData.message).toBe('Malformed JSON in request body')
    })

})
