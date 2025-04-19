import AuthService from "../services/authService.js";
export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await AuthService.signup(email, password);
        res.status(200).json({ message: "Signup successful", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
export const signinWithProvider = async (req, res) => {
    const { provider } = req.body;
    try {
        const result = await AuthService.signupWithProvider(provider);
        res.status(200).json({ message: "Signup with provider successful", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await AuthService.login(email, password);
        res.status(200).json({ message: "Login successful", data: result });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
export const logout = async (_req, res) => {
    try {
        await AuthService.logout();
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
