import React, { useState } from 'react';
import { Phone, Mail, Calendar, MessageSquare, Edit, Trash, Clock, Tag, FileText, MapPin, Truck, CreditCard } from 'lucide-react';
import { Contact } from '../../types';

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
            <p className="text-gray-600">Order Date: {order.date}</p>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Shipping Address
              </h3>
              <p className="text-gray-600">John Doe</p>
              <p className="text-gray-600">123 Main St</p>
              <p className="text-gray-600">Apt 4B</p>
              <p className="text-gray-600">New York, NY 10001</p>
              <p className="text-gray-600">United States</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Billing Address
              </h3>
              <p className="text-gray-600">John Doe</p>
              <p className="text-gray-600">123 Main St</p>
              <p className="text-gray-600">Apt 4B</p>
              <p className="text-gray-600">New York, NY 10001</p>
              <p className="text-gray-600">United States</p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Delivery Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Delivery Partner</p>
                <p className="font-medium">FedEx Express</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tracking ID</p>
                <p className="font-medium">FX123456789</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium">March 20, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery Status</p>
                <p className="font-medium text-green-600">In Transit</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Products</h3>
            <div className="divide-y">
              {order.products?.map((product: any) => (
                <div key={product.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${product.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${order.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${order.tax}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">${order.total}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">Visa ending in 4242</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactDetailsProps {
  contact: Contact;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'notes' | 'orders'>('overview');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const callHistory = [
    { date: '2024-03-15', time: '10:30 AM', duration: '5:23', type: 'incoming', status: 'completed' },
    { date: '2024-03-14', time: '2:45 PM', duration: '3:15', type: 'outgoing', status: 'completed' },
    { date: '2024-03-13', time: '11:20 AM', duration: '', type: 'incoming', status: 'missed' },
  ];

  const notes = [
    { date: '2024-03-15', content: 'Discussed new product requirements', author: 'John Doe' },
    { date: '2024-03-14', content: 'Follow-up on previous meeting', author: 'Jane Smith' },
  ];

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-03-15',
      amount: '$1,500',
      status: 'completed',
      subtotal: 1200,
      shipping: 200,
      tax: 100,
      total: 1500,
      products: [
        { id: 1, name: 'Product 1', quantity: 2, price: 600 },
        { id: 2, name: 'Product 2', quantity: 1, price: 600 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-03-10',
      amount: '$2,300',
      status: 'pending',
      subtotal: 2000,
      shipping: 200,
      tax: 100,
      total: 2300,
      products: [
        { id: 3, name: 'Product 3', quantity: 1, price: 2000 }
      ]
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl text-gray-600 font-medium">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{contact.name}</h2>
              <div className="mt-1 flex items-center space-x-4">
                <span className="flex items-center text-gray-500">
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.phone}
                </span>
                <span className="flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  {contact.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
              <Edit className="h-5 w-5" />
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {contact.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              <Tag className="h-4 w-4 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex">
          {['overview', 'calls', 'notes', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Call</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                  <span>Message</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {callHistory.slice(0, 3).map((call, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {call.type === 'incoming' ? 'Incoming' : 'Outgoing'} Call
                        </p>
                        <p className="text-sm text-gray-500">{call.date} at {call.time}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      call.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {call.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calls' && (
          <div className="space-y-4">
            {callHistory.map((call, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {call.type === 'incoming' ? 'Incoming' : 'Outgoing'} Call
                    </p>
                    <p className="text-sm text-gray-500">{call.date} at {call.time}</p>
                    {call.duration && (
                      <p className="text-sm text-gray-500">Duration: {call.duration}</p>
                    )}
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  call.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {call.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{note.author}</span>
                  <span className="text-sm text-gray-500">{note.date}</span>
                </div>
                <p className="text-gray-700">{note.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-left"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{order.amount}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <OrderDetailsDialog
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default ContactDetails;