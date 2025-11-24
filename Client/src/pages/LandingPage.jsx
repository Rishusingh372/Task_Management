import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/LandingPage.css';

const LandingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        service: ''
    });

    const services = [
        'Web Development',
        'App Development', 
        'Google Ads',
        'Data Analytics',
        'Digital Marketing',
        'UI/UX Design'
    ];

    const features = [
        {
            icon: '🚀',
            title: 'Fast Delivery',
            description: 'Quick turnaround times for all your projects'
        },
        {
            icon: '💼',
            title: 'Professional Team',
            description: 'Experienced professionals for quality work'
        },
        {
            icon: '🛡️',
            title: 'Secure & Reliable',
            description: 'Your data and projects are safe with us'
        },
        {
            icon: '📈',
            title: 'Growth Focused',
            description: 'Solutions designed for your business growth'
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = `${import.meta.env.VITE_BACKEND_URL}/api/contact`;
            await axios.post(api, formData);
            toast.success('Thank you! We will contact you soon.');
            setFormData({
                name: '',
                number: '',
                email: '',
                service: ''
            });
        } catch (error) {
            toast.error('Failed to submit form. Please try again.');
            console.error('Form submission error:', error);
        }
    };

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Transform Your Business With Digital Excellence</h1>
                    <p>We provide cutting-edge solutions in web development, mobile apps, and digital marketing to drive your business growth.</p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                            Get Started
                        </button>
                        <button className="btn-secondary">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="floating-card card-1">
                        <span>🚀</span>
                        <p>Fast Development</p>
                    </div>
                    <div className="floating-card card-2">
                        <span>💼</span>
                        <p>Professional Team</p>
                    </div>
                    <div className="floating-card card-3">
                        <span>📈</span>
                        <p>Growth Focused</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2>Why Choose Us?</h2>
                    <p className="section-subtitle">We deliver exceptional value through our comprehensive services</p>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="container">
                    <h2>Our Services</h2>
                    <p className="section-subtitle">Comprehensive solutions for your digital needs</p>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">🌐</div>
                            <h3>Web Development</h3>
                            <p>Responsive, modern websites and web applications built with latest technologies</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">📱</div>
                            <h3>App Development</h3>
                            <p>Native and cross-platform mobile applications for iOS and Android</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">🎯</div>
                            <h3>Google Ads</h3>
                            <p>Strategic PPC campaigns to drive targeted traffic and conversions</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">📊</div>
                            <h3>Data Analytics</h3>
                            <p>Data-driven insights and analytics to inform your business decisions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="contact-content">
                        <div className="contact-info">
                            <h2>Get In Touch</h2>
                            <p>Ready to start your project? Contact us today and let's discuss how we can help your business grow.</p>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <span className="contact-icon">📧</span>
                                    <span>hello@taskflow.com</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">📞</span>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">📍</span>
                                    <span>123 Business Ave, Suite 100<br />New York, NY 10001</span>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form-container">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <h3>Send us a Message</h3>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="number"
                                        placeholder="Phone Number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Service</option>
                                        {services.map((service, index) => (
                                            <option key={index} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="submit-btn">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;