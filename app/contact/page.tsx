'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We&apos;re here to help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Cards */}
          {[
            {
              icon: Mail,
              title: 'Email',
              details: 'hello@closet.com',
              description: 'Response within 24 hours',
            },
            {
              icon: Phone,
              title: 'Phone',
              details: '+1 (555) 123-4567',
              description: 'Monday - Friday, 9 AM - 6 PM EST',
            },
            {
              icon: MapPin,
              title: 'Location',
              details: 'New York, NY',
              description: '123 Fashion Avenue, Suite 100',
            },
          ].map((contact, i) => {
            const Icon = contact.icon;
            return (
              <div key={i} className="border border-border rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-secondary rounded-full">
                    <Icon size={24} className="text-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
                <p className="font-medium mb-2">{contact.details}</p>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-foreground/90 h-12"
              >
                Send Message
              </Button>

              {submitted && (
                <p className="text-center text-green-600 font-semibold">
                  Thank you! Your message has been sent.
                </p>
              )}
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: 'What is your return policy?',
                  answer: 'We offer a 30-day return policy on all unworn items with tags attached. Free return shipping is available.',
                },
                {
                  question: 'How long does shipping take?',
                  answer: 'Standard shipping takes 5-7 business days. We also offer express (2-3 days) and overnight options.',
                },
                {
                  question: 'Do you ship internationally?',
                  answer: 'Yes, we ship to most countries worldwide. International shipping rates vary by location.',
                },
                {
                  question: 'How do I track my order?',
                  answer: 'You will receive a tracking number via email once your order ships. You can use it to track your package.',
                },
                {
                  question: 'Are your products eco-friendly?',
                  answer: 'We are committed to sustainability and use eco-friendly materials whenever possible.',
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Hours */}
        <div className="mt-16 bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock size={24} />
            Store Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
              { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
              { day: 'Sunday', hours: 'Closed' },
              { day: 'Holidays', hours: 'Closed' },
            ].map((schedule, i) => (
              <div key={i} className="flex justify-between">
                <span className="font-semibold">{schedule.day}</span>
                <span className="text-muted-foreground">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
