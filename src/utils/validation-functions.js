export function validateEmail(email) {
  const res =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      String(email).toLowerCase()
    );
  return res;
}

export function validateName(name){
    return /^[a-zA-Z ]+$/.test(name);
}

export function validatePassword(password){
    return /[0-9]/.test(password);
}

export function validateUsername(username){
    return /^[a-zA-Z0-9]+$/.test(username);
}