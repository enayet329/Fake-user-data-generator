export function getRandomChar() {
  const charCode = 97 + Math.floor(Math.random() * 26); 
  return String.fromCharCode(charCode);
}


export function introduceErrors(text, errorRate) {
  let result = text;
  const errorChance = errorRate / 10;

  for (let i = 0; i < text.length; i++) {
    if (Math.random() < errorChance) {
      const errorType = Math.floor(Math.random() * 3);
      switch (errorType) {
        case 0: 
          result = result.slice(0, i) + result.slice(i + 1);
          i--; 
          break;
        case 1:
          const randomChar = getRandomChar();
          result = result.slice(0, i) + randomChar + result.slice(i);
          i++; 
          break;
        case 2: 
          if (i < result.length - 1) {
            result = result.slice(0, i) + result[i + 1] + result[i] + result.slice(i + 2);
            i++; 
          }
          break;
        default:
          return result;
      }
    }
  }
  return result;
}

export function introduceErrorInPhonenumber(text, errorRate) {
  let result = text;
  const errorChance = errorRate / 10;

  for (let i = 0; i < text.length; i++) {
    if (Math.random() < errorChance) {
      const errorType = Math.floor(Math.random() * 3);
      switch (errorType) {
        case 0: 
          result = result.slice(0, i) + result.slice(i + 1);
          i--; 
          break;
        case 1: 
          const randomNumber = Math.floor(Math.random() * 11);
          result = result.slice(0, i) + randomNumber + result.slice(i);
          i++; 
          break;
        case 2: 
          if (i < result.length - 1) {
            result = result.slice(0, i) + result[i + 1] + result[i] + result.slice(i + 2);
            i++; 
          }
          break;
        default:
          return result;
      }
    }
  }
  return result;
}
