import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle, XCircle, Scan } from 'lucide-react';

type ScanState = 'idle' | 'scanning' | 'success' | 'error';

const FingerprintScanner: React.FC = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [message, setMessage] = useState('');
  const [pulseClass, setPulseClass] = useState('');

  const simulateFingerprint = () => {
    if (scanState === 'scanning') return;
    
    setScanState('scanning');
    setMessage('Scanning fingerprint...');
    setPulseClass('animate-pulse');

    // Simulate scanning process
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate
      
      if (isSuccess) {
        setScanState('success');
        setMessage('Fingerprint matched successfully!');
      } else {
        setScanState('error');
        setMessage('Fingerprint not recognized. Please try again.');
      }
      
      setPulseClass('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setScanState('idle');
        setMessage('');
      }, 3000);
    }, 2500);
  };

  const getScannerColor = () => {
    switch (scanState) {
      case 'scanning':
        return 'text-cyan-400';
      case 'success':
        return 'text-emerald-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getGlowEffect = () => {
    switch (scanState) {
      case 'scanning':
        return 'drop-shadow-[0_0_35px_rgba(34,211,238,0.6)]';
      case 'success':
        return 'drop-shadow-[0_0_35px_rgba(52,211,153,0.6)]';
      case 'error':
        return 'drop-shadow-[0_0_35px_rgba(248,113,113,0.6)]';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-slate-700/50 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scan className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">SecureScan</h1>
          </div>
          <p className="text-slate-400 text-sm">Biometric Authentication System</p>
        </div>

        {/* Fingerprint Display */}
        <div className="flex flex-col items-center mb-8">
          <div className={`relative ${pulseClass}`}>
            <Fingerprint 
              className={`w-32 h-32 ${getScannerColor()} ${getGlowEffect()} transition-all duration-500`}
            />
            {scanState === 'scanning' && (
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20 animate-ping"></div>
            )}
          </div>
          
          {/* Status Message */}
          <div className="mt-6 h-16 flex items-center justify-center">
            {message && (
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600/50">
                {scanState === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                {scanState === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
                {scanState === 'scanning' && <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>}
                <p className={`text-sm font-medium ${
                  scanState === 'success' ? 'text-emerald-400' :
                  scanState === 'error' ? 'text-red-400' :
                  'text-cyan-400'
                }`}>
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scan Button */}
        <button
          onClick={simulateFingerprint}
          disabled={scanState === 'scanning'}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
            scanState === 'scanning'
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {scanState === 'scanning' ? 'Scanning...' : 'Start Fingerprint Scan'}
        </button>

        {/* Status Indicator */}
        <div className="flex justify-center mt-6">
          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
            scanState === 'idle' ? 'bg-slate-500' :
            scanState === 'scanning' ? 'bg-cyan-400 animate-pulse' :
            scanState === 'success' ? 'bg-emerald-400' :
            'bg-red-400'
          }`}></div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-slate-700/50">
          <p className="text-xs text-slate-500">
            Secure • Encrypted • Biometric Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default FingerprintScanner;