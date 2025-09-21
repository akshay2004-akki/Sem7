import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, Mail, MessageSquare, Phone, Send } from 'lucide-react';

// --- Mock Data for FAQs ---
const faqData = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password?" link on the login page. An email will be sent to you with instructions on how to set a new password.'
  },
  {
    question: 'Can I download courses for offline viewing?',
    answer: 'Yes, on our mobile app, you can download individual video lessons or entire courses to watch offline. Look for the download icon next to the lesson title.'
  },
  {
    question: 'How do I get a certificate after completing a course?',
    answer: 'Once you complete all the lessons and pass the final assessment, your certificate will be automatically generated and will appear in the "Certificates" tab of your profile section.'
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee on all course purchases. If you are not satisfied, you can request a full refund within 30 days of your purchase, no questions asked.'
  },
   {
    question: 'How can I contact an instructor?',
    answer: 'You can ask questions directly in the Q&A section of each course. For more direct communication, you can use the community forums and mention the instructor by their username.'
  }
];

// --- Reusable FAQ Item Component ---
const FaqItem = ({ faq, isOpen, onClick }) => (
  <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
    <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-6"
      >
        <h3 className="font-semibold text-white">{faq.question}</h3>
        <ChevronDown
          className={`transform transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
          size={20}
        />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 pb-6 px-6">{faq.answer}</p>
      </div>
    </div>
  </div>
);

// --- Main Support Component ---
export default function SupportSection() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const handleSupportSubmit = (e) => {
      e.preventDefault();
      alert("Your support ticket has been submitted! Our team will get back to you shortly.");
      // Here you would clear the form or redirect
  };

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-4 sm:p-6 lg:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 text-center mt-15">
          <HelpCircle className="mx-auto text-cyan-400" size={48} />
          <h1 className="text-4xl font-bold text-white mt-4">Support Center</h1>
          <p className="text-gray-400 mt-2">We're here to help. Find answers to common questions or get in touch with our team.</p>
        </header>

        {/* FAQ Section */}
        <div className="bg-black p-6 sm:p-8 rounded-2xl border border-zinc-800 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 border-zinc-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isOpen={openFaq === index}
                onClick={() => handleFaqToggle(index)}
              />
            ))}
          </div>
        </div>

        {/* Contact & Ticket Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              <div className="relative bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800 h-full">
                 <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2"><MessageSquare size={20} className="text-cyan-400"/> Submit a Ticket</h3>
                 <p className="text-gray-400 mb-6 text-sm">Our support team will get back to you within 24 hours.</p>
                 <form onSubmit={handleSupportSubmit} className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required/>
                    <input type="email" placeholder="Your Email" className="w-full bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required/>
                    <input type="text" placeholder="Subject" className="w-full bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required/>
                    <textarea placeholder="Please describe your issue..." rows="5" className="w-full bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required></textarea>
                    <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors">
                      <Send size={16} /> Send Message
                    </button>
                 </form>
              </div>
            </div>
            {/* Contact Options */}
            <div className="space-y-6">
                <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                    <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <div className="relative bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-center gap-5 h-full">
                        <Mail size={32} className="text-cyan-400" />
                        <div>
                            <h3 className="text-lg font-semibold text-white">Email Us</h3>
                            <p className="text-gray-400">support@learningplatform.com</p>
                        </div>
                    </div>
                </div>
                 <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                    <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <div className="relative bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-center gap-5 h-full">
                        <Phone size={32} className="text-cyan-400" />
                        <div>
                            <h3 className="text-lg font-semibold text-white">Call Us</h3>
                            <p className="text-gray-400">+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>
                 <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                    <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <div className="relative bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex items-center gap-5 h-full">
                        <HelpCircle size={32} className="text-cyan-400" />
                        <div>
                            <h3 className="text-lg font-semibold text-white">Live Chat</h3>
                            <p className="text-gray-400">Available Mon-Fri, 9am-5pm EST</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

