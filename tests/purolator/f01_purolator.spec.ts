import { test, expect } from '@playwright/test';


test.skip('Test F01 - Load page',
    async ({ page }) => {
        await page.goto('https://www.purolator.com/en/shipping/tracker')
        await (page.locator('button[class*=accept]')).click()
        await page.waitForTimeout(100)
        await (page.locator('#tracker-search-singlepin')).fill("GRH000789686")
        await (page.locator('[data-target="singlepin"]')).click()
        await page.waitForTimeout(5000)
    });


