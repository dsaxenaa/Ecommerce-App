import bcrypt from 'bcrypt'

export async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(10);
        const newpassword = bcrypt.hashSync(password,salt);
        return newpassword;
    }catch(error){
        console.log(error)
    }
}

export const comparePassword = async (password,hashPassword) =>{
    return bcrypt.compare(password,hashPassword)
}
