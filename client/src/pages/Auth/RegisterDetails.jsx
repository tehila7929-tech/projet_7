import axios from 'axios';
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import "./Auth.css";

export default function RegisterDetails() {
    const baseUrl = "http://localhost:3000/users"

    const location = useLocation();
    const navigate = useNavigate();
    const { setCurrentUser } = useUser();


    const userData = location.state;
    useEffect(() => {
        if (!userData) {
            setTimeout(() => {
                navigate("/register");
            }, 1000);
        }
    }, [userData, navigate]);

    if (!userData) {
        return <p>Redirecting to registration...</p>;
    }

    const { username, password } = userData;
    const [formData, setFormData] = useState({
        name: "",
        username: username,
        password: password,
        email: "",
        address: "",
        phone: "",
        website: "",
        company: ""
    })

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Invalid email format";
        if (formData.phone && !/^[\d\-\+\(\)\s]+$/.test(formData.phone))
            newErrors.phone = "Invalid phone format";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const res = await axios.post(baseUrl, formData);
                setCurrentUser(res.data);
                navigate(`/home`);
            }
            catch (err) {
                setServerError(err.response?.data?.error || err.message || 'Registration failed');
            }

        }
    }

    return (
        <div className="auth-container">
            <div className="auth-side">
                <div className="auth-side-content">
                    <h2>Almost There</h2>
                    <p>Complete your profile to finish registration</p>
                </div>
            </div>
            <div className="auth-main">
                <div className="auth-card" style={{ maxWidth: '520px' }}>
                    <h1>Complete Registration</h1>
                    <p className="auth-subtitle">Fill in your details</p>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            className="auth-input"
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            onChange={handleChange}
                            value={formData.name}
                            style={{ borderColor: errors.name ? '#ef4444' : '' }}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}

                        <input
                            className="auth-input"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={formData.email}
                            style={{ borderColor: errors.email ? '#ef4444' : '' }}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}

                        <input
                            className="auth-input"
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            onChange={handleChange}
                            value={formData.phone}
                            style={{ borderColor: errors.phone ? '#ef4444' : '' }}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}

                        <input
                            className="auth-input"
                            name="address"
                            type="text"
                            placeholder="Address (e.g. Main St 5, Tel Aviv)"
                            onChange={handleChange}
                            value={formData.address}
                        />

                        <input
                            className="auth-input"
                            name="company"
                            type="text"
                            placeholder="Company (optional)"
                            onChange={handleChange}
                            value={formData.company}
                        />

                        <button className="auth-button" type='submit'>Complete Registration</button>
                    </form>
                    {serverError && <p className="error-text" style={{ textAlign: 'center', marginTop: '16px' }}>{serverError}</p>}
                </div>
            </div>
        </div>
    )
}