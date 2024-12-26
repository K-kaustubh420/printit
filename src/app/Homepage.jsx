'use client';
import { useState } from 'react';

export default function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [shop, setShop] = useState('Shop 1');
  const [printType, setPrintType] = useState('color');
  const [instructions, setInstructions] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  // Map shop to email
  const shopToEmail = {
    'Shop 1': 'kk6682@gmail.com',
    'Shop 2': 'kkaustubh92@gmail.com',
    'Shop 3': 'kkaustubh645@gmail.com',
  };

  // Handle shop change and update the email
  const handleShopChange = (e) => {
    const selectedShop = e.target.value;
    setShop(selectedShop);
    setEmail(shopToEmail[selectedShop] || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !email) {
      setStatus('error');
      setMessage('Please provide both a file and an email address.');
      return;
    }

    setStatus('loading');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    formData.append('shop', shop);
    formData.append('printType', printType);
    formData.append('instructions', instructions);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        throw new Error(data.error || 'An error occurred');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-primary mb-4">PrintIt!</h1>
        <p className="text-center mb-6 text-gray-600">Upload your file, select your shop, and customize your print order.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Choose File</label>
            <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={status === 'loading'}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Shop Selector */}
          <div className="space-y-2">
            <label htmlFor="shop" className="block text-sm font-medium text-gray-700">Select Shop</label>
            <select
              id="shop"
              value={shop}
              onChange={handleShopChange}
              disabled={status === 'loading'}
              className="select select-bordered w-full"
            >
              <option value="Shop 1">Shop 1</option>
              <option value="Shop 2">Shop 2</option>
              <option value="Shop 3">Shop 3</option>
            </select>
          </div>

          {/* Print Type Selector */}
          <div className="space-y-2">
            <label htmlFor="printType" className="block text-sm font-medium text-gray-700">Select Print Type</label>
            <select
              id="printType"
              value={printType}
              onChange={(e) => setPrintType(e.target.value)}
              disabled={status === 'loading'}
              className="select select-bordered w-full"
            >
              <option value="color">Color</option>
              <option value="black_white">Black & White</option>
            </select>
          </div>

          {/* Instructions Text Box */}
          <div className="space-y-2">
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Additional Instructions</label>
            <textarea
              id="instructions"
              placeholder="Enter any special instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              disabled={status === 'loading'}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-2 rounded ${status === 'loading' ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
            >
              {status === 'loading' ? 'Sending...' : 'Upload and Send'}
            </button>
          </div>
        </form>

        {/* Status Message */}
        {message && (
          <p className={`mt-4 text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
