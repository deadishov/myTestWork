import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormSubmitted(true);
            } else {
                console.error('Form submission failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (formSubmitted) {
            console.log('Form submitted successfully!');
            // Show any success message to the user here, or perform any other actions after successful submission.
        }
    }, [formSubmitted]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};


