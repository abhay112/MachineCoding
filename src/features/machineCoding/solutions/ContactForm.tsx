import { useState } from "react";

const ContactForm = () => {
    const [details, setDetails] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', details);
    };

    const handleChange = (field: keyof typeof details) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setDetails(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
        <input 
            type="text" 
            placeholder="Name" 
            value={details.name}
            onChange={handleChange('name')}
            className="w-full px-4 py-2 border rounded-lg"
        />
        <input 
            type="email" 
            placeholder="Email" 
            value={details.email}
            onChange={handleChange('email')}
            className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea 
            placeholder="Message" 
            value={details.message}
            onChange={handleChange('message')}
            className="w-full px-4 py-2 border rounded-lg"
        />
        <button 
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
            Submit
        </button>
    </form>
  )
}

export default ContactForm
