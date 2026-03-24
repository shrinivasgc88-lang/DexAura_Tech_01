import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, FileText, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const InstantQuote = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [quoteResult, setQuoteResult] = useState(null);
  const [customerId] = useState('guest_' + Date.now());

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one CAD file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('customer_id', customerId);

    try {
      const response = await axios.post(`${API_URL}/api/quotes/instant`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setQuoteResult(response.data);
      toast.success('Quote generated successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to generate quote. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#151515] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-testid="instant-quote-title">
            Instant CAD Quote
          </h1>
          <p className="text-xl text-gray-300">
            Upload your CAD files for instant pricing, lead times, and manufacturability insights
          </p>
        </div>

        {!quoteResult ? (
          <div className="bg-[#1a1a1a] border-2 border-dashed border-[#301B3F] rounded-2xl p-12 text-center" data-testid="upload-zone">
            <Upload className="w-16 h-16 text-[#910A67] mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2">Upload CAD Files</h3>
            <p className="text-gray-400 mb-6">Supports STEP, STL, IGES, and other CAD formats</p>
            
            <input
              type="file"
              multiple
              accept=".step,.stp,.stl,.iges,.igs,.obj,.3mf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              data-testid="file-input"
            />
            <label htmlFor="file-upload" className="inline-block">
              <span
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-8 py-6 rounded-full cursor-pointer font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#720455]/30"
                data-testid="select-files-btn"
              >
                Select Files
              </span>
            </label>

            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-400 mb-3">{files.length} file(s) selected:</p>
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-2 text-white">
                    <FileText className="w-4 h-4 text-[#910A67]" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                ))}
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-6 bg-white text-[#720455] hover:bg-gray-100 px-8 py-6 rounded-full"
                  data-testid="upload-btn"
                >
                  {uploading ? 'Analyzing...' : 'Get Instant Quote'}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6" data-testid="quote-results">
            <div className="bg-gradient-to-r from-[#301B3F] to-[#720455] rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Quote Generated!</h2>
              <p className="text-white/90">Here's your instant manufacturing quote</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
                <DollarSign className="w-10 h-10 text-[#910A67] mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-1">Total Price</p>
                <p className="text-3xl font-bold text-white" data-testid="quote-total-price">
                  ${quoteResult.analysis.total_price.toFixed(2)}
                </p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
                <Clock className="w-10 h-10 text-[#910A67] mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-1">Lead Time</p>
                <p className="text-3xl font-bold text-white" data-testid="quote-lead-time">
                  {quoteResult.analysis.estimated_lead_time} days
                </p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
                <FileText className="w-10 h-10 text-[#910A67] mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-1">Parts Analyzed</p>
                <p className="text-3xl font-bold text-white" data-testid="quote-part-count">
                  {quoteResult.analysis.part_count}
                </p>
              </div>
            </div>

            {quoteResult.analysis.parts.map((part, idx) => (
              <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">{part.part_name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Recommended Process</p>
                    <p className="text-white font-medium">{part.recommended_process}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Recommended Material</p>
                    <p className="text-white font-medium">{part.recommended_material}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Complexity</p>
                    <p className="text-white font-medium capitalize">{part.complexity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Manufacturability Score</p>
                    <p className="text-white font-medium">{part.manufacturability_score}/100</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">DFM Insights:</p>
                  <ul className="space-y-1">
                    {part.dfm_insights.map((insight, iidx) => (
                      <li key={iidx} className="text-sm text-gray-300 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#910A67] mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {part.warnings && part.warnings.length > 0 && (
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    {part.warnings.map((warning, widx) => (
                      <div key={widx} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-yellow-200">{warning}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setFiles([]);
                  setQuoteResult(null);
                }}
                variant="outline"
                className="flex-1 border-[#720455] text-white hover:bg-[#720455]/10 rounded-full py-6"
                data-testid="new-quote-btn"
              >
                New Quote
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                className="flex-1 bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full py-6"
                data-testid="contact-us-btn"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantQuote;
