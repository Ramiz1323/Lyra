import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: process.env.GOOGLE_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN
            }
        });
        
        transporter.verify()
            .then(() => { console.log("Email transporter is ready to send emails"); })
            .catch((err) => { 
                console.error("Email transporter verification failed:");
                console.error("Code:", err.code);
                console.error("Message:", err.message);
                if (err.message.includes('invalid_grant')) {
                    console.error("HINT: Your GOOGLE_REFRESH_TOKEN might be expired or revoked. Please follow the steps in the implementation plan to generate a new one.");
                }
            });
    }
    return transporter;
}

export async function sendEmail({ to, subject, html, text }) {
    const transporter = getTransporter();
    
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details.envelope);
}