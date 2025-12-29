import React, { useState } from 'react';

const UploadCard = () => {
    const [showPayment, setShowPayment] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('bkash');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [trxID, setTrxID] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(false);

    // Pricing Data
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
        
        // Simulation: If TrxID is "123456", it will fail (unsuccessful attempt)
        // Otherwise, it will succeed (Auto Premium)
        setTimeout(() => {
            if (trxID === "123456") {
                alert("Payment Unsuccessful! We could not verify this Transaction ID. Please try again with correct info.");
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
        <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            
            {/* Main Header */}
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '10px' }}>Snaperase AI</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                    {isPremium ? "🚀 PRO PLAN ACTIVE (4K UNLOCKED)" : "Free Trial: Limited to Standard Quality"}
                </p>
                {!isPremium && (
                    <button 
                        onClick={() => setShowPayment(true)}
                        style={{ backgroundColor: '#f59e0b', color: '#000', padding: '15px 40px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '20px', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' }}>
                        Unlock 4K Premium
                    </button>
                )}
            </div>

            {/* Payment Modal */}
            {showPayment && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, overflowY: 'auto' }}>
                    <div style={{ backgroundColor: '#fff', color: '#1e293b', width: '95%', maxWidth: '500px', borderRadius: '24px', padding: '30px', position: 'relative', margin: '20px' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>Upgrade to Pro</h2>
                        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '25px', fontSize: '14px' }}>Choose a plan to continue your free trial</p>

                        {/* Step 1: Select Plan */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '25px' }}>
                            {plans.map(plan => (
                                <div 
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan)}
                                    style={{ padding: '15px 10px', border: selectedPlan?.id === plan.id ? '2px solid #2563eb' : '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', backgroundColor: selectedPlan?.id === plan.id ? '#eff6ff' : '#fff', transition: '0.3s' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{plan.name}</div>
                                    <div style={{ color: '#2563eb', fontWeight: '800', margin: '5px 0' }}>{plan.price}</div>
                                    <div style={{ fontSize: '10px', color: '#059669', fontWeight: 'bold' }}>{plan.desc}</div>
                                </div>
                            ))}
                        </div>

                        {/* Step 2: Payment Methods */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                            {['bkash', 'nagad', 'visa'].map(method => (
                                <button 
                                    key={method}
                                    onClick={() => setSelectedMethod(method)}
                                    style={{ flex: 1, padding: '10px', border: selectedMethod === method ? '2px solid #1e293b' : '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', cursor: 'pointer' }}>
                                    <img src={
                                        method === 'bkash' ? "https://searchvectorlogo.com/wp-content/uploads/2020/02/bkash-logo-vector.png" :
                                        method === 'nagad' ? "https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" : 
                                        "https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
                                    } alt={method} style={{ height: method === 'nagad' ? '25px' : '18px' }} />
                                </button>
                            ))}
                        </div>

                        {/* Step 3: Payment Details */}
                        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '15px', marginBottom: '20px', border: '1px dashed #cbd5e1' }}>
                            <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                {selectedMethod === 'bkash' && <>Pay to Bkash Merchant: <b style={{ fontSize: '18px', color: '#d12053' }}>01629586874</b></>}
                                {selectedMethod === 'nagad' && <>Send Money to Nagad (Personal): <br/><b style={{ fontSize: '18px', color: '#f59e0b' }}>01629586874</b></>}
                                {selectedMethod === 'visa' && <>Card Number: <br/><b style={{ fontSize: '16px', color: '#1e40af' }}>4037 4000 0079 9339</b></>}
                            </p>
                            <p style={{ fontSize: '12px', marginTop: '10px', color: '#94a3b8' }}>* Use your email as reference during payment.</p>
                        </div>

                        {/* Step 4: Transaction Input */}
                        <input 
                            type="text" 
                            placeholder="Enter Transaction ID (TrxID)"
                            value={trxID}
                            onChange={(e) => setTrxID(e.target.value)}
                            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '20px', boxSizing: 'border-box', fontSize: '16px' }}
                        />

                        <button 
                            onClick={handlePaymentSubmit}
                            disabled={loading}
                            style={{ width: '100%', backgroundColor: '#1e293b', color: '#fff', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}>
                            {loading ? "Verifying..." : "Confirm & Activate Pro"}
                        </button>

                        <p onClick={() => setShowPayment(false)} style={{ textAlign: 'center', marginTop: '20px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Maybe Later</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadCard;
