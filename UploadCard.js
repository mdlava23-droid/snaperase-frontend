import React, { useState } from 'react';

const UploadCard = () => {
    const [mainImage, setMainImage] = useState(null);
    const [customBG, setCustomBG] = useState(null);
    const [isPremium, setIsPremium] = useState(false);

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

    const downloadImage = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = mainImage;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (customBG) {
                const bg = new Image();
                bg.src = customBG;
                bg.onload = () => {
                    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    if (!isPremium) {
                        ctx.font = "30px Arial";
                        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                        ctx.fillText("Snaperase - Free", canvas.width - 250, canvas.height - 50);
                    }
                    const link = document.createElement("a");
                    link.download = "snaperase-edit.png";
                    link.href = canvas.toDataURL();
                    link.click();
                };
            } else {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                if (!isPremium) {
                    ctx.font = "30px Arial";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                    ctx.fillText("Snaperase - Free", canvas.width - 250, canvas.height - 50);
                }
                const link = document.createElement("a");
                link.download = "snaperase-edit.png";
                link.href = canvas.toDataURL();
                link.click();
            }
        };
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
            <h1 style={{ color: '#333' }}>Snaperase AI Editor</h1>
            
            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <label style={{ fontWeight: 'bold' }}>Step 1: Upload Photo</label>
                <input type="file" onChange={handleMainImage} accept="image/*" />
                
                <label style={{ fontWeight: 'bold' }}>Step 2: Add Custom Background</label>
                <input type="file" onChange={handleBGUpload} accept="image/*" />
            </div>

            <div id="editor-canvas" style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '600px', 
                height: '450px', 
                margin: '0 auto', 
                border: '5px solid #fff',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                backgroundImage: `url(${customBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                backgroundColor: '#ddd'
            }}>
                {mainImage && (
                    <img src={mainImage} alt="Main" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )}

                {!isPremium && (
                    <div style={{
                        position: 'absolute', bottom: '15px', right: '15px',
                        background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '8px 15px', borderRadius: '5px', fontSize: '14px'
                    }}>
                        Snaperase - Free Version
                    </div>
                )}
            </div>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button onClick={() => setIsPremium(!isPremium)} style={{ padding: '12px 25px', backgroundColor: isPremium ? '#4CAF50' : '#2196F3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isPremium ? "Premium Active" : "Go Premium"}
                </button>
                
                {mainImage && (
                    <button onClick={downloadImage} style={{ padding: '12px 25px', backgroundColor: '#e91e63', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Download 1K Quality
                    </button>
                )}
            </div>
        </div>
    );
};

export default UploadCard;

