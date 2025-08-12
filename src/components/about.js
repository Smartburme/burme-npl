import React from 'react';
import { FaShieldAlt, FaTachometerAlt, FaGlobe, FaLock } from 'react-icons/fa';
import { MdDns, MdSettingsEthernet } from 'react-icons/md';
import TeamMemberCard from '../components/TeamMemberCard';
import FeatureCard from '../components/FeatureCard';

const AboutPage = () => {
  const features = [
    {
      icon: <FaTachometerAlt size={32} />,
      title: "High Speed",
      description: "Our optimized servers provide the lowest latency for gaming and streaming"
    },
    {
      icon: <FaShieldAlt size={32} />,
      title: "Military-grade Encryption",
      description: "256-bit encryption to protect all your online activities"
    },
    {
      icon: <FaGlobe size={32} />,
      title: "Global Network",
      description: "100+ servers in 30 countries for worldwide coverage"
    },
    {
      icon: <FaLock size={32} />,
      title: "No Logs Policy",
      description: "We never track or store your online activities"
    },
    {
      icon: <MdDns size={32} />,
      title: "DNS Protection",
      description: "Prevent DNS leaks and protect against malicious sites"
    },
    {
      icon: <MdSettingsEthernet size={32} />,
      title: "Multiple Protocols",
      description: "Support for WireGuard, OpenVPN, IKEv2 and more"
    }
  ];

  const teamMembers = [
    {
      name: "Bobby",
      role: "Lead Developer",
      bio: "10+ years experience in network security and game server optimization",
      avatar: "/assets/team/bobby.jpg"
    },
    {
      name: "Alice",
      role: "Network Engineer",
      bio: "Specializes in low-latency network infrastructure and global CDN",
      avatar: "/assets/team/alice.jpg"
    },
    {
      name: "John",
      role: "Security Expert",
      bio: "Cybersecurity specialist focused on VPN protocols and encryption",
      avatar: "/assets/team/john.jpg"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "10ms", label: "Average Ping" },
    { value: "1M+", label: "Happy Users" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="about-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Burme VPN Game Server</h1>
          <p className="subtitle">
            Premium VPN service optimized for gamers and streamers worldwide
          </p>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Our VPN?</h2>
        <p className="section-description">
          We provide the best gaming VPN experience with these powerful features
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="technology-section">
        <h2>Advanced Technology</h2>
        <div className="tech-content">
          <div className="tech-description">
            <h3>Optimized for Gaming</h3>
            <p>
              Our proprietary network acceleration technology reduces ping and 
              eliminates jitter for competitive gaming. We prioritize game traffic
              to ensure smooth gameplay even during peak hours.
            </p>
            <h3>Secure Connection</h3>
            <p>
              Using the latest WireGuard protocol with 256-bit encryption, your 
              connection stays private and secure without sacrificing speed. Our 
              no-logs policy guarantees your activities are never recorded.
            </p>
            <h3>Global Infrastructure</h3>
            <p>
              With servers strategically located near major game server hubs, 
              we provide the shortest routing path to reduce latency and improve
              your gaming experience.
            </p>
          </div>
          <div className="tech-visual">
            <img 
              src="/assets/network-diagram.png" 
              alt="Network infrastructure diagram"
              className="network-diagram"
            />
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <p className="section-description">
          The experts behind our high-performance VPN service
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              avatar={member.avatar}
            />
          ))}
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Customer Support</h3>
            <p>
              <strong>Email:</strong> support@burmevpn.com<br />
              <strong>Phone:</strong> +95 1 234 5678<br />
              <strong>Live Chat:</strong> Available 24/7 in the app
            </p>
            <h3>Business Inquiries</h3>
            <p>
              <strong>Email:</strong> partners@burmevpn.com<br />
              <strong>For game server partnerships:</strong> games@burmevpn.com
            </p>
          </div>
          <div className="contact-form">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <select>
                  <option value="">Select Department</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Inquiry</option>
                  <option value="business">Business Partnership</option>
                </select>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
