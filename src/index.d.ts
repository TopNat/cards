/*declare interface Window {
    application: any;
}*/

interface screens {
    [selector: string]: () => void;
}
interface blocks {
    [selector: string]: (parent: HTMLElement) => void;
}

type appType = {
    blocks: blocks;
    screens: screens;
    renderScreen: (screen: string) => void;
    renderBlock: (blocks: string, parent: HTMLElement) => void;
    timer: () => void;
    time: string;
    step1: string;
    step2: string;
    difficulty: string;
    cardsGame: Array<() => void>;
};
declare interface Window {
    application: appType;
}
