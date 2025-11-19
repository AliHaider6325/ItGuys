import validator from 'validator';

const ValidateSignup=(req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name can't be empty!")
    }
    else if(!emailId || !password){
         throw new Error("Email or password can't be empty!")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not Strong!")
    }
}

const ValidateLogin=(req)=>{
    const {emailId,password} = req.body;
    if(!emailId || !password){
         throw new Error("Email or password can't be empty!")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid!")
    }
}


export { ValidateSignup, ValidateLogin };
