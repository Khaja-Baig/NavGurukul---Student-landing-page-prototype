import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SlotBookingModal = () => {
    const { isSlotBookingModalOpen, closeSlotBookingModal, confirmSlotBooking, userProfile, studentName } = useApp();

    // Default to tomorrow in YYYY-MM-DD format
    const getTomorrowStr = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    };

    const [dateInputVal, setDateInputVal] = useState(getTomorrowStr());
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

    // Format human readable date string e.g. "Thursday, August 27, 2026"
    const getFormattedDateLabel = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00:00');
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Short date for storage e.g. "08/27/2026"
    const getShortDateStr = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00:00');
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    const handleConfirm = () => {
        if (!selectedTime) return;
        const shortDate = getShortDateStr(dateInputVal);
        confirmSlotBooking(shortDate, selectedTime);
    };

    return (
        <div className="slot-modal-overlay open" id="slotBookingModal" onClick={closeSlotBookingModal}>
            <div className="sb-content-card" onClick={(e) => e.stopPropagation()}>
                {/* Header Banner */}
                <div className="sb-header">
                    <button
                        type="button"
                        className="sb-close-btn"
                        onClick={closeSlotBookingModal}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                    <h2 className="sb-title">Book Interview Slot <span className="sb-title-sub">(Learning Round)</span></h2>
                    <div className="sb-user-info">
                        <span>👤 {displayName}</span>
                        <span className="sb-dot">•</span>
                        <span>✉️ {displayEmail}</span>
                    </div>
                </div>

                {/* Body Content */}
                <div className="sb-body">
                    {/* Section 1: Select Date */}
                    <div className="sb-section">
                        <label className="sb-label">
                            <span className="sb-label-icon">📅</span> Select Date
                        </label>
                        <div className="sb-date-picker-row">
                            <div className="sb-date-input-wrap">
                                <input
                                    type="date"
                                    className="sb-date-input"
                                    value={dateInputVal}
                                    onChange={(e) => setDateInputVal(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="sb-selected-date-preview">
                                <span className="preview-lbl">Selected Date:</span>
                                <span className="preview-val">{getFormattedDateLabel(dateInputVal)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Available Time Slots */}
                    <div className="sb-section">
                        <label className="sb-label">
                            <span className="sb-label-icon">⏰</span> Available Time Slots
                        </label>
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

                    {/* Footer Submit Button */}
                    <div className="sb-footer">
                        <button
                            type="button"
                            className={`sb-confirm-btn ${!selectedTime ? 'disabled' : ''}`}
                            onClick={handleConfirm}
                            disabled={!selectedTime}
                        >
                            <span>{selectedTime ? 'Book Interview Slot 🎯' : 'Select a Time Slot'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


