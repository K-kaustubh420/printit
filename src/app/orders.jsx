'use client';
import React, { useState } from "react";

const Order = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [printType, setPrintType] = useState("");
  const [files, setFiles] = useState(null);
  const [additionalComments, setAdditionalComments] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [status, setStatus] = useState("idle");  // To track form submission status
  const [message, setMessage] = useState("");  // To store response messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files || !printType || (deliveryMethod === "delivery" && !deliveryAddress) || (deliveryMethod === "pickup" && !selectedShop)) {
      setMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("file", file));
    formData.append("printType", printType);
    formData.append("deliveryMethod", deliveryMethod);
    formData.append("additionalComments", additionalComments);
    formData.append("deliveryAddress", deliveryAddress);
    formData.append("selectedShop", selectedShop);

    try {
      const response = await fetch("/api/place-order", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Order placed successfully!");
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred while placing the order.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to place the order.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex justify-center items-center p-4 md:p-8">
      <div className="card w-full max-w-3xl bg-base-200 shadow-lg rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-primary">Place an Order</h1>
          <p className="text-sm flex justify-center items-center gap-1 text-gray-500">
            Print made simple with <span className="text-orange-500 font-bold">Print It!</span>
          </p>
        </div>

        {/* File Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Upload Files</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <p className="text-sm mt-1 text-gray-400">Supported formats: PDF, DOCX, JPG</p>
        </div>

        {/* Choose Print Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Choose Print Type</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={printType}
            onChange={(e) => setPrintType(e.target.value)}
          >
            <option disabled selected>
              Select your print type
            </option>
            <option value="color">Color</option>
            <option value="black_white">Black & White</option>
          </select>
        </div>

        {/* Additional Comments */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Additional Instructions</span>
          </label>
          <textarea
            placeholder="Add any specific details (e.g., page range)..."
            className="textarea textarea-bordered w-full"
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
          />
        </div>

        {/* Delivery or Pickup */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Delivery Method</span>
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              className={`btn w-full md:w-auto ${deliveryMethod === "delivery" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setDeliveryMethod("delivery")}
            >
              <span className="material-icons mr-2">local_shipping</span>
              Delivery
            </button>
            <button
              className={`btn w-full md:w-auto ${deliveryMethod === "pickup" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setDeliveryMethod("pickup")}
            >
              <span className="material-icons mr-2">store</span>
              Pickup
            </button>
          </div>
        </div>

        {/* Conditional Fields */}
        {deliveryMethod === "delivery" && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Delivery Address</span>
            </label>
            <input
              type="text"
              placeholder="Enter delivery location..."
              className="input input-bordered w-full"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>
        )}
        {deliveryMethod === "pickup" && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Choose a Shop</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedShop}
              onChange={(e) => setSelectedShop(e.target.value)}
            >
              <option disabled selected>
                Select a shop
              </option>
              <option value="Shop 1 - Downtown">Shop 1 - Downtown</option>
              <option value="Shop 2 - Mall Road">Shop 2 - Mall Road</option>
              <option value="Shop 3 - City Center">Shop 3 - City Center</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <div className="form-control">
          <button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`text-center mt-4 ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
