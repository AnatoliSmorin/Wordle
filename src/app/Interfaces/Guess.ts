import {GuessStatus} from '../Enums/Guess Status';

export interface Guess 
{
    LetterIndex:number;
    Word:number;
    Character:string;
    Status:GuessStatus;
}
