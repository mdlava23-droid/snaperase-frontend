import React, { useState } from 'react';
import Footer from './Footer';

const UploadCard = () => {
    const [showPayment, setShowPayment] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('bkash');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [trxID, setTrxID] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(false);

    const plans = [
        { id: '1m', name: '1 Month', price: '59 TK', desc: 'Standard Pro' },
        { id: '6m', name: '6 Months', price: '354 TK', desc: '1 Month FREE' },
        { id: '1y', name: '1 Year', price: '590 TK', desc: '2 Months FREE' }
    ];

    const handlePaymentSubmit = () => {
        if (!selectedPlan) {
            alert("Please select a subscription plan.");
            return;
        }
        if (trxID.length < 6) {
            alert("Invalid Transaction ID. Please check your payment SMS.");
            return;
        }

        setLoading(true);
        
        // Payment Verification Simulation
        setTimeout(() => {
            if (trxID === "123456") {
                alert("Payment Verification Failed. Please contact support.");
                setTrxID('');
            } else {
                alert(`Success! ${selectedPlan.name} activated. 4K AI Features Unlocked.`);
                setIsPremium(true);
                setShowPayment(false);
            }
            setLoading(false);
        }, 2000);
    };

    return (
        <div style={{ backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            
            {/* Hero Section */}
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '15px', letterSpacing: '-1px' }}>Snaperase AI</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    {isPremium ? "🚀 PREMIUM ACCOUNT ACTIVE" : "Professional 4K Background Removal & AI Image Enhancement"}
                </p>
                {!isPremium && (
                    <button 
                        onClick={() => setShowPayment(true)}
                        style={{ backgroundColor: '#f59e0b', color: '#000', padding: '16px 45px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px', fontSize: '1.1rem', boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.3)' }}>
                        Upgrade to 4K Premium
                    </button>
                )}
            </div>

            {/* Main Application Area Placeholder */}
            <div style={{ maxWidth: '1000px', margin: '0 auto 100px', padding: '40px', textAlign: 'center', background: 'rgba(30, 41, 59, 0.5)', border: '2px dashed #334155', borderRadius: '30px' }}>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Drop your images here to start processing</p>
            </div>

            {/* Payment Modal */}
            {showPayment && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', backdropFilter: 'blur(10px)' }}>
                    <div style={{ backgroundColor: '#ffffff', color: '#1e293b', width: '100%', maxWidth: '480px', borderRadius: '28px', padding: '35px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '25px' }}>Subscription Plans</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '25px' }}>
                            {plans.map(plan => (
                                <div key={plan.id} onClick={() => setSelectedPlan(plan)} style={{ padding: '15px 5px', border: selectedPlan?.id === plan.id ? '2.5px solid #2563eb' : '1px solid #e2e8f0', borderRadius: '18px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease', background: selectedPlan?.id === plan.id ? '#f0f7ff' : '#fff' }}>
                                    <div style={{ fontWeight: '700', fontSize: '12px', color: '#64748b' }}>{plan.name}</div>
                                    <div style={{ color: '#1e293b', fontWeight: '900', fontSize: '1.2rem', margin: '5px 0' }}>{plan.price}</div>
                                    <div style={{ fontSize: '10px', color: '#059669', fontWeight: '600' }}>{plan.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            {['bkash', 'nagad', 'visa'].map(method => (
                                <button key={method} onClick={() => setSelectedMethod(method)} style={{ flex: 1, padding: '12px', border: selectedMethod === method ? '2px solid #1e293b' : '1px solid #e2e8f0', borderRadius: '14px', background: selectedMethod === method ? '#f8fafc' : '#fff', cursor: 'pointer', fontWeight: '700', textTransform: 'uppercase', fontSize: '12px' }}>
                                    {method}
                                </button>
                            ))}
                        </div>

                        <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '16px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                            {selectedMethod === 'bkash' && <p>Send Money to: <b>01629586874</b></p>}
                            {selectedMethod === 'nagad' && <p>Send Money to: <b>01629586874</b></p>}
                            {selectedMethod === 'visa' && <p>Card Number: <b>4037 4000 0079 9339</b></p>}
                        </div>

                        <input 
                            type="text" 
                            placeholder="Transaction ID" 
                            value={trxID} 
                            onChange={(e) => setTrxID(e.target.value)} 
                            style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '20px', fontSize: '16px', outline: 'none' }} 
                        />

                        <button 
                            onClick={handlePaymentSubmit} 
                            disabled={loading} 
                            style={{ width: '100%', backgroundColor: '#1e293b', color: '#fff', padding: '18px', borderRadius: '14px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', border: 'none' }}>
                            {loading ? "Verifying..." : "Confirm Payment"}
                        </button>

                        <button 
                            onClick={() => setShowPayment(false)} 
                            style={{ width: '100%', background: 'none', border: 'none', color: '#94a3b8', marginTop: '15px', cursor: 'pointer' }}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default UploadCard
