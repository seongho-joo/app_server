import * as nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    sendMail: () => {
      const transporter = nodemailer.createTransport(
        smtpTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PW,
          },
        })
      );

      const mailOptions = {
        from: process.env.MAIL_ID,
        to: 'mcm8681@naver.com',
        subject: 'email send test',
        text: 'test',
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw new Error(err.message);
        } else {
          console.log(info.response);
        }
      });
      return true;
    },
  },
};

export default resolvers;
