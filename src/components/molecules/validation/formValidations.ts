export const validateIsAlphanumeric = (input: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(input);
};


export const validateRemoveSpecialCharacters = (input: string, charactersToRemove: string[]): string => {
    const regex = new RegExp(`[${charactersToRemove.join('')}]`, 'g');
    return input.replace(regex, '');
};


export const validateLengthMessage = (text:string, min:number, max:number) => {
    let message:string = "";
    const length:number = text.length;

    if(length < min){
        message = `${min}文字以上入力してください`;
    }
    if(min <= length && length <= max){
        message = `良い長さです`;
    }
    if(length > max){
        message = `${max}文字以内で入力してください`;
    }
    return message;
};