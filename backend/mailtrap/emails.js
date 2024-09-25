import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email send successfully", response)
    } catch (error) {
        console.log(`Error sending verification email`, error);;
        throw new Error(`Error sending verification email: ${error}`)
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "e028ec53-6564-4be0-9a9c-032cd83d0ea8",
            template_variables: {
                "company_info_name": "Auth Company",
                "name": name,
            }
        });

        console.log("Welcome email send successfully", response);
    } catch (error) {
        console.log("Error sending welcome email", error);
        
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    } catch (error) {
        console.log(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
    } catch (error) {
        console.log(`Error sending password reset success mail`, error);

        throw new Error(`Error sending password reset mail: ${error}`);
    }
};