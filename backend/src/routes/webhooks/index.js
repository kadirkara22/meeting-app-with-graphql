//import Boom from 'boom';
import express from 'express';
import Hasura from '../../clients/hasura'
import nodemailer from 'nodemailer'
import { GET_MEETING_PARTICIPANTS } from './queries';
const router = express.Router()


const smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    }
}


const transporter = nodemailer.createTransport(smtpConfig)


router.post('/meeting_created', async (req, res, next) => {
    const meeting = req.body.event.data.new;


    const { meetings_by_pk } = await Hasura.request(GET_MEETING_PARTICIPANTS, {
        id: meeting.id
    })

    const title = meeting.title;
    const { fullName } = meetings_by_pk.user;
    const participants = meetings_by_pk.participants.map(({ user }) => user.email)


    const mailOptions = {
        from: 'kadirmertarda123@gmail.com',
        to: participants,
        subject: `${fullName} sizi bir ${title}' e davet etti`,
        text: `${fullName} sizi ${title} adlı bir görüşmeye davet etti`
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return next(error)
        }

        return res.json({ info })


    })

})
export default router