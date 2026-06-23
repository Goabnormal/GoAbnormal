import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../App.css";
import WaveBackground from "../Components/WaveBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../Assets/Images/foote_goabnormaltec_logo.png";
import { Form, Input, Button, message, notification } from "antd";
import {
  faGlobe,
  faCode,
  faRobot,
  faBullhorn,
  faArrowRight,
  faCheck,
  faRocket,
  faGem,
  faChartLine,
  faLightbulb,
  faLayerGroup,
  faBullseye,
  faEnvelope,
  faPhone,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

import {
  faInstagram,
  faFacebookF,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
const { TextArea } = Input;

function ServiceCard({
  service,
  index,
  activeService,
  setActiveService,
  previewRef,
}) {
  const isMobile = window.innerWidth <= 992;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
    rootMargin: "-20% 0px -20% 0px",
  });

  useEffect(() => {
    if (!isMobile && inView) {
      setActiveService(index);
    }
  }, [inView, index, setActiveService, isMobile]);

  return (
    <div
      ref={ref}
      onClick={() => {
        setActiveService(index);

        if (isMobile && previewRef?.current) {
          setTimeout(() => {
            previewRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      }}
      className={`service-card ${activeService === index ? "active-card" : ""}`}
    >
      <div className="service-shape"></div>
      <span>{service.number}</span>
      <h3>{service.title}</h3>
    </div>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const previewRef = useRef(null);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbw-GOSjtzqYPRRwwKtn5fS7KXgzIQKdpB9uYnM9lATIxuLMbhP2WYToRKT5wBeCrjpOsw/exec";

  /* FORM SUBMIT */
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      /* USER SYSTEM TIME */
      const submittedAt = dayjs().format("DD-MM-YYYY HH:mm:ss");

      /* PAYLOAD */
      const payload = {
        action: "submitContact",

        name: values.name || "",

        phone: values.phone || "",

        email: values.email || "",

        message: values.message || "",

        submittedAt,
      };

      /* FORM DATA */
      const formBody = new URLSearchParams(payload).toString();

      /* API CALL */
      const response = await fetch(GAS_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: formBody,
      });

      /* SAFER RESPONSE */
      const text = await response.text();

      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      /* SUCCESS */
      if (data.success) {
        notification.success({
          message: (
            <span
              style={{
                color: "#113156",
                fontWeight: 700,
              }}
            >
              Message Sent
            </span>
          ),

          description: (
            <span
              style={{
                color: "#113156",
              }}
            >
              Your message has been submitted successfully.
            </span>
          ),

          placement: "bottomRight",
        });

        form.resetFields();
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (error) {
      notification.error({
        message: (
          <span
            style={{
              color: "#d1343c",
              fontWeight: 700,
            }}
          >
            Submission Failed
          </span>
        ),

        description: (
          <span
            style={{
              color: "#113156",
            }}
          >
            Something went wrong. Please try again.
          </span>
        ),

        placement: "bottomLeft",
      });
    } finally {
      setLoading(false);
    }
  };

  const styl = `.contact-form-card .ant-input, .contact-form-card .ant-input-affix-wrapper {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    border-radius: 14px;
    padding: 10px; 
}`

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.96,
      filter: "blur(12px)",
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",

      transition: {
        duration: 3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const services = [
    {
      number: "01",
      icon: faGlobe,
      title: "Website Development",
      desc: "Beautiful, conversion-focused websites crafted to establish credibility, engage visitors and generate measurable business growth.",
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Lightning Fast",
        "Conversion Focused",
      ],
    },

    {
      number: "02",
      icon: faCode,
      title: "Web Application Development",
      desc: "Scalable web applications engineered with modern technologies that support your startup's growth journey.",
      features: [
        "Custom Dashboards",
        "API Integration",
        "Cloud Ready",
        "Secure Architecture",
      ],
    },

    {
      number: "03",
      icon: faRobot,
      title: "AI Video Production",
      desc: "Attention-grabbing AI generated content designed to increase engagement and accelerate brand awareness.",
      features: [
        "AI Avatars",
        "Voice Generation",
        "Social Reels",
        "Brand Storytelling",
      ],
    },

    {
      number: "04",
      icon: faBullhorn,
      title: "Digital Marketing",
      desc: "Data-driven campaigns built to generate leads, increase visibility and maximize return on investment.",
      features: [
        "Meta Ads",
        "Google Ads",
        "SEO Growth",
        "Performance Tracking",
      ],
    },
  ];

  const whyFeatures = [
    {
      icon: faRocket,
      title: "Startup Focused",
      desc: "Every solution is built for ambitious startups that need speed, clarity and growth.",
    },
    {
      icon: faGem,
      title: "Premium Execution",
      desc: "Modern websites, polished experiences and world-class digital craftsmanship.",
    },
    {
      icon: faChartLine,
      title: "Growth Driven",
      desc: "Everything we create is designed to generate visibility, engagement and revenue.",
    },
    {
      icon: faLightbulb,
      title: "Creative Thinking",
      desc: "We challenge ordinary ideas and build brands that people actually remember.",
    },
    {
      icon: faLayerGroup,
      title: "Complete Ecosystem",
      desc: "Branding, websites, AI content and marketing working together as one system.",
    },
    {
      icon: faBullseye,
      title: "Results First",
      desc: "No vanity metrics. No unnecessary complexity. Just measurable business impact.",
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    const hero = document.getElementById("home");

    if (hero) {
      hero.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
    <style>{styl}</style>
    <div className="container-fluid m-0 p-0">
      {/* HERO */}
      <div id="home" className="hero-section">
        <WaveBackground />

        <div className="hero-overlay"></div>

        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className="mt-5">
              <span className="hero-line mt-5 mt-lg-5">
                We Don't Do Normal.{" "}
              </span>

              <span className="hero-line mt-3 mt-lg-4">
                Neither Should You.
              </span>
            </h1>

            <p className="hero-description mt-3">
              We are GoAbnormal - a digital agency built for startups who refuse
              to blend in.
            </p>

            <div className="hero-buttons mb-5">
              <button className="primary-btn" onClick={scrollToContact}>
                Start Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="who-section">
        <motion.div
          id="about"
          className="container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {" "}
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="who-content">
                <span className="section-tag">ABOUT US</span>

                <h2>
                  We Build Brands
                  <span> People Can't Ignore.</span>
                </h2>

                <p>
                  GoAbnormal was created because the world doesn't need another
                  average agency.
                </p>

                <button className="who-btn" onClick={scrollToContact}>
                  Work With Us
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>
                    <CountUp
                      end={50}
                      duration={3}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    +
                  </h3>
                  <p>Projects Delivered</p>
                </div>

                <div className="stat-card">
                  <h3>
                    <CountUp
                      end={15}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    +
                  </h3>
                  <p>Happy Clients</p>
                </div>

                <div className="stat-card">
                  <h3>
                    <CountUp
                      end={2}
                      duration={1}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    +
                  </h3>
                  <p>Years Experience</p>
                </div>

                <div className="stat-card">
                  <h3>
                    <CountUp
                      end={4}
                      duration={1}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    +
                  </h3>
                  <p>Industries Served</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>{" "}
      </div>

      {/* SERVICES */}
      <section className="services-section pb-5">
        <motion.div
          id="services"
          className="container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {" "}
          <div className="services-header">
            <span className="section-tag">OUR SERVICES</span>

            <h2>
              Built To Make
              <br />
              Brands Impossible To Ignore
            </h2>
          </div>
          <div className="services-wrapper">
            {/* LEFT SIDE */}
            <div className="services-list">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  activeService={activeService}
                  setActiveService={setActiveService}
                  previewRef={previewRef}
                />
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="service-preview" ref={previewRef}>
              <div className="preview-number">
                {services[activeService].number}
              </div>

              <div className="service-icon">
                <FontAwesomeIcon icon={services[activeService].icon} />
              </div>

              <h3>{services[activeService].title}</h3>

              <p>{services[activeService].desc}</p>

              <div className="service-features">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <FontAwesomeIcon icon={faCheck} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="service-btn mt-3" onClick={scrollToContact}>
                Learn More
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="why-section">
        <motion.div
          id="why"
          className="container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {" "}
          <div className="why-header">
            <span className="section-tag">WHY GO ABNORMAL</span>

            <h2>
              Because <span>Normal</span>
              <br />
              Never Built Legends.
            </h2>

            <p>
              We combine strategy, design, technology and marketing to create
              brands people notice, trust and remember.
            </p>
          </div>
          <div className="why-grid">
            {whyFeatures.map((item, index) => (
              <div
                className="why-feature-card"
                key={index}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div className="why-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="why-cta-card">
            <div className="cta-glow"></div>

            <h3>
              Ready To Build Something
              <span> Extraordinary?</span>
            </h3>

            <p>Let's create a brand that people remember, trust and choose.</p>

            <button className="why-cta-btn" onClick={scrollToContact}>
              Start Your Project
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="contact-section">
        <motion.div
          id="contact"
          className="container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {" "}
          <div className="contact-wrapper">
            {/* LEFT SIDE */}

            <div className="contact-content">
              <span className="section-tag">CONTACT US</span>

              <h2>
                Let's Build
                <span> Something Abnormal.</span>
              </h2>

              <p>
                Whether you need a website, AI content, digital marketing or a
                complete brand transformation, we're ready to help.
              </p>

              <div className="contact-info">
                <div className="contact-info-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>goutham@goabnormal.com</span>
                </div>

                <div className="contact-info-item">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>+91 98400 14045</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="contact-form-card">
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <div className="row">
                  {/* NAME */}
                  <div className="col-md-6">
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your name",
                        },
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: "Name should contain only letters",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your full name" size="large" />
                    </Form.Item>
                  </div>

                  {/* PHONE */}
                  <div className="col-md-6">
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter phone number",
                        },
                        {
                          pattern: /^[+0-9\s]{10,20}$/,
                          message: "Please enter a valid phone number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter phone number"
                        size="large"
                        maxLength={20}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* EMAIL */}
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter email address",
                    },
                    {
                      type: "email",
                      message: "Enter valid email address",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email address" size="large" />
                </Form.Item>

                {/* MESSAGE */}
                <Form.Item
                  label="Project Details"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your project details",
                    },
                    {
                      max: 300,
                      message: "Message cannot exceed 300 characters",
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    maxLength={300}
                    showCount
                    placeholder="Tell us about your project..."
                  />
                </Form.Item>

                <Button
                  htmlType="submit"
                  className="contact-submit-btn"
                  block
                  loading={loading}
                >
                  <span>{loading ? "Sending..." : "Start Your Project"}</span>

                  {!loading && (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="contact-btn-arrow"
                    />
                  )}
                </Button>
              </Form>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="footer-section">
        <div className="footer-glow"></div>

        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div
                className="footer-logo-wrapper"
                onClick={() => {
                  document.getElementById("home")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <img src={logo} alt="GoAbnormal" className="footer-logo" />
              </div>

              <p>
                We help startups build unforgettable brands, high-converting
                websites and growth-driven digital experiences.
              </p>

              <button className="footer-cta-btn" onClick={scrollToContact}>
                Start Your Project
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Navigation</h4>

                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
              </div>

              <div className="footer-column">
                <h4>Services</h4>

                <a href="#services">Website Development</a>
                <a href="#services">Web Applications</a>
                <a href="#services">AI Video Production</a>
                <a href="#services">Digital Marketing</a>
              </div>

              <div className="footer-column">
                <h4>Contact</h4>

                <span>goutham@goabnormal.com</span>
                <span>+91 98400 14045</span>
                <span>
                  Venkatapuram, NSR road, <br /> Sriram Layout Rd, Saibaba
                  Colony, <br /> Coimbatore, Tamil Nadu 641011
                </span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} GoAbnormal. All Rights Reserved.</p>

            <div className="footer-socials">
              <a
                href="https://www.instagram.com/go_abnormalmt/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61587317757270"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>

              <a
                href="https://www.linkedin.com/in/stratifytechnologies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>

              <a
                href="https://wa.me/919840014045"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/919840014045"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-chat-circle"
      >
        <FontAwesomeIcon icon={faComments} bounce />
      </a>
    </div>
    </>
  );
}
