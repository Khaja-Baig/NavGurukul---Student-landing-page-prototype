import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AutonomousBird } from '../AutonomousBird';

export const alumni = [
    {
        n: 'Ananya Singh', co: 'Zoho', domain: 'zoho.com',
        role: 'Full Stack Dev', pkg: '₹4.5 LPA', color: '#e91e63',
        batch: 'Batch of 2022', city: 'Chennai',
        quote: 'NavGurukul gave me hands-on peer learning and 1-on-1 mentorship. Cracking Zoho with zero prior tech background was a dream turned reality!'
    },
    {
        n: 'Rahul Kumar', co: 'Razorpay', domain: 'razorpay.com',
        role: 'Data Analyst', pkg: '₹4.2 LPA', color: '#d97706',
        batch: 'Batch of 2023', city: 'Bengaluru',
        quote: 'Coming from a small village with zero coding experience, NavGurukul transformed my trajectory into a fintech unicorn analyst.'
    },
    {
        n: 'Priya Sharma', co: 'Swiggy', domain: 'swiggy.com',
        role: 'QA Engineer', pkg: '₹3.8 LPA', color: '#059669',
        batch: 'Batch of 2022', city: 'Bengaluru',
        quote: 'The 100% scholarship residential program gave me focus, safety, and world-class training to start my engineering career.'
    },
    {
        n: 'Karan Patel', co: 'Infosys', domain: 'infosys.com',
        role: 'Backend Dev', pkg: '₹4.8 LPA', color: '#0284c7',
        batch: 'Batch of 2021', city: 'Pune',
        quote: 'NavGurukul taught me how to learn on my own. That self-learning ability is why I excel today as a senior backend engineer.'
    },
    {
        n: 'Sneha Verma', co: 'TCS', domain: 'tcs.com',
        role: 'Frontend Dev', pkg: '₹4.0 LPA', color: '#e91e63',
        batch: 'Batch of 2023', city: 'Mumbai',
        quote: 'Building real projects alongside passionate peers under the banyan tree vibe made learning web dev fun and fast!'
    },
    {
        n: 'Vikram Joshi', co: 'Freshworks', domain: 'freshworks.com',
        role: 'Support Eng', pkg: '₹3.6 LPA', color: '#d97706',
        batch: 'Batch of 2022', city: 'Chennai',
        quote: 'From zero confidence to leading product support at Freshworks! NavGurukul truly empowers youth from underserved communities.'
    }
];

export const companyPool = [
    { co: 'Zoho', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23ea2328'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='28' letter-spacing='-1'>ZOHO</text></svg>" },
    { co: 'Razorpay', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23072654'/><path d='M25 75 L55 25 L75 25 L45 75 Z' fill='%233395ff'/><path d='M42 75 L72 25 L82 25 L52 75 Z' fill='%2300d2ff' opacity='0.85'/></svg>" },
    { co: 'Swiggy', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23fc8019'/><path d='M50 20 C38 20 30 28 30 38 C30 52 50 78 50 78 C50 78 70 52 70 38 C70 28 62 20 50 20 Z M50 48 C44.5 48 40 43.5 40 38 C40 32.5 44.5 28 50 28 C55.5 28 60 32.5 60 38 C60 43.5 55.5 48 50 48 Z' fill='%23ffffff'/></svg>" },
    { co: 'Infosys', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23007cc3'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='26' letter-spacing='-1'>infosys</text></svg>" },
    { co: 'TCS', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23004b87'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='32' letter-spacing='1'>TCS</text></svg>" },
    { co: 'Freshworks', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23111827'/><path d='M30 25 L70 25 C75 25 75 35 70 35 L45 35 L45 50 L65 50 C70 50 70 60 65 60 L45 60 L45 80 L30 80 Z' fill='%23f43f5e'/></svg>" },
    { co: 'Wipro', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23ffffff' stroke='%23cbd5e1' stroke-width='3'/><circle cx='36' cy='45' r='14' fill='%23e11d48'/><circle cx='64' cy='45' r='14' fill='%232563eb'/><circle cx='50' cy='62' r='14' fill='%23059669'/></svg>" },
    { co: 'HCLTech', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%2300529b'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='28'>HCL</text></svg>" },
    { co: 'Accenture', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23a100ff'/><path d='M25 65 L75 35 L75 48 L35 75 Z' fill='%23ffffff'/></svg>" },
    { co: 'Flipkart', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%232874f0'/><text x='50' y='66' text-anchor='middle' fill='%23ffe500' font-family='sans-serif' font-weight='900' font-size='42'>f</text></svg>" }
];

export const Screen2_AlumniSuccess = () => {
    const { currentScreen, openTestimonialModal } = useApp();
    const [activeSlots, setActiveSlots] = useState([0, 1, 2, 3, 4, 5]);
    const [animatingSlot, setAnimatingSlot] = useState(null);

    // Company logo rotation interval matching original js/screens.js
    useEffect(() => {
        if (currentScreen !== 3) return;

        const activeSlotsRef = [0, 1, 2, 3, 4, 5];
        const unassignedPoolRef = [6, 7, 8, 9];
        setActiveSlots([0, 1, 2, 3, 4, 5]);

        const interval = setInterval(() => {
            if (unassignedPoolRef.length === 0) return;

            const slotIdx = Math.floor(Math.random() * activeSlotsRef.length);
            const nextCoIdx = unassignedPoolRef.shift();
            const prevCoIdx = activeSlotsRef[slotIdx];

            unassignedPoolRef.push(prevCoIdx);
            activeSlotsRef[slotIdx] = nextCoIdx;

            setActiveSlots([...activeSlotsRef]);
            setAnimatingSlot(slotIdx);
            setTimeout(() => setAnimatingSlot(null), 450);
        }, 2800);

        return () => clearInterval(interval);
    }, [currentScreen]);

    const marqueeAlumni = [...alumni, ...alumni];

    return (
        <section className={`screen ${currentScreen === 3 ? 'active' : ''}`} data-i="3">
            {/* Autonomous Flying Bird Layer (Only present inside Screen 4) */}
            {currentScreen === 3 && <AutonomousBird />}

            <div className="eyebrow"><span className="eyebrow-star">✨</span> Student Outcomes</div>
            <h1 className="headline"><span className="highlight-pink">2,000+ Dreams</span> Turned into Real Jobs</h1>
            <p className="screen2-subline">Skills that opened doors. Careers that changed lives.</p>

            <div className="alumni-viewport">
                <div className="alumni-track" id="alumniTrack">
                    {marqueeAlumni.map((a, idx) => {
                        const realIdx = idx % alumni.length;
                        const initials = a.n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                        return (
                            <div
                                key={idx}
                                className="alumni-card"
                                data-idx={realIdx}
                                onClick={() => openTestimonialModal(realIdx)}
                                role="button"
                                tabIndex={0}
                                title={`Click to view ${a.n}'s testimonial`}
                            >
                                <div className="acard-top">
                                    <div className="alumni-avatar" style={{ background: a.color }}>{initials}</div>
                                    <div className="alumni-meta">
                                        <div className="aname">{a.n}</div>
                                        <div className="arole">{a.role}</div>
                                        <div className="apkg">{a.pkg}</div>
                                    </div>
                                    <div className="alumni-logo-wrap">
                                        <img
                                            className="alumni-logo"
                                            src={`https://logo.clearbit.com/${a.domain}`}
                                            alt={a.co}
                                            onError={(e) => {
                                                if (!e.target.dataset.tried1) {
                                                    e.target.dataset.tried1 = 'true';
                                                    e.target.src = `https://icon.horse/icon/${a.domain}`;
                                                } else {
                                                    e.target.style.display = 'none';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="acard-quote">"{a.quote}"</div>
                                <div className="acard-bottom">
                                    <div className="acard-city">📍 {a.city}</div>
                                    <div className="acard-link">View story →</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="companies-strip">
                <div className="companies-label">Top companies hiring NavGurukul graduates:</div>
                <div className="companies-track-wrap">
                    <div className="companies-track" id="companiesTrack">
                        {activeSlots.map((coIdx, slotIdx) => {
                            const c = companyPool[coIdx];
                            return (
                                <div
                                    key={slotIdx}
                                    className={`company-slot ${animatingSlot === slotIdx ? 'entering' : ''}`}
                                    id={`cslot-${slotIdx}`}
                                >
                                    {c && c.logo && (
                                        <div className="cslot-logo-wrap">
                                            <img src={c.logo} alt={c.co} />
                                        </div>
                                    )}
                                    <span className="cslot-name">{c ? c.co : ''}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
