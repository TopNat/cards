const DIFFICULTY: number[] = [6, 12, 18];

export function getQuantityCard(level: number): number {
    // console.log(DIFFICULTY[level - 1]);
    return DIFFICULTY[level - 1];
}

getQuantityCard(1);
