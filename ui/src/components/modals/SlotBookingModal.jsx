import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SlotBookingModal = () => {
    const { isSlotBookingModalOpen, closeSlotBookingModal, confirmSlotBooking, userProfile, studentName } = useApp();

    // Helper to generate dynamic upcoming dates (e.g. next 4 days)
    const generateUpcomingDates = () => {
        const result = [];
        const today = new Date();
        for (let i = 1; i <= 4; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const dateStr = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
            const dayName = i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
            result.push({ full: dateStr, label: `${dayName}, ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` });
        }
        return result;
    };

    const datesList = generateUpcomingDates();
    const [selectedDateObj, setSelectedDateObj] = useState(datesList[0]);
    const [selectedTime, setSelectedTime] = useState('05:00 PM - 06:00 PM');

    if (!isSlotBookingModalOpen) return null;

    const times = [
        '10:00 AM - 11:00 AM',
        '02:00 PM - 03:00 PM',
        '05:00 PM - 06:00 PM'
    ];

    const displayName = (userProfile?.firstName || userProfile?.lastName)
        ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
        : (studentName && studentName !== 'Friend' ? studentName : 'Sujit Kumar');
    const displayEmail = userProfile?.email || 'sujitkumar19013@gmail.com';

    const handleConfirm = () => {
        confirmSlotBooking(selectedDateObj.full, selectedTime);
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
                    <h2 className="sb-title">Book Interview Slot (Learning Round)</h2>
                    <p className="sb-sub">👤 {displayName} • {displayEmail}</p>
                </div>

                <div className="sb-body">
                    <div className="sb-section">
                        <label className="sb-label">📅 Select Date</label>
                        <div className="sb-chips-grid">
                            {datesList.map((dObj, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`sb-chip ${selectedDateObj.full === dObj.full ? 'active' : ''}`}
                                    onClick={() => setSelectedDateObj(dObj)}
                                >
                                    {dObj.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sb-section">
                        <label className="sb-label">⏰ Choose Time Slot</label>
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
                        <span>Interview link & WhatsApp reminder will be sent to <strong>{displayEmail}</strong> 30 minutes before your slot.</span>
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

