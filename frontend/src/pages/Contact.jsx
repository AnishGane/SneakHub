import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-gray-100 px-6 py-10 sm:py-20">
        <div className="max-w-3xl text-center">
          <h2 className="py-1 text-4xl leading-10 font-semibold">
            Get in <span className="rounded-[4px] bg-black px-2 py-1 text-white">Touch</span>
          </h2>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            <span className="text-red-500"></span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or need support? Reach out to us — we’re here to help you with all things
            sneakers.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl bg-gray-50 px-4 py-8 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm transition outline-none focus:ring-2 focus:ring-black/55"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm transition outline-none focus:ring-2 focus:ring-black/55"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm transition outline-none focus:ring-2 focus:ring-black/55"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-black px-6 py-3 font-medium text-white shadow-md transition hover:bg-black/85"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-xl text-black" />
              <div>
                <h3 className="text-sm font-semibold">Address</h3>
                <p className="text-sm text-gray-600">123 Sneaker St, Fashion City, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-xl text-black" />
              <div>
                <h3 className="text-sm font-semibold">Phone</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-xl text-black" />
              <div>
                <h3 className="text-sm font-semibold">Email</h3>
                <p className="text-sm text-gray-600">support@sneakhub.com</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-black hover:text-white"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-black hover:text-white"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-black hover:text-white"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-black hover:text-white"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <iframe
          title="SneakHub Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4059245046406!2d85.30455442615445!3d27.704750525604712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18561f4aee2b%3A0xea8cc9f7fb4c772b!2sHanuman%20Dhoka%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1756829518468!5m2!1sen!2snp"
          className="h-72 w-full rounded-2xl border-0 shadow-md"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
