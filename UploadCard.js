import React, { useState } from 'react';
import Footer from './Footer'; // Footer লিঙ্ক করা হয়েছে

const UploadCard = () => {
    const [showPayment, setShowPayment] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('bkash');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [trxID, setTrxID] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(false);

    // তোমার দেওয়া নতুন প্রাইসিং প্ল্যান
    const plans = [
        { id: '1m', name: '1 Month', price: '59 TK', desc: 'Standard Pro' },
        { id: '6m', name: '6 Months', price: '354 TK', desc: '1 Month FREE' },
        { id: '1y', name: '1 Year', price: '590 TK', desc: '2 Months FREE' }
    ];

    const handlePaymentSubmit = () => {
        if (!selectedPlan) {
            alert("Please select a plan first!");
            return;
        }
        if (trxID.length < 6) {
            alert("Invalid Transaction ID. Please check your SMS and try again.");
            return;
        }

        setLoading(true);
        
        // Simulation: পেমেন্ট সাকসেস লজিক
        setTimeout(() => {
            if (trxID === "123456") {
                alert("Payment Unsuccessful! We could not verify this Transaction ID.");
                setTrxID('');
            } else {
                alert(`Payment Successful for ${selectedPlan.name}! You are now a PRO user.`);
                setIsPremium(true);
                setShowPayment(false);
            }
            setLoading(false);
        }, 2000);
    };

    return (
        <div style={{ backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh' }}>
            
            {/* Header & Main Tool Section */}
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px' }}>Snaperase AI</h1>
                <p style={{ color: '#94a3b8' }}>
                    {isPremium ? "🚀 PRO PLAN ACTIVE (4K UNLOCKED)" : "Free Trial: Limited Quality"}
                </p>
                {!isPremium && (
                    <button 
                        onClick={() => setShowPayment(true)}
                        style={{ backgroundColor: '#f59e0b', color: '#000', padding: '15px 40px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
                        Unlock 4K Premium
                    </button>
                )}
            </div>

            {/* Payment Modal */}
            {showPayment && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, overflowY: 'auto' }}>
                    <div style={{ backgroundColor: '#fff', color: '#1e293b', width: '90%', maxWidth: '500px', borderRadius: '24px', padding: '30px' }}>
                        <h2 style={{ textAlign: 'center' }}>Upgrade to Pro</h2>
                        
                        {/* Plans */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', margin: '20px 0' }}>
                            {plans.map(plan => (
                                <div key={plan.id} onClick={() => setSelectedPlan(plan)} style={{ padding: '10px', border: selectedPlan?.id === plan.id ? '2px solid #2563eb' : '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', textAlign: 'center' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{plan.name}</div>
                                    <div style={{ color: '#2563eb', fontWeight: '800' }}>{plan.price}</div>
                                    <div style={{ fontSize: '9px', color: '#059669' }}>{plan.desc}</div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Methods */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            {['bkash', 'nagad', 'visa'].map(method => (
                                <button key={method} onClick={() => setSelectedMethod(method)} style={{ flex: 1, padding: '10px', border: selectedMethod === method ? '2px solid #1e293b' : '1px solid #e2e8f0', borderRadius: '12px', background: '#fff' }}>
                                    <span style={{textTransform: 'capitalize'}}>{method}</span>
                                </button>
                            ))}
                        </div>

                        {/* Merchant Info */}
                        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>
                            {selectedMethod === 'bkash' && <>Pay to Bkash Merchant: <b>01629586874</b></>}
                            {selectedMethod === 'nagad' && <>Nagad (Personal): <b>01629586874</b></>}
                            {selectedMethod === 'visa' && <>Card: <b>4037 4000 0079 9339</b></>}
                        </div>

                        <input type="text" placeholder="Transaction ID" value={trxID} onChange={(e) => setTrxID(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '15px', boxSizing: 'border-box' }} />

                        <button onClick={handlePaymentSubmit} disabled={loading} style={{ width: '100%', backgroundColor: '#1e293b', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold' }}>
                            {loading ? "Verifying..." : "Confirm Activation"}
                        </button>
                        <p onClick={() => setShowPayment(false)} style={{ textAlign: 'center', marginTop: '15px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>Close</p>
                    </div>
                </div>
            )}

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default UploadCard;
