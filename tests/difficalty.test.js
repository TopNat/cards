import { it } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { getQuantityCard } from '../src/getQuantityCard';
//import { getQuantityCard } from './src/app';

it('should get quantity cards', () => {
    const level = Number(1);
    const countCards = 6;
    const result = getQuantityCard(level);
    assert.equal(result, countCards);
});

it('should get quantity cards 2 level', () => {
    const level = Number(2);
    const countCards = 12;
    const result = getQuantityCard(level);
    assert.equal(result, countCards);
});
