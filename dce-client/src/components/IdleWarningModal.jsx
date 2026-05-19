import { useEffect, useState } from 'react'
import './IdleWarningModal.css'

/**
 * Modal shown 30 seconds before auto-logout due to inactivity.
 *
 * @prop {boolean}  visible       – whether to show the modal
 * @prop {number}   countdown     – seconds remaining until auto-logout
 * @prop {Function} onStay        – called when user clicks "Stay Logged In"
 * @prop {Function} onLogout      – called when user clicks "Log Out Now"
 */
export default function IdleWarningModal({ visible, countdown, onStay, onLogout }) {
  if (!visible) return null

  return (
    <div className="idle-overlay" role="dialog" aria-modal="true" aria-labelledby="idle-title">
      <div className="idle-modal">
        {/* Icon */}
        <div className="idle-icon-wrap">
          <svg className="idle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 id="idle-title" className="idle-title">Still there?</h2>

        <p className="idle-body">
          You've been inactive for a while. For your security, you'll be automatically
          logged out in:
        </p>

        {/* Countdown ring */}
        <div className="idle-countdown-wrap">
          <svg className="idle-ring" viewBox="0 0 64 64">
            <circle className="idle-ring-bg" cx="32" cy="32" r="28" />
            <circle
              className="idle-ring-progress"
              cx="32" cy="32" r="28"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - countdown / 30)}`}
            />
          </svg>
          <span className="idle-countdown-num">{countdown}</span>
        </div>

        <p className="idle-seconds-label">seconds</p>

        {/* Actions */}
        <div className="idle-actions">
          <button id="idle-stay-btn" className="idle-btn idle-btn-primary" onClick={onStay}>
            Stay Logged In
          </button>
          <button id="idle-logout-btn" className="idle-btn idle-btn-secondary" onClick={onLogout}>
            Log Out Now
          </button>
        </div>
      </div>
    </div>
  )
}
