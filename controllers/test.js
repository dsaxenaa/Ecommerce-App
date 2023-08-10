import { StatusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"

export const Test=(req,res)=>{
    console.log("protected route")
    res.json(jsonGenerate(StatusCode.SUCCESS,"working"))
}