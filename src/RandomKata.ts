export const RandomKata = (kata: string[]) => {
    return kata[Math.floor(Math.random() * kata.length)];
};