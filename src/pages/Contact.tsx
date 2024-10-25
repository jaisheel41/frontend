// src/pages/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');  // For showing success message

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate sending the message (you can replace this with actual backend logic)
        setSuccessMessage('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-4xl mx-auto"
        >
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Contact Me</h1>
            
            {successMessage && (
                <div className="mb-6 text-green-600 text-center font-semibold">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    Send Message
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Contact;
