import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse } from './ApiInterfaces';
import { baseURL, divider } from '../dev_environment';

test('Test 40: Delete a product with valid ProductId', async ({ request }) => {

    const productId = [1, 12, 14]
  
    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/delete/${productId[index]}`
        const response = await request.delete(endpoint)
        const responseData: ProductResponse = await response.json();
     
        // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)
    }
});

test('Test 41: Delete a product with invalid ProductId', async ({ request }) => {

    const productId = [100, "120", "aa"]

    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/delete/${productId[index]}`
        const response = await request.delete(endpoint)
        const responseData: ProductResponse = await response.json();
         // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    }
});

test('Test 42: Delete a product using an empty ProductId', async ({ request }) => {
    const assertCode = 404
    const endpoint = `${baseURL}/product/delete/`
    const response = await request.delete(endpoint)

    // these are for the report's console capture
    divider()
    console.log('Endpoint:', endpoint)
    console.log('Response Status:', response.status())
    console.log('Response Status Text:', response.statusText())
    

    // Assertion: Check HTTP status code - it should be 404 
    expect(response.status(), `Verify reponse status `).toEqual(assertCode)
})



