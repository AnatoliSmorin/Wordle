import {GuessStatus} from './Guess Status';

export interface Guess 
{
    Index:number;
    Word:number;
    Character:string;
    Status:GuessStatus;
}
