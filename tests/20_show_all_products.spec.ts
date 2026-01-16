import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse } from './ApiInterfaces';
import { baseURL, divider } from '../dev_environment';

test('Test 20: Verify endpoint for show all products using GET (with seed data)', async ({ request }) => {
    const endpoint = `${baseURL}/product/show/all`
    const response = await request.get(endpoint)
    const responseData: ProductResponse = await response.json();
    const products = responseData.data;

    // these are for the report's console capture
    divider()
    console.log('Endpoint:', endpoint)
    console.log('Response Status:', response.status())
    console.log('Response Status Text:', response.statusText())
    console.log('Response Body:', responseData)

    // Assertion: Check HTTP status code - it should be 200 
    expect(response.status(), "Verify reponse status").toEqual(200);

    // Check the LENGTH of the responseBody array - it should return 1 item
    expect(products.length, "Verify length of JSON entries").toEqual(15);

    // Verify that the first object contains the required properties 
    expect(products[0]).toHaveProperty('productId');
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toHaveProperty('description');
    expect(products[0]).toHaveProperty('price');

    
});


test('Test 21: Verify endpoint for show all products using POST (with seed data)', async ({ request }) => {
    const endpoint = `${baseURL}/product/show/all`
    const response = await request.post(endpoint)

    // these are for the report's console capture
    divider()
    console.log('Endpoint:', endpoint)
    console.log('Response Status:', response.status())
    console.log('Response Status Text:', response.statusText())
    
    // Assertion: Check HTTP status code - it should be 200 
    expect(response.status(), "Verify reponse status").toEqual(405);

    // Assertion: Check HTTP status message - it should be 200 
    expect (response.statusText(), "Verify reponse status").toBe('Method Not Allowed'); 

});

