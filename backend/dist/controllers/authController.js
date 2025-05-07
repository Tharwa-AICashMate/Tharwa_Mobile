import AuthService from "../services/authService.js";
export const signup = async (req, res) => {
    const user = req.body;
    try {
        const result = await AuthService.signup(user.user);
        res.status(200).json({ message: "Signup successful", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    console.log(req.body);
    try {
        const result = await AuthService.login(req.body.userId);
        res.status(200).json({ message: "Login successful", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await AuthService.forgetPassword(email);
        res.status(200).json({ message: "Password reset link sent", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const result = await AuthService.verifyOtp(email, otp);
        res.status(200).json({ message: "OTP verified", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
export const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await AuthService.resetPassword(email, password);
        res.status(200).json({ message: "Password reset successfully", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
