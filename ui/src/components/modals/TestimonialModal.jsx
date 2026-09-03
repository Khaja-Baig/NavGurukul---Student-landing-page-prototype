import React from 'react';
import { useApp } from '../../context/AppContext';
import { alumni } from '../screens/Screen2_AlumniSuccess';

export const TestimonialModal = () => {
    const { selectedTestimonialIdx, closeTestimonialModal } = useApp();

    const isOpen = selectedTestimonialIdx !== null && alumni[selectedTestimonialIdx];
    const a = isOpen ? alumni[selectedTestimonialIdx] : alumni[0];
    const initials = a.n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div
            id="testimonialModal"
            className={`tm-overlay ${isOpen ? 'open' : ''}`}
            onClick={(e) => {
                if (e.target === e.currentTarget) closeTestimonialModal();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="tm-card">
                <button className="tm-close" onClick={closeTestimonialModal} aria-label="Close modal">✕</button>

                <div className="tm-header">
                    <div className="tm-avatar" style={{ background: a.color }}>
                        <span className="tm-initials">{initials}</span>
                    </div>

                    <div className="tm-info">
                        <div className="tm-name">{a.n}</div>
                        <div className="tm-role">{a.role}</div>
                        <div className="tm-city">{a.city} • {a.batch}</div>
                    </div>

                    <div className="tm-logo-row">
                        <div className="tm-logo-box">
                            <img
                                className="tm-logo"
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
                        <div className="tm-co-name">{a.co}</div>
                    </div>
                </div>

                <blockquote className="tm-quote">"{a.quote}"</blockquote>

                <div className="tm-footer">
                    <span className="tm-pkg-tag">Secured Offer</span>
                    <span className="tm-pkg">{a.pkg}</span>
                </div>
            </div>
        </div>
    );
};
