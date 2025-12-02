'use client';

import React, { useState } from 'react';

const AddEmployeePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    officialEmail: '',
    empCode: '',
    department: '',
    designation: '',
    salary: '',
    joiningDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Prepare data for API
      const employeeData = {
        fullName: formData.fullName,
        officialEmail: formData.officialEmail,
        empCode: formData.empCode,
        department: formData.department,
        designation: formData.designation,
        salary: parseFloat(formData.salary),
        joiningDate: new Date(formData.joiningDate).toISOString(),
      };



//   "id": 1,
//   "empCode": "EMP101",
//   "fullName": "Amit  Singh",
//   "officialEmail": "amit.singh@company.com",
//   "department": "Engineering",
//   "designation": "Software Engineer",
//   "salary": 650000,
//   "joiningDate": "2026-11-15T09:30:00Z",
//   "isActive": true,
//   "createdAt": "2024-11-01T10:00:00Z",
//   "updatedAt": "2024-11-20T14:15:00Z"
}








      const response = await fetch('http://localhost:3000/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add employee');
      }

      const result = await response.json();
      console.log('Employee added successfully:', result);
      
      // Show success message
      setSubmitMessage({ type: 'success', text: 'Employee added successfully!' });
      
      // Reset form
      setFormData({
        fullName: '',
        officialEmail: '',
        empCode: '',
        department: '',
        designation: '',
        salary: '',
        joiningDate: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to add employee. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Add New Employee</h1>
        <p className="text-slate-600 mt-2">Fill in the details to add a new employee to the system</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        {/* Success/Error Message */}
        {submitMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            submitMessage.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              {submitMessage.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="font-medium">{submitMessage.text}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="officialEmail" className="block text-sm font-medium text-slate-700 mb-2">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  id="officialEmail"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john.doe@company.com"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="empCode" className="block text-sm font-medium text-slate-700 mb-2">
                  Employee Code *
                </label>
                <input
                  type="text"
                  id="empCode"
                  name="empCode"
                  value={formData.empCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="EMP001"
                />
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="pt-6 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Employment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-2">
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-slate-700 mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-2">
                  Salary *
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="50000"
                />
              </div>
              <div>
                <label htmlFor="joiningDate" className="block text-sm font-medium text-slate-700 mb-2">
                  Joining Date *
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
              }`}
            >
              {isSubmitting && (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? 'Adding...' : 'Add Employee'}
            </button>
            <button
              type="button"
              onClick={() => setFormData({
                fullName: '',
                officialEmail: '',
                empCode: '',
                department: '',
                designation: '',
                salary: '',
                joiningDate: '',
              })}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
