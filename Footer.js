import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      padding: '40px 20px',
      borderTop: '1px solid #1e293b',
      marginTop: '50px',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff', marginBottom: '10px' }}>Snaperase AI</h2>
        <p style={{ fontSize: '14px', marginBottom: '20px' }}>
          Professional 4K Background Remover & Image Upscaler.
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          flexWrap: 'wrap',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          <a href="#privacy" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#terms" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#contact" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Contact Us</a>
        </div>

        <hr style={{ borderColor: '#1e293b', marginBottom: '20px' }} />

        <div style={{ fontSize: '12px' }}>
          <p>© 2025 Snaperase AI. Managed by MD. RAYHAN ISLAM BAPPY</p>
          <p>Address: 333 no West rampura, Dhaka 1219, Bangladesh</p>
          <p>WhatsApp: +8801410802088 | Email: mdb79833@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
