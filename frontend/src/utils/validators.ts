export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };
  
  export const isStrongPassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };
  
  export const isValidUsername = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
  };

  export const isValidName = (username: string): boolean => {
    const regex = /^[a-zA-Z]{3,20}( [a-zA-Z]{3,20}){1,}$/;
    return regex.test(username);
  };
  
  export const isValidDateValue = (value:any) =>{
    const date = new Date(value);
    return value !== null && value !== undefined && !isNaN(date.getTime());
  }
  export const doPasswordsMatch = (
    password: string,
    confirmPassword: string
  ): boolean => {
    return password === confirmPassword;
  };
  
  export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
  };
  
  export const isValidPhoneNumber = (phone: string): boolean => {
    const regex = /^(\+2)?01\d{9}$/;
    return regex.test(phone);
  };
  