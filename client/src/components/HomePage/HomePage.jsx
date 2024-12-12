import * as React from 'react';
import './HomePage.css';
import Typewriter from 'typewriter-effect';
import * as FaIcons from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    // FAQ Section functionality
    const [faqs, setFaqs] = useState([
        {
            question: 'What is VisionScape?',
            answer: 'VisionScape is an AI-powered web application that helps you create personalized vision boards and achieve your goals.',
            isOpen: false
        },
        {
            question: 'How does VisionScape work?',
            answer: 'VisionScape simplifies the process of creating vision boards by sourcing images, offering design options, and providing actionable plans to help you achieve your goals.',
            isOpen: false
        },
        {
            question: 'Is VisionScape free to use?',
            answer: 'VisionScape is a free website to use to create your own vision boards.',
            isOpen: false
        },
    ]);

    const toggleAnswer = (index) => {
        setFaqs(faqs.map((faq, i) => (
            i === index ? { ...faq, isOpen: !faq.isOpen } : faq
        )));
    };

    // Carousel functionality
    const carouselImages = [
        "communityVisionPic.png"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [carouselImages.length]);

    // Navigate to Quiz Page
    const handleCreateVision = () => {
        navigate('/vision-board');
    };

    return (
        <div className="homepage">
            <div className="homepage-header">
                <div className="header-content">
                    <h1>
                        <Typewriter
                            options={{
                                strings: ['See It', 'Believe It', 'Achieve It'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                    <h2>Bring Your Dreams to Life with VisionScape</h2>
                    <p>
                        VisionScape empowers you to turn your dreams into a vivid reality. Create personalized vision boards that inspire and guide you toward achieving your goals every day.
                    </p>
                    <button className="cta-button" onClick={handleCreateVision}>
                        Create Your Vision
                    </button>
                </div>
            </div>

            <div className='homepage-vision'>
                <div className='vision-header'>
                    <h2>Turning That Vision Into Reality</h2>
                    <p>Learn about how we make your vision board turn into a reality!</p>
                </div>
                <div className='vision-content'>
                    <div className='vision-feature'>
                        <div className='feature-icon'>
                            <FaIcons.FaRegStar size={40} color="#1e3a5f" />
                        </div>
                        <div className='feature-text'>
                            <h2>Answer the Questionnaire</h2>
                            <p>Answer questions about your specific goals, so we can design your vision board.</p>
                        </div>
                    </div>

                    <div className='vision-feature'>
                        <div className='feature-icon'>
                            <FaIcons.FaPaintBrush size={40} color="#1e3a5f" />
                        </div>
                        <div className='feature-text'>
                            <h2>Design Your Dreams</h2>
                            <p>VisionScape will generate and provide multiple design choices based on your answers.</p>
                        </div>
                    </div>

                    <div className='vision-feature'>
                        <div className='feature-icon'>
                            <FaIcons.FaRoad size={40} color="#1e3a5f" />
                        </div>
                        <div className='feature-text'>
                            <h2>Follow the Steps</h2>
                            <p>After you've obtained your vision, we will curate steps for you to help your vision come true!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="homepage-trending">
                <div className="trending-header">
                    <h2>Get Inspired, Motivated, and Motivate Others</h2>
                    <p>Join the VBG Community Hub to share, collaborate, and achieve your dreams.</p>
                </div>
                <div className="trending-content">
                    {/* Left Column: Image */}
                    <div className="trending-image">
                        <img
                            src={carouselImages[currentImage]}
                            alt="Community Hub"
                            className="carousel-image"
                        />
                    </div>

                    {/* Right Column: Features */}
                    <div className="trending-steps">
                        <div className="step">
                            <FaIcons.FaShareAlt size={30} color="#1e3a5f" />
                            <div className="step-text">
                                <h3>Share</h3>
                                <p>
                                    Share your vision boards with a community of like-minded individuals.
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <FaIcons.FaHandsHelping size={30} color="#1e3a5f" />
                            <div className="step-text">
                                <h3>Collaborate</h3>
                                <p>
                                    The VBG Community Hub is a space to collaborate with others.
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <FaIcons.FaGlassCheers size={30} color="#1e3a5f" />
                            <div className="step-text">
                                <h3>Celebrate</h3>
                                <p>
                                    Celebrate milestones and successes within the community.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='homepage-faq'>
                <div className='heading'>
                    <h2>Frequently Asked Questions</h2>
                </div>
                <div className='faq-content'>
                    {faqs.map((faq, index) => (
                        <div className='faq-item' key={index}>
                            <div className='faq-question' onClick={() => toggleAnswer(index)}>
                                <h3>{faq.question}</h3>
                                <div className='toggle-icon'>{faq.isOpen ? '-' : '+'}</div>
                            </div>
                            {faq.isOpen && (
                                <div className='faq-answer'>
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
