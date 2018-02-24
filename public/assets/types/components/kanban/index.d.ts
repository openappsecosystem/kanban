import { bin } from '../interfaces';
export declare class Kanban {
    bins: Array<bin>;
    due: string;
    render(): JSX.Element;
}
