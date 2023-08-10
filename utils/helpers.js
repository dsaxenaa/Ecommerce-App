export const jsonGenerate = (statusCode,message,data)=>{
    return{
        statusCode:statusCode,
        message:message,
        data:data
    }
}