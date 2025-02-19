import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const mailtoLink = `mailto:chrabondey@gmail.com?subject=Contact Form Submission&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AMessage: ${formData.message}`;
        window.location.href = mailtoLink;
        
        Swal.fire({
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div className='mt-8'>
              <h2 className="text-4xl font-bold ">Contact<span className='text-[#006dc7]'>Us</span></h2>
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        <div className="lg:mb-0 mb-10">
                            <div className="group w-full h-full">
                                <div className="relative h-full">
                                    <img src="https://pagedone.io/asset/uploads/1696488602.png" alt="Contact Us" className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"/>
                                    <h1 className="text-white text-4xl font-bold absolute top-11 left-11">Contact us</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                            <h2 className="text-[#006dc7] text-4xl font-bold  mb-11">Send Us A Message</h2>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg rounded-full border border-gray-200 pl-4 mb-4" placeholder="Name" required/>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg rounded-full border border-gray-200 pl-4 mb-4" placeholder="Email" required/>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg rounded-full border border-gray-200 pl-4 mb-4" placeholder="Phone" required/>
                                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full h-24 text-gray-600 placeholder-gray-400 bg-transparent text-lg rounded-full border border-gray-200 pl-4 p-4 mb-4" placeholder="Message" required/>
                                <button type="submit" className="w-full h-12 text-white text-base font-semibold rounded-full bg-[#006dc7] hover:bg-indigo-800">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
