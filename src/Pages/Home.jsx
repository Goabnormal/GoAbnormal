import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../App.css";
import WaveBackground from "../Components/WaveBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button, message } from "antd";
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
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faFacebookF,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

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

  const onFinish = (values) => {
    console.log(values);

    message.success("Your project request has been submitted successfully.");

    form.resetFields();
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
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

  return (
    <div className="container-fluid m-0 p-0">
      {/* HERO */}
      <div className="hero-section">
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
              <button className="primary-btn">Start Project</button>
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

                <button className="who-btn">Work With Us</button>
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

              <button className="service-btn mt-3">
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

            <button className="why-cta-btn">
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
              <Form
                layout="vertical"
                onFinish={(values) => {
                  console.log(values);
                  message.success("Message sent successfully!");
                }}
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                >
                  <Input placeholder="John Doe" size="large" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Enter valid email",
                    },
                  ]}
                >
                  <Input placeholder="john@example.com" size="large" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Enter phone number",
                    },
                  ]}
                >
                  <Input placeholder="+91 9876543210" size="large" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Project Details"
                  rules={[
                    {
                      required: true,
                      message: "Tell us about your project",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={5}
                    placeholder="Tell us what you're looking to build..."
                  />
                </Form.Item>

                <Button htmlType="submit" className="contact-submit-btn">
                  Start Your Project
                  <FontAwesomeIcon icon={faArrowRight} />
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
              <h2>GoAbnormal</h2>

              <p>
                We help startups build unforgettable brands, high-converting
                websites and growth-driven digital experiences.
              </p>

              <button className="footer-cta-btn">
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
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
