import { useState } from 'react'
import Reveal from './Reveal'

const CONTACT_EMAIL = 'adityagiri4417@gmail.com'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (String(data.get('_honey') || '').trim()) return

    setStatus('sending')
    setError('')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          discipline: data.get('discipline'),
          message: data.get('brief'),
          _subject: `Portfolio inquiry from ${data.get('name')}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: data.get('email'),
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.success === false || result.success === 'false') {
        const message = result.message || 'The inquiry could not be sent. Please try again.'
        if (/activation/i.test(message)) {
          throw new Error(
            `Almost ready. Open ${CONTACT_EMAIL}, find the FormSubmit email, and click Activate Form once. After that, inquiries will arrive in that inbox.`,
          )
        }
        throw new Error(message)
      }
      setStatus('sent')
      form.reset()
      window.setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'The inquiry could not be sent. Please try again.')
    }
  }

  return (
    <section className="py-24 relative bg-gradient-to-b from-[#060a14] to-[#030408] border-t border-white/5 overflow-x-clip" id="contact">
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#67e8f9] pointer-events-none z-20" />
      <div className="absolute -top-28 right-1/3 w-[min(600px,80%)] h-48 bg-gradient-to-tr from-cyan-400/20 via-brand-royal/25 to-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="glass-panel rounded-3xl p-8 md:p-14 relative overflow-hidden border border-white/20 hover:border-blue-400/40 transition-all duration-500">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-royal/30 rounded-full blur-[90px] pointer-events-none" />
            <div className="text-center max-w-lg mx-auto mb-10">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400">@caritas.heart</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-300 mt-2">
                Let’s Frame Something Unforgettable
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Inquire regarding portrait sessions, commercial directing, or creative collaborations.
              </p>
            </div>

            <form className="space-y-5 relative" onSubmit={onSubmit}>
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">Your Name</label>
                  <input
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600 hover:border-white/30"
                    placeholder="Jane Doe"
                    required
                    type="text"
                    name="name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">Email Address</label>
                  <input
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600 hover:border-white/30"
                    placeholder="jane@example.com"
                    required
                    type="email"
                    name="email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">Project Discipline</label>
                <select
                  className="w-full bg-[#070b16] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all hover:border-white/30"
                  name="discipline"
                  defaultValue="Portraiture Session"
                >
                  <option>Portraiture Session</option>
                  <option>Commercial / Brand Campaign</option>
                  <option>Cinematic Film / Music Video</option>
                  <option>Documentary / Travel</option>
                  <option>Fine Art Print Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">Project Vision & Brief</label>
                <textarea
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600 hover:border-white/30"
                  placeholder="Tell me about the mood, scope, locations, and expectations..."
                  required
                  rows="4"
                  name="brief"
                />
              </div>
              <button
                className={`btn-shimmer relative w-full py-4 rounded-xl bg-gradient-to-r from-brand-royal via-blue-500 to-cyan-400 hover:from-blue-600 hover:via-brand-royal hover:to-cyan-300 active:scale-[0.99] text-white font-semibold text-sm tracking-wider uppercase shadow-glow hover:shadow-neon-blue transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                  status === 'sent' ? 'from-emerald-600 via-emerald-600 to-emerald-500' : ''
                }`}
                type="submit"
                disabled={status === 'sending'}
              >
                <span>
                  {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Inquiry Sent!' : status === 'error' ? 'Try Again' : 'Send Inquiry'}
                </span>
                {status === 'sending' ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
                  </svg>
                ) : null}
                {status === 'sent' ? (
                  <svg className="w-5 h-5 text-emerald-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : null}
              </button>
              {status === 'error' && error ? (
                <p className="text-sm text-rose-300 text-center leading-relaxed">{error}</p>
              ) : null}
              {status === 'sent' ? (
                <p className="text-sm text-emerald-300 text-center">Your inquiry is on its way. I’ll reply by email.</p>
              ) : null}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
