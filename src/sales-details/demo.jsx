import React from 'react'
import { useState } from 'react';

function SalesDetails() {
    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        price: '',
        paymentMode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sales Details Submitted:', formData);
        // Here you can process or send the data for further ML processing
    };

    return (
        <div className='sm:px-10 md:-px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your <span className='text-[#f56551]'>sales details</span></h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and AI will generate a customized suggestions based on your sales data</p>

            <div className='mt-10'>
                <form onSubmit={handleSubmit} className="mt-10 space-y-18">
                    <div>
                        <label className="block text-xl font-medium text-gray-700">
                            Product Type
                        </label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="mt-2 mb-6 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., Cooking Oil"
                            required
                        />
                        <label className="block text-xl font-medium text-gray-700">
                            Product rand
                        </label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="mt-2 mb-6 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., Cooking Oil"
                            required
                        />

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                Quantity (in units)
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="mt-2 mb-6 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., 5"
                                required
                            />

                            <div>
                                <label className="block text-lg font-medium text-gray-700">
                                    Price (in rupees)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="mt-2 mb-6 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., 200"
                                    required
                                />

                                <div>
                                    <label className="block text-lg font-medium text-gray-700">
                                        Payment Mode
                                    </label>
                                    <select
                                        name="paymentMode"
                                        value={formData.paymentMode}
                                        onChange={handleChange}
                                        className="mt-2 mb-6 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                                        className="mt-2 mb-6 p-2 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Any special details or observations"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-auto py-2 px-4 bg-customColor text-black font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                    >
                                        Submit Sales Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SalesDetails