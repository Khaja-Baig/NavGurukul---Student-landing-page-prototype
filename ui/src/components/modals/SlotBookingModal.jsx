import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SlotBookingModal = () => {
    const { isSlotBookingModalOpen, closeSlotBookingModal, confirmSlotBooking } = useApp();
    const [selectedDate, setSelectedDate] = useState('Tomorrow, Oct 25');
    const [selectedTime, setSelectedTime] = useState('05:00 PM - 06:00 PM');

    if (!isSlotBookingModalOpen) return null;

    const dates = [
        'Today, Oct 24',
        'Tomorrow, Oct 25',
        'Friday, Oct 26',
        'Saturday, Oct 27'
    ];

    const times = [
        '10:00 AM - 11:00 AM',
        '02:00 PM - 03:00 PM',
        '05:00 PM - 06:00 PM',
        '07:00 PM - 08:00 PM'
    ];

    const handleConfirm = () => {
        confirmSlotBooking(selectedDate, selectedTime);
    };

    return (
        <div className="slot-modal-overlay open" id="slotBookingModal">
            <div className="sb-content-card">
                <button
                    type="button"
                    className="sb-close-btn"
                    onClick={closeSlotBookingModal}
                    aria-label="Close modal"
                >
                    ×
                </button>

                <div className="sb-header">
                    <span className="sb-tag">📅 LEARNING ROUND INTERVIEW</span>
                    <h2 className="sb-title">Book Your 1-on-1 Interview Slot</h2>
                    <p className="sb-sub">Select your preferred date and time for the practical evaluation call with a NavGurukul mentor.</p>
                </div>

                <div className="sb-body">
                    <div className="sb-section">
                        <label className="sb-label">1. Choose Date</label>
                        <div className="sb-chips-grid">
                            {dates.map((d, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`sb-chip ${selectedDate === d ? 'active' : ''}`}
                                    onClick={() => setSelectedDate(d)}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sb-section">
                        <label className="sb-label">2. Choose Time Slot</label>
                        <div className="sb-chips-grid">
                            {times.map((t, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`sb-chip ${selectedTime === t ? 'active' : ''}`}
                                    onClick={() => setSelectedTime(t)}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sb-note-box">
                        <span className="sb-note-icon">💡</span>
                        <span>Interview link & WhatsApp reminder will be sent 30 minutes before your selected slot.</span>
                    </div>

                    <div className="sb-footer">
                        <button
                            type="button"
                            className="sb-confirm-btn"
                            onClick={handleConfirm}
                        >
                            <span>Confirm & Book Slot 🎯</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
