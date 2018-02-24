import { members } from '../interfaces';
export declare class Card {
    action: any;
    note: string;
    due: string;
    members: Array<members>;
    render(): JSX.Element;
}
