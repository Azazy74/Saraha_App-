import nodemailer from "nodemailer"


export async function sendEmail({to , subject , html }){

    const transport = nodemailer.createTransport({
        host : "localhost",
        port : 465 , 
        secure : true ,
        service: "gmail", 
        auth : {
            user : process.env.EMAIL,
            pass :process.env.PASS
        }
    })

    const info = await transport.sendMail({
        from: `"Saraha App" <${process.env.EMAIL}>` , 
        to : to, 
        subject : subject , 
        html : html
    })

    if (info.accepted.length > 0 ) return true
    return false

}