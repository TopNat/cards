interface screens {
    [selector: string]: () => void;
}
interface blocks {
    [selector: string]: (parent: HTMLElement) => void;
}

type AppType = {
    blocks: blocks;
    screens: screens;
    renderScreen: (screen: string) => void;
    renderBlock: (blocks: string, parent: HTMLElement) => void;
    timer: NodeJS.Timer;
    time: string;
    step1: string;
    step2: string;
    difficulty: number;
    cardsGame: Array<string>;
    steps: Array<string>;
};
declare interface Window {
    application: AppType;
}