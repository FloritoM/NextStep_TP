import { Instrument_Serif } from 'next/font/google';
import { Pacifico } from 'next/font/google';
import { Manrope } from 'next/font/google';

export const instrumentSerif = Instrument_Serif({
    subsets: ['latin'],
    weight: '400',
    style: ['normal', 'italic']
});

export const pacifico = Pacifico({
    subsets: ['latin'],
    weight: '400',
    style: ['normal']
});

export const manrope = Manrope({
    subsets: ['latin'],
    weight: 'variable'
});