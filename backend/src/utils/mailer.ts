import nodeMailer from 'nodemailer'
import mailConfig from '~/config/mail.config'

export const sendEmail = (to: string, subject: string, htmlContent: string) => {
  const transport = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD
    }
  })

  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent
  }

  return transport.sendMail(options)
}
