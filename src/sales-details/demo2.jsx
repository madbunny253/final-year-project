import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import axios from 'axios'; // You can use axios to send data to Google Sheets

function CreateBill() {
  const [bills, setBills] = useState([]);
  const [formData, setFormData] = useState({
    productType: '',
    name: '',
    brand: '',
    quantity: '',
    price: '',
    paymentMode: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBills([...bills, formData]); // Add the new bill to the list
    setFormData({
      productType: '',
      name: '',
      brand: '',
      quantity: '',
      price: '',
      paymentMode: '',
      notes: ''
    });
  };

  const handleCheckout = () => {
    // Send the bills to your Google Sheets
    axios.post('YOUR_GOOGLE_SHEETS_API_ENDPOINT', bills)
      .then(response => {
        alert('Bill data stored successfully!');
      })
      .catch(error => {
        console.error('There was an error saving the data!', error);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-50 p-10">
      {/* Left Section: Form */}
      <div className="lg:w-1/2 p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-[#f56551]">Sales Details</h2>
        <p className="text-lg text-gray-600 mb-6">
          Provide basic details to generate a customized bill.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Product Type
            </label>
            <input
              type="text"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Cooking Oil"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Olive Oil"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., XYZ Brand"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Quantity (in units)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 5"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Price (in rupees)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 200"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Payment Mode
            </label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>
                -- Select Payment Mode --
              </option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Additional Notes (optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Any special details or observations"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Bill
          </Button>
        </form>
      </div>

      {/* Right Section: Bill Display */}
      <div className="lg:w-1/2 p-8 bg-white mt-10 lg:mt-0 lg:ml-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Bills</h2>
        <div className="space-y-4 overflow-y-auto max-h-[60vh]">
          {bills.length === 0 ? (
            <p className="text-gray-500">No bills added yet.</p>
          ) : (
            bills.map((bill, index) => (
              <div key={index} className="border border-gray-300 rounded-md p-4 shadow-sm">
                <p><strong>Product Type:</strong> {bill.productType}</p>
                <p><strong>Product Name:</strong> {bill.name}</p>
                <p><strong>Brand:</strong> {bill.brand}</p>
                <p><strong>Quantity:</strong> {bill.quantity}</p>
                <p><strong>Price:</strong> ₹{bill.price}</p>
                <p><strong>Payment Mode:</strong> {bill.paymentMode}</p>
                {bill.notes && <p><strong>Notes:</strong> {bill.notes}</p>}
              </div>
            ))
          )}
        </div>

        {bills.length > 0 && (
          <Button
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-md font-semibold shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Checkout
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateBill;
