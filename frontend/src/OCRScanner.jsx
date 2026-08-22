import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export default function OCRScanner({ onBillExtracted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // Matches the FastAPI file parameter schema

    setLoading(true);
    setError(null);
    setSuccessData(null);

    try {
      // Connects to your local Python OCR microservice on port 8001[cite: 1, 5]
      const response = await fetch('http://localhost:8001/api/v1/ocr/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`OCR processing failed with status ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      setSuccessData(result);

      // Pass the structured bill data back to SmartDukaan main app/POS state
      if (onBillExtracted) {
        onBillExtracted(result);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to extract data using OCR service.');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '16px', borderRadius: '10px', color: '#fff', margin: '15px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <FileText size={18} color="#6366f1" />
        <h4 style={{ margin: 0 }}>Smart Bill & Invoice OCR Scanner</h4>
      </div>
      <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
        Upload a bill image or PDF to parse details via your local Tesseract OCR pipeline.
      </p>

      <label style={{ background: '#6366f1', color: '#fff', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600' }}>
        <Upload size={14} />
        {loading ? 'Processing OCR Engine...' : 'Upload Document'}
        <input type="file" accept=".pdf,.png,.jpg,.jpeg,.tiff,.bmp" onChange={handleFileUpload} style={{ display: 'none' }} />
      </label>

      {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>{error}</p>}

      {successData && (
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={14} />
          Extracted Bill No: {successData.consumer_number || 'Success'} (Confidence: {Math.round((successData.confidence_score || 0) * 100)}%)
        </div>
      )}
    </div>
  );
}