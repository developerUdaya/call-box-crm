import React, { useState } from 'react';
import { X, Upload, Download, FileText, AlertCircle } from 'lucide-react';

interface BulkImportModalProps {
  onClose: () => void;
}

const BulkImportModal: React.FC<BulkImportModalProps> = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importStep, setImportStep] = useState<'upload' | 'mapping' | 'preview'>('upload');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setImportStep('mapping');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImportStep('mapping');
    }
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = 'First Name,Last Name,Email,Phone,Company,Source,Campaign,Estimated Value\nJohn,Doe,john.doe@example.com,+1234567890,Example Corp,meta-ads,Summer Campaign,5000';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Bulk Import Leads</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {importStep === 'upload' && (
            <div className="space-y-6">
              {/* Download Template */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-blue-900">Download Template</h3>
                    <p className="text-sm text-blue-700">Use our CSV template to ensure proper formatting</p>
                  </div>
                  <button
                    onClick={downloadTemplate}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop your CSV file here
                </h3>
                <p className="text-gray-600 mb-4">or</p>
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supports CSV, Excel files (max 10MB)
                </p>
              </div>

              {/* Requirements */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-900">Requirements</h3>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• Email and Phone are required fields</li>
                      <li>• Maximum 1000 leads per import</li>
                      <li>• Duplicate emails will be skipped</li>
                      <li>• Invalid phone numbers will be flagged</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {importStep === 'mapping' && file && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">File: {file.name}</h3>
                <p className="text-sm text-gray-600">Map your CSV columns to lead fields</p>
              </div>

              <div className="space-y-4">
                {[
                  { field: 'firstName', label: 'First Name', required: true },
                  { field: 'lastName', label: 'Last Name', required: true },
                  { field: 'email', label: 'Email', required: true },
                  { field: 'phone', label: 'Phone', required: true },
                  { field: 'company', label: 'Company', required: false },
                  { field: 'source', label: 'Source', required: false },
                  { field: 'campaign', label: 'Campaign', required: false },
                  { field: 'value', label: 'Estimated Value', required: false },
                ].map((field) => (
                  <div key={field.field} className="flex items-center space-x-4">
                    <div className="w-32">
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </div>
                    <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select column...</option>
                      <option value="col1">Column 1</option>
                      <option value="col2">Column 2</option>
                      <option value="col3">Column 3</option>
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setImportStep('upload')}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={() => setImportStep('preview')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Preview Import
                </button>
              </div>
            </div>
          )}

          {importStep === 'preview' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900">Import Preview</h3>
                <p className="text-sm text-green-700 mt-1">
                  Ready to import 150 leads (5 duplicates found and will be skipped)
                </p>
              </div>

              <div className="max-h-64 overflow-y-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
                      <td className="px-4 py-2 text-sm text-gray-900">john@example.com</td>
                      <td className="px-4 py-2 text-sm text-gray-900">+1234567890</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Valid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Jane Smith</td>
                      <td className="px-4 py-2 text-sm text-gray-900">jane@example.com</td>
                      <td className="px-4 py-2 text-sm text-gray-900">invalid-phone</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Invalid Phone
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setImportStep('mapping')}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Import Leads
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;