import { output } from '../interfaces';
export declare class Bin {
    note: string;
    due: string;
    cards: Array<any>;
    outputs: Array<output>;
    title: string;
    render(): JSX.Element;
}
