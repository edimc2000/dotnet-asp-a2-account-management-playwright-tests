import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse } from './ApiInterfaces';
import { baseURL, divider } from '../dev_environment';


test('Test 30: Search using a valid ProductId', async ({ request }) => {
    const productId = [1, 12, 14]
    const assertionArr = [
        {
            productId: 1,
            name: 'Classic White T-Shirt',
            description: '100% cotton crew neck t-shirt, perfect for everyday wear',
            price: 19.99
        },
        {
            productId: 12,
            name: 'Athletic Socks (3-pack)',
            description: 'Breathable socks with arch support for sports',
            price: 16.99
        },
        {
            productId: 14,
            name: "Silk Blouse",
            description: "Elegant blouse with French cuffs and delicate buttons",
            price: 89.99
        },


    ]

    // Verify values of seed items 
    for (let index = 0; index < assertionArr.length; index++) {

        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        const element = assertionArr[index];

        // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

        // Assertion: Check HTTP status code - it should be 200 
        expect(response.status(), `Verify reponse status (Trial ${index + 1})`).toEqual(200);

        // Verify the LENGTH of the responseBody array - it should return 1 item
        expect(products.length, "Verify length of JSON entries").toEqual(1);

        // Verify actual values 
        expect(products[0].productId, "Verify value - productId").toEqual(element.productId);
        expect(products[0].name, "Verify value - name").toEqual(element.name);
        expect(products[0].description, "Verify value - description").toEqual(element.description);
        expect(products[0].price, "Verify value - price").toEqual(element.price);
    }

});

test('Test 31: Search using ProductId that does not exist', async ({ request }) => {
    const productId = [1000, 2000]

    // Verify values of seed items 
    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()
        const responseData = responseBody.data

        // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseBody)

        // Assertion: Check HTTP status code - it should be 200 
        expect(response.status(), `Verify reponse status ( --- Trial ${index + 1} ---)`).toEqual(404);

        // Check the LENGTH of the responseBody array - it should return null
        console.log("data:", responseData)
        expect(responseData, "Verify that the data is null").not.toBeNull;
    }


})

test('Test 32: Search using an invalid ProductId (non integer & integers that can be parsed)', async ({ request }) => {

    const productId = ["test", "101", "1"]
    const assertCodes = [400, 404, 200]

    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()
        const responseData = responseBody.data

        // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseBody)


        // Assertion: Check HTTP status code - it should be 200 
        expect(response.status(), `Verify reponse status ( --- Trial ${index + 1} ---)`).toEqual(assertCodes[index]);
    }

})

test('Test 32: Search using an empty ProductId', async ({ request }) => {
    const assertCode = 404
    const endpoint = `${baseURL}/product/search/id/`
    const response = await request.get(endpoint)
    



    // these are for the report's console capture
    divider()
    console.log('Endpoint:', endpoint)
    console.log('Response Status:', response.status())
    console.log('Response Status Text:', response.statusText())

    // Assertion: Check HTTP status code - it should be 404 
    expect(response.status(), `Verify reponse status `).toEqual(assertCode)
})


