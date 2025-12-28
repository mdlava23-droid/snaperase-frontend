import React, { useState } from 'react';

const UploadCard = () => {
    const [processedImage, setProcessedImage] = useState(null);
    const [customBG, setCustomBG] = useState(null);
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = "https://snaperase-backend.onrender.com";

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Data = reader.result.split(',')[1];
            try {
                const res = await fetch(`${BACKEND_URL}/remove-bg`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64Data }),
                });
                const data = await res.json();
                if (data.image) {
                    setProcessedImage(`data:image/png;base64,${data.image}`);
                }
            } catch (err) {
                console.error("Connection Error");
            }
            setLoading(false);
        };
    };

    const handleBG = (e) => {
        if (e.target.files[0]) {
            setCustomBG(URL.createObjectURL(e.target.files[0]));
        }
    };

    const downloadImage = () => {
        if (!processedImage) return;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = processedImage;

        img.onload = () => {
            const width = isPremium ? 3840 : img.width;
            const height = (img.height / img.width) * width;
            canvas.width = width;
            canvas.height = height;

            if (customBG) {
                const bg = new Image();
                bg.src = customBG;
                bg.onload = () => {
                    ctx.drawImage(bg, 0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);
                    finishDownload(canvas);
                };
            } else {
                ctx.drawImage(img, 0, 0, width, height);
                finishDownload(canvas);
            }
        };
    };

    const finishDownload = (canvas) => {
        const ctx = canvas.getContext("2d");
        if (!isPremium) {
            ctx.font = `${canvas.width / 25}px Arial`;
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillText("Snaperase - Free", canvas.width * 0.5, canvas.height - 50);
        }
        const link = document.createElement("a");
        link.download = isPremium ? "snaperase-4k.png" : "snaperase-free.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    };

    return (
        <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial', backgroundColor: '#fff', minHeight: '100vh' }}>
            <h1 style={{ color: '#222', marginBottom: '10px' }}>Snaperase AI</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>Remove Background & Upgrade to 4K Quality</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Step 1: Photo</label>
                    <input type="file" onChange={handleUpload} accept="image/*" />
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Step 2: Background</label>
                    <input type="file" onChange={handleBG} accept="image/*" />
                </div>
            </div>

            <div style={{ 
                position: 'relative', width: '100%', maxWidth: '500px', height: '400px', 
                margin: '0 auto', border: '1px solid #ddd', borderRadius: '12px',
                backgroundImage: `url(${customBG})`, backgroundSize: 'cover', backgroundPosition: 'center',
                backgroundColor: '#fdfdfd', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {loading ? <p>AI Processing...</p> : (
                    processedImage ? <img src={processedImage} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Preview" /> : <p>No Image Uploaded</p>
                )}
            </div>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button onClick={downloadImage} style={{ padding: '12px 25px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Download {isPremium ? "4K HD" : "Standard"}
                </button>
                <button onClick={() => setIsPremium(!isPremium)} style={{ padding: '12px 25px', backgroundColor: isPremium ? '#4CAF50' : '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isPremium ? "Pro Active" : "Upgrade to Pro"}
                </button>
            </div>

            <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                <h3>Pricing Plans</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', width: '200px' }}>
                        <h4>Free</h4>
                        <p style={{ fontSize: '12px' }}>Standard Quality<br/>Watermark Included<br/>With Ads</p>
                    </div>
                    <div style={{ padding: '20px', border: '2px solid #007bff', borderRadius: '8px', width: '200px' }}>
                        <h4 style={{ color: '#007bff' }}>Pro</h4>
                        <p style={{ fontSize: '12px' }}>4K Ultra Quality<br/>No Watermark<br/>No Ads</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadCard;
