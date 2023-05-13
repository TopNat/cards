import { it } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { getQuantityCard } from './src/getQuantityCard';
//import { getQuantityCard } from './src/app';

it('should get quantity cards', () => {
    const level = Number(1);
    const countCards = 6;
    const result = getQuantityCard(level);
    assert.equal(result, countCards);
});
