import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  HelpCircle
} from 'lucide-react';
import {
  authenticateUser,
  getRememberedUsername
} from '../data/auth';
import loginHeroImage from '../assets/login-bg.jpg';
import logoImg from '../assets/logo.png';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState(getRememberedUsername());
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(Boolean(getRememberedUsername()));
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Harap isi username dan password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = authenticateUser(username, password, rememberMe);
      setIsLoading(false);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setErrorMsg(result.message);
      }
    }, 450);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-slate-950 font-sans antialiased">
      {/* Background: Agricultural Workers Photo with Blue Silhouette Duotone Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <img
          src={loginHeroImage}
          alt="Latar Belakang Sektor Pertanian"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-125 saturate-50"
        />
        {/* Blue Silhouette Duotone Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/92 via-blue-900/85 to-indigo-950/95 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-blue-600/30 mix-blend-color"></div>
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]"></div>

        {/* Ambient Glows & Dot Texture */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10"></div>

        {/* Scattered twinkle stars */}
        <div className="absolute top-[8%] left-[12%] w-1.5 h-1.5 rounded-full bg-sky-200/80 shadow-[0_0_6px_#7dd3fc]"></div>
        <div className="absolute top-[15%] left-[25%] w-1 h-1 rounded-full bg-white/70"></div>
        <div className="absolute top-[6%] left-[45%] w-1.5 h-1.5 rounded-full bg-sky-100/90 shadow-[0_0_5px_#7dd3fc]"></div>
        <div className="absolute top-[18%] left-[62%] w-1 h-1 rounded-full bg-white/60"></div>
        <div className="absolute top-[9%] right-[18%] w-1.5 h-1.5 rounded-full bg-sky-200/90 shadow-[0_0_6px_#7dd3fc]"></div>
        <div className="absolute top-[22%] right-[8%] w-1 h-1 rounded-full bg-white/70"></div>
        <div className="absolute top-[32%] left-[8%] w-1.5 h-1.5 rounded-full bg-white/60"></div>
        <div className="absolute top-[28%] right-[32%] w-1 h-1 rounded-full bg-sky-200/70"></div>
      </div>

      {/* MAIN LOGIN CARD - Designed matching Reference Image */}
      <div className="relative z-10 w-full max-w-[420px] transition-all duration-300 drop-shadow-2xl">
        {/* Top Section: Frosted Glass Panel */}
        <div className="relative bg-white/10 backdrop-blur-md border-t border-x border-white/20 rounded-t-3xl pt-7 pb-8 px-6 sm:px-8 text-center text-white overflow-hidden shadow-lg">
          {/* Top subtle glare overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none"></div>

          {/* Official Website Logo */}
          <div className="relative flex justify-center mb-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 p-2 backdrop-blur-sm border border-white/20 shadow-lg shadow-blue-900/30">
              <img
                src={logoImg}
                alt="Logo Indikator Pekerjaan Layak"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
          </div>

          {/* Script "Welcome" typography */}
          <div
            className="text-3xl sm:text-4xl text-white font-bold tracking-wide drop-shadow-md select-none mt-1"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Welcome
          </div>

          {/* "to the Website" heading */}
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-sm mt-0.5 select-none">
            to the Website
          </h2>

          {/* Subtitle / Description */}
          <p className="mt-2 text-xs text-blue-100/90 leading-relaxed max-w-xs mx-auto drop-shadow-xs font-normal">
            Dashboard Pemantauan Indikator Pekerjaan Layak Kabupaten Tanjung Jabung Barat
          </p>
        </div>

        {/* Bottom Section: Solid White Form Panel */}
        <div className="bg-white/95 backdrop-blur-md rounded-b-3xl px-6 sm:px-8 pt-7 pb-8 shadow-2xl border-b border-x border-white/40">
          <div className="text-center mb-6">
            <h3 className="text-sm sm:text-base font-bold tracking-widest text-blue-600 uppercase">
              USER LOGIN
            </h3>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Username Input with Circular Icon Badge */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                className="flex-1 h-11 px-5 rounded-full bg-slate-100 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Password Input with Circular Icon Badge */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full h-11 pl-5 pr-11 rounded-full bg-slate-100 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-blue-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Options: Remember & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="font-medium text-slate-600">Remember</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Centered Pill LOGIN Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-12 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-95 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>LOGIN</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL: FORGOT PASSWORD */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>Bantuan Akses Akun</span>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Situs ini dilindungi untuk pengguna resmi instansi BPS Kabupaten Tanjung Jabung Barat. Jika Anda lupa kata sandi atau membutuhkan akses, silakan hubungi tim administrator:
            </p>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
              <div className="font-bold">BPS Kab. Tanjung Jabung Barat</div>
              <div>Email: bps1507@bps.go.id</div>
              <div>Telp: (0742) 21015 / Layanan PST BPS Tanjab Barat</div>
            </div>

            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
