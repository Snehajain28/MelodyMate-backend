const nodemailer = require('nodemailer')

exports.mailSender= async(title,body,email) => {
   try{
    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
    })
   let info = await transporter.sendMail({
 from:'studynotion  - Sneha', 
to:`${email}`,
subject:`${title}`,
html:`${body}`,
})
   return info ;
}
catch(err){
    console.log("mail sending error")
}

}