import React, { useState } from 'react';

const UploadCard = () => {
    const [mainImage, setMainImage] = useState(null);
    const [customBG, setCustomBG] = useState(null);
    const [isPremium, setIsPremium] = useState(false);

    // Image Upload Handlers
    const handleMainImage = (e) => {
        if (e.target.files[0]) {
            setMainImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleBGUpload = (e) => {
        if (e.target.files[0]) {
            setCustomBG(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Download Logic with Quality Control
    const downloadImage = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = mainImage;

        img.onload = () => {
            // Premium user gets 4K (3840px width), Free user gets standard width
            const scaleFactor = isPremium ? 3840 / img.width : 1;
            canvas.width = img.width * scaleFactor;
            canvas.height = img.height * scaleFactor;

            if (customBG) {
                const bg = new Image();
                bg.src = customBG;
                bg.onload = () => {
                    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    applyWatermark(ctx, canvas);
                    executeDownload(canvas);
                };
            } else {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                applyWatermark(ctx, canvas);
                executeDownload(canvas);
            }
        };
    };

    const applyWatermark = (ctx, canvas) => {
        if (!isPremium) {
            ctx.font = `${canvas.width / 30}px Arial`;
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
            ctx.fillText("Snaperase - Free Version", canvas.width * 0.6, canvas.height - 40);
        }
    };

    const executeDownload = (canvas) => {
        const link = document.createElement("a");
        link.download = isPremium ? "snaperase-4K.png" : "snaperase-standard.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '50px' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#222', color: '#fff', padding: '20px', textAlign: 'center' }}>
                <h1>Snaperase AI Photo Editor</h1>
                <p>Background Remover & 4K Image Upscaler</p>
            </header>

            {/* Editor Section */}
            <div style={{ maxWidth: '800px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <label style={{ fontWeight: 'bold', display: 'block' }}>1. Upload Photo</label>
                        <input type="file" onChange={handleMainImage} accept="image/*" />
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold', display: 'block' }}>2. Add Background</label>
                        <input type="file" onChange={handleBGUpload} accept="image/*" />
                    </div>
                </div>

                <div id="preview-area" style={{ 
                    position: 'relative', width: '100%', height: '400px', backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden',
                    backgroundImage: `url(${customBG})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '2px dashed #ccc'
                }}>
                    {mainImage ? (
                        <img src={mainImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <p style={{ marginTop: '180px', color: '#888' }}>Photo Preview Area</p>
                    )}
                    {!isPremium && mainImage && (
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '5px 12px', fontSize: '12px', borderRadius: '4px' }}>
                            Snaperase - Free
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button onClick={downloadImage} style={{ padding: '15px 30px', backgroundColor: '#e91e63', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Download {isPremium ? "4K Ultra HD" : "Standard Quality"}
                    </button>
                </div>
            </div>

            {/* Pricing Table Section */}
            <div style={{ marginTop: '60px' }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Upgrade Your Experience</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
                    
                    {/* Free Plan */}
                    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '25px', width: '260px', backgroundColor: '#fff' }}>
                        <h3>Free User</h3>
                        <ul style={{ textAlign: 'left', fontSize: '14px', lineHeight: '2' }}>
                            <li>✅ BG Removal</li>
                            <li>❌ Watermark</li>
                            <li>❌ Standard Quality</li>
                            <li>❌ Ads Included</li>
                        </ul>
                    </div>

                    {/* Premium Plan */}
                    <div style={{ border: '2px solid #007bff', borderRadius: '10px', padding: '25px', width: '260px', backgroundColor: '#fff', boxShadow: '0 5px 15px rgba(0,123,255,0.2)' }}>
                        <h3 style={{ color: '#007bff' }}>Pro Plan (4K)</h3>
                        <ul style={{ textAlign: 'left', fontSize: '14px', lineHeight: '2' }}>
                            <li>✅ Everything in Free</li>
                            <li>✅ **No Watermark**</li>
                            <li>✅ **4K Ultra Quality**</li>
                            <li>✅ **AI Photo Enhancer**</li>
                        </ul>
                        <button onClick={() => setIsPremium(true)} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Go Pro
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UploadCard;
