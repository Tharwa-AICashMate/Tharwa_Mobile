"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("../config/supabase.js");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const categoriesService_js_1 = require("./categoriesService.js");
const mailjetClient = node_mailjet_1.default.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
const intialCategories = [
    { name: "Income", icon: "cash-outline" },
    { name: "Food", icon: "restaurant-outline" },
    { name: "Transport", icon: "bus-outline" },
    { name: "Medicine", icon: "medical-outline" },
    { name: "Groceries", icon: "basket-outline" },
    { name: "Rent", icon: "key-outline" },
    { name: "Gifts", icon: "gift-outline" },
    { name: "Entertainment", icon: "film-outline" },
];
class AuthService {
    static async signup(userData) {
        const { email, password, ...profileData } = userData;
        // check If the email exists, throw an error
        try {
            const { data, error } = await AuthService.getuserByEmail(email);
            if (data)
                throw new Error("Email already exists");
        }
        catch (error) {
            console.log(error);
            return { status: 400, message: error };
        }
        // // If the email does not exist, proceed with signup
        const { data, error: signupError } = await supabase_js_1.supabase.auth.signUp({
            email,
            password,
        });
        console.log(userData, signupError);
        // update user profile data
        const { data: updatedUserData, error: updateError } = await AuthService.upadateUserProfile(email, {
            username: profileData.fullName,
            full_name: profileData.fullName,
            mobile_num: profileData.phone,
            DOB: profileData.dob,
        });
        console.log(updatedUserData, updateError);
        if (data) {
            intialCategories.forEach(category => {
                (0, categoriesService_js_1.createCategory)({ ...category, user_id: data.user.id });
            });
        }
        return updatedUserData;
    }
    static async login(userId) {
        const { data: userData, error } = await supabase_js_1.supabase
            .from("users")
            .select(`*,
          balance (
            balance_limit
          )`)
            .eq("id", userId)
            .single();
        console.log("User data:", userData, error);
        if (error)
            throw { status: 400, message: error.message };
        return {
            username: userData.username,
            email: userData.email,
            fullName: userData.full_name,
            phone: userData.mobile_num,
            dob: userData.DOB,
            balance: userData.balance?.[0]?.balance_limit ?? 0
        };
    }
    static async getuserByEmail(email) {
        const { data, error } = await supabase_js_1.supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();
        return { data, error };
    }
    static async upadateUserProfile(email, profileData) {
        const status = await supabase_js_1.supabase
            .from("users")
            .update(profileData)
            .eq("email", email);
        if (status.error)
            throw { status: 400, message: status.error };
        const { data, error } = await supabase_js_1.supabase.from("users").select("*").eq("email", email);
        return { data, error };
    }
    static async forgetPassword(email) {
        try {
            console.log("Email:", email);
            const { data, error } = await AuthService.getuserByEmail(email);
            console.log("User data:", data);
            if (error || !data)
                throw new Error("email not registered");
            console.log("User data:", error);
        }
        catch (error) {
            return { status: 400, message: "email not registered" };
        }
        const otp = generateOTP();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        // Store OTP in database
        const { error: otpError } = await supabase_js_1.supabase
            .from("password_reset_tokens")
            .upsert([
            {
                email,
                token: otp,
                expires_at: expiresAt,
                used: false,
            },
        ]);
        if (otpError) {
            return { status: 500, message: "Failed to generate reset token" };
        }
        console.log("OTP stored successfully");
        return await AuthService.sendOTPEmail(email, otp);
    }
    static async sendOTPEmail(toEmail, otp) {
        try {
            const result = await mailjetClient
                .post("send", { version: "v3.1" })
                .request({
                Messages: [
                    {
                        to: [{ email: toEmail, Name: "User" }],
                        from: { email: process.env.SENDER_EMAIL, Name: "Tharwa" },
                        subject: "Your OTP Code",
                        TextPart: `Your OTP to reset your password is: ${otp}. This code will expire in 30 minutes.`,
                        HTMLPart: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your password.</p>
            <p>Your one-time password (OTP) is:</p>
            <div style="background-color: #f4f4f4; padding: 12px; font-size: 24px; letter-spacing: 5px; text-align: center; margin: 15px 0;">
              <strong>${otp}</strong>
            </div>
            <p>This code will expire in 30 minutes.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
        `,
                    },
                ],
            });
            return {
                status: 200,
                message: `OTP email sent successfully to, ${toEmail}`,
            };
        }
        catch (error) {
            return { status: 500, message: `Error sending OTP email, ${error}` };
        }
    }
    static async verifyOtp(email, otp) {
        const { data: tokens, error: tokenError } = await supabase_js_1.supabase
            .from("password_reset_tokens")
            .select("*")
            .eq("email", email)
            .eq("token", otp)
            .eq("used", false)
            .gte("expires_at", new Date().toISOString());
        console.log("Tokens:", tokens, tokenError);
        if (tokenError || !tokens || tokens.length === 0) {
            return { status: 400, message: "Invalid or expired OTP" };
        }
        // Mark token as used
        await supabase_js_1.supabase
            .from("password_reset_tokens")
            .update({ used: true })
            .eq("email", email)
            .eq("token", otp);
        console.log("Token marked as used successfully");
        return { status: 200, message: "OTP verified successfully" };
    }
    static async resetPassword(email, newPassword) {
        const { data: user, error: userError } = await AuthService.getuserByEmail(email);
        console.log("Tokens:", user, userError);
        const userId = user?.id;
        const { data, error } = await supabase_js_1.supabase.auth.admin.updateUserById(userId, {
            password: newPassword,
        });
        console.log("Password reset data:", data, error);
        if (error) {
            return { status: 400, message: error.message };
        }
        return { status: 200, message: "Password reset successfully" };
    }
}
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
exports.default = AuthService;
