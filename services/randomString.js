export const GenerateStringRandomly = (length) =>{
     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012356789";
     let result = '';
     let a = characters.length;
     for(let i = 0; i<length; i++){
        result +=characters.charAt(Math.floor(Math.random()*a))
    }
    return result;
}