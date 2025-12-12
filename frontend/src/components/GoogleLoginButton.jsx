import { useEffect, useRef } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// Get from environment variable or use directly
// You should put your Google Client ID here
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

export default function GoogleLoginButton() {
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.google || !buttonRef.current) return;

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            width: 240,
        });
    }, []);

    const handleCredentialResponse = async (response) => {
        try {
            console.log("Google Response:", response);
            // response.credential is a JWT (Google ID token)
            const googleIdToken = response.credential;

            await api.post("/api/auth/google", {
                credential: googleIdToken
            });

            console.log("Logged in via Google");
            navigate("/restaurants"); // redirect after login
        } catch (err) {
            console.error("Google login failed", err);
        }
    };

    return <div ref={buttonRef}></div>;
}

