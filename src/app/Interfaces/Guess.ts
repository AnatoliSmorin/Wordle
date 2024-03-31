import {GuessStatus} from './Guess Status';

export interface Guess 
{
    LetterIndex:number;
    Word:number;
    Character:string;
    Status:GuessStatus;
}
