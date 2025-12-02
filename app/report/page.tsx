'use client';

import React, { useState } from 'react';

const ReportPage = () => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleGenerateReport = () => {
    console.log('Generating report:', { reportType, dateRange });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600 mt-2">Generate and view various reports</p>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select type</option>
              <option value="employee">Employee Report</option>
              <option value="address">Address Report</option>
              <option value="department">Department Report</option>
              <option value="salary">Salary Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={handleGenerateReport}
          className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
        >
          Generate Report
        </button>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Reports</h2>
        <div className="space-y-4">
          {[
            { name: 'Employee Report - November 2025', date: '2025-11-30', type: 'Employee' },
            { name: 'Department Analysis Q4', date: '2025-11-25', type: 'Department' },
            { name: 'Salary Report October', date: '2025-10-31', type: 'Salary' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{report.name}</h3>
                  <p className="text-sm text-slate-500">Generated on {report.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View
                </button>
                <button className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
