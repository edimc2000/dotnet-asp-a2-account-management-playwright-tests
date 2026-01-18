import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import { baseURL, divider, part2BaseURL, updateUsingIdEndpointUrl } from '../dev_environment';
import { addNewUniqueUsers, headers, updateCombinations, singleRandom1to50 } from '../test_data';

test.describe.configure({ mode: 'serial' });
test.describe('Delete Endpoint', () => {

})