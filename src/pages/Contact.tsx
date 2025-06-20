"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Clock, Award } from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("https://formspree.io/f/mpwrlvpy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Formspree error:", error)
      setStatus("error")
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "nathijanimantha10@gmail.com",
      href: "mailto:nathijanimantha10@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+94 76 123 1133",
      href: "tel:+94761231133",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Aluthgama, Sri Lanka",
      href: "https://www.google.com/maps/search/?api=1&query=Aluthgama+Sri+Lanka",
    },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/nathija-nimantha", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nathija-nimantha/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/N_N_Jayasinghe", label: "X" },
  ]

  useEffect(() => {
    document.title = "Contact | Nathija Nimantha"
  }, [])

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Get In{" "}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Form and Quick Response */}
            <div className="space-y-8 animate-slide-in">
              {/* Contact Form */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-8">Send Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Project Discussion"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    <Send size={20} />
                    <span>
                      {status === "sending"
                        ? "Sending..."
                        : status === "success"
                          ? "Message Sent!"
                          : "Send Message"}
                    </span>
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again later.</p>
                  )}
                </form>
              </div>

              {/* Quick Response */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Clock className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Quick Response</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  I typically respond within 24 hours. For urgent projects, feel free to mention it in your message for priority handling.
                </p>
              </div>
            </div>

            {/* Right Column - Contact Info and Additional Content */}
            <div className="space-y-8 animate-slide-up">
              {/* Contact Info */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Info</h2>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, title, value, href }) => (
                    <a
                      key={title}
                      href={href}
                      target={title === "Location" ? "_blank" : undefined}
                      rel={title === "Location" ? "noopener noreferrer" : undefined}
                      className="flex items-center space-x-4 p-4 backdrop-blur-md bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{title}</h3>
                        <p className="text-gray-300 text-sm">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                <div className="flex space-x-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 backdrop-blur-md bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 hover:text-primary-400 transition-all duration-300 transform hover:scale-110"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Let's Work Together */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Award className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Let's Collaborate</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  I'm passionate about creating impactful solutions. Whether you need web development, mobile apps, or technical consultation, let's discuss how we can bring your ideas to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact