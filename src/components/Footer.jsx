import React from 'react'
import { motion } from 'framer-motion'
import { FaTiktok, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const socialLinks = [
    { icon: FaTiktok, url: 'https://www.tiktok.com/@westwatch_?is_from_webapp=1&sender_device=pc', label: 'TikTok' },
    { icon: FaTwitter, url: 'https://x.com/Stiven_ZD', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://www.instagram.com/stiven_zd/', label: 'Instagram' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/jhoan-stiven-zarza-delgado-a1a069280/', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/Stivenz3', label: 'GitHub' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container">
        <div className="footer-content">
          <motion.div className="footer-main" variants={itemVariants}>
            <div className="footer-brand">
              <img 
                src="/img/fire.png" 
                alt="Mi Llanerita Logo" 
                className="footer-logo"
              />
              <h3>Mi Llanerita</h3>
            </div>
            
            <div className="footer-contact">
              <div className="contact-info">
                <div className="contact-item">
                  <FaPhone />
                  <span>+57 322 631 2704</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>San Onofre, Sucre</span>
                </div>
                <div className="contact-item">
                  <FaClock />
                  <span>Lun - Dom: 9:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          variants={itemVariants}
        >
          <p>&copy; 2025 Mi Llanerita. Todos los derechos reservados.</p>
          <p>Desarrollado con ❤️</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer