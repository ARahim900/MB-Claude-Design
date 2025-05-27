import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Search, Calendar, Clock, DollarSign, Users, MapPin, CheckCircle, XCircle, 
  AlertTriangle, Plus, Edit3, Trash2, Eye, FileText, User, Building, 
  Phone, Mail, Calendar as CalendarIcon, Filter, Download, Upload,
  Activity, TrendingUp, UserCheck, Settings
} from 'lucide-react';

// Primary Color Scheme (matching main app)
const PRIMARY_COLOR = '#4E4456'; 
const PRIMARY_COLOR_LIGHT = '#7E708A'; 
const PRIMARY_COLOR_DARK = '#3B3241'; 

// Chart Colors
const CHART_COLORS = ['#6A5ACD', '#FFA07A', '#20B2AA', '#FF69B4', '#9370DB', '#F08080', '#4682B4'];

const ContractorTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [contractTypeFilter, setContractTypeFilter] = useState('all');
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('view'); // 'view', 'add', 'edit'

  // Sample data - replace with your actual data structure
  const [contractorsData, setContractorsData] = useState([
    {
      id: 1,
      name: 'Al Majd Construction',
      contactPerson: 'Ahmed Al Balushi',
      phone: '+968 9123 4567',
      email: 'ahmed@almajd.om',
      specialization: 'Infrastructure',
      contractType: 'maintenance',
      status: 'active',
      startDate: '2025-01-15',
      endDate: '2025-12-31',
      contractValue: 125000,
      completedProjects: 8,
      currentProjects: 3,
      rating: 4.5,
      location: 'Muscat',
      certifications: ['ISO 9001', 'OHSAS 18001'],
      notes: 'Excellent track record in infrastructure maintenance'
    },
    {
      id: 2,
      name: 'Oman Electrical Services',
      contactPerson: 'Salim Al Rashid',
      phone: '+968 9234 5678',
      email: 'salim@omanelec.om',
      specialization: 'Electrical',
      contractType: 'project',
      status: 'active',
      startDate: '2025-02-01',
      endDate: '2025-06-30',
      contractValue: 85000,
      completedProjects: 12,
      currentProjects: 2,
      rating: 4.8,
      location: 'Muscat',
      certifications: ['Electrical License', 'Safety Certificate'],
      notes: 'Specialized in high-voltage installations'
    },
    {
      id: 3,
      name: 'Green Landscaping Co.',
      contactPerson: 'Fatima Al Zahra',
      phone: '+968 9345 6789',
      email: 'fatima@greenland.om',
      specialization: 'Landscaping',
      contractType: 'maintenance',
      status: 'pending',
      startDate: '2025-06-01',
      endDate: '2025-11-30',
      contractValue: 45000,
      completedProjects: 5,
      currentProjects: 1,
      rating: 4.2,
      location: 'Muscat',
      certifications: ['Horticulture License'],
      notes: 'Specializes in sustainable landscaping solutions'
    },
    {
      id: 4,
      name: 'Tech Solutions Oman',
      contactPerson: 'Mohammed Al Hinai',
      phone: '+968 9456 7890',
      email: 'mohammed@techsolutions.om',
      specialization: 'IT & Technology',
      contractType: 'service',
      status: 'completed',
      startDate: '2024-09-01',
      endDate: '2025-02-28',
      contractValue: 35000,
      completedProjects: 15,
      currentProjects: 0,
      rating: 4.6,
      location: 'Muscat',
      certifications: ['ISO 27001', 'ITIL Certified'],
      notes: 'Excellent IT support and system integration'
    },
    {
      id: 5,
      name: 'Safety First Security',
      contactPerson: 'Ali Al Busaidi',
      phone: '+968 9567 8901',
      email: 'ali@safetyfirst.om',
      specialization: 'Security',
      contractType: 'service',
      status: 'suspended',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      contractValue: 95000,
      completedProjects: 3,
      currentProjects: 0,
      rating: 3.8,
      location: 'Muscat',
      certifications: ['Security License', 'First Aid'],
      notes: 'Under review for contract violations'
    }
  ]);

  // Navigation tabs
  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'contractors', name: 'Contractors', icon: Users },
    { id: 'contracts', name: 'Contracts', icon: FileText },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
  ];

  // Filter contractors based on search and filters
  const filteredContractors = useMemo(() => {
    return contractorsData.filter(contractor => {
      const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contractor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contractor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || contractor.status === statusFilter;
      const matchesType = contractTypeFilter === 'all' || contractor.contractType === contractTypeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [contractorsData, searchTerm, statusFilter, contractTypeFilter]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const total = contractorsData.length;
    const active = contractorsData.filter(c => c.status === 'active').length;
    const totalValue = contractorsData.reduce((sum, c) => sum + c.contractValue, 0);
    const totalProjects = contractorsData.reduce((sum, c) => sum + c.currentProjects, 0);
    
    return {
      totalContractors: total,
      activeContractors: active,
      totalContractValue: totalValue,
      activeProjects: totalProjects
    };
  }, [contractorsData]);

  // Status indicator component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', label: 'Suspended' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Summary card component
  const SummaryCard = ({ title, value, unit, icon: Icon, trend, trendColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-600 font-semibold text-sm">{title}</h3>
        <div className="p-2 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-slate-800">{value}</span>
          {unit && <span className="text-slate-500 text-sm">{unit}</span>}
        </div>
        {trend && <p className={`text-xs font-medium ${trendColor}`}>{trend}</p>}
      </div>
    </div>
  );

  // Contractor modal component
  const ContractorModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-slate-700">
                {modalType === 'add' ? 'Add New Contractor' : 
                 modalType === 'edit' ? 'Edit Contractor' : 'Contractor Details'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full"
              >
                <XCircle size={20} className="text-slate-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {modalType === 'view' && selectedContractor ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Company Name</label>
                    <p className="text-slate-800 font-semibold">{selectedContractor.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Contact Person</label>
                    <p className="text-slate-800">{selectedContractor.contactPerson}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Phone</label>
                    <p className="text-slate-800">{selectedContractor.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Email</label>
                    <p className="text-slate-800">{selectedContractor.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Specialization</label>
                    <p className="text-slate-800">{selectedContractor.specialization}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Status</label>
                    <div className="mt-1">
                      <StatusBadge status={selectedContractor.status} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Contract Value</label>
                    <p className="text-slate-800 font-semibold">
                      {selectedContractor.contractValue.toLocaleString()} OMR
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Rating</label>
                    <p className="text-slate-800">
                      {selectedContractor.rating}/5.0 ⭐
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Certifications</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedContractor.certifications.map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Notes</label>
                  <p className="text-slate-700 text-sm mt-1">{selectedContractor.notes}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                Form for {modalType === 'add' ? 'adding' : 'editing'} contractor would be implemented here.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Contractors"
          value={summaryStats.totalContractors}
          icon={Users}
          trend="Registered in system"
          trendColor="text-slate-500"
        />
        <SummaryCard
          title="Active Contractors"
          value={summaryStats.activeContractors}
          icon={UserCheck}
          trend="Currently engaged"
          trendColor="text-green-600"
        />
        <SummaryCard
          title="Total Contract Value"
          value={summaryStats.totalContractValue.toLocaleString()}
          unit="OMR"
          icon={DollarSign}
          trend="Across all contracts"
          trendColor="text-slate-500"
        />
        <SummaryCard
          title="Active Projects"
          value={summaryStats.activeProjects}
          icon={Activity}
          trend="In progress"
          trendColor="text-blue-600"
        />
      </div>

      {/* Status Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Contractor Status Distribution</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Active', value: contractorsData.filter(c => c.status === 'active').length },
                    { name: 'Pending', value: contractorsData.filter(c => c.status === 'pending').length },
                    { name: 'Completed', value: contractorsData.filter(c => c.status === 'completed').length },
                    { name: 'Suspended', value: contractorsData.filter(c => c.status === 'suspended').length },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {CHART_COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Contract Values by Specialization</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(
                  contractorsData.reduce((acc, contractor) => {
                    acc[contractor.specialization] = (acc[contractor.specialization] || 0) + contractor.contractValue;
                    return acc;
                  }, {})
                ).map(([name, value]) => ({ name, value }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={PRIMARY_COLOR} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Contractors Tab
  const renderContractors = () => (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search contractors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <select
            value={contractTypeFilter}
            onChange={(e) => setContractTypeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="maintenance">Maintenance</option>
            <option value="project">Project</option>
            <option value="service">Service</option>
          </select>
          
          <button
            onClick={() => {
              setModalType('add');
              setIsModalOpen(true);
            }}
            className="px-4 py-2 text-white rounded-lg transition-colors flex items-center space-x-2"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            <Plus size={18} />
            <span>Add Contractor</span>
          </button>
        </div>
      </div>

      {/* Contractors Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {['Company', 'Contact', 'Specialization', 'Status', 'Contract Value', 'Rating', 'Actions'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredContractors.map((contractor) => (
                <tr key={contractor.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{contractor.name}</div>
                      <div className="text-sm text-slate-500">{contractor.contactPerson}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{contractor.phone}</div>
                    <div className="text-sm text-slate-500">{contractor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {contractor.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={contractor.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {contractor.contractValue.toLocaleString()} OMR
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {contractor.rating}/5.0 ⭐
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedContractor(contractor);
                          setModalType('view');
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContractor(contractor);
                          setModalType('edit');
                          setIsModalOpen(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render other tabs (placeholder for now)
  const renderContracts = () => (
    <div className="bg-white p-10 rounded-xl shadow-lg text-center">
      <FileText size={48} className="mx-auto mb-4" style={{ color: PRIMARY_COLOR_LIGHT }} />
      <h3 className="text-xl font-semibold text-slate-700 mb-2">Contract Management</h3>
      <p className="text-slate-500">
        Detailed contract management features will be implemented here.
        This will include contract templates, renewal tracking, and document management.
      </p>
    </div>
  );

  const renderPerformance = () => (
    <div className="bg-white p-10 rounded-xl shadow-lg text-center">
      <TrendingUp size={48} className="mx-auto mb-4" style={{ color: PRIMARY_COLOR_LIGHT }} />
      <h3 className="text-xl font-semibold text-slate-700 mb-2">Performance Analytics</h3>
      <p className="text-slate-500">
        Performance tracking and analytics features will be implemented here.
        This will include KPI tracking, performance ratings, and comparative analysis.
      </p>
    </div>
  );

  // Main render function
  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-full p-1.5 inline-flex space-x-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105`}
                style={{
                  backgroundColor: isActive ? PRIMARY_COLOR : 'transparent',
                  color: isActive ? 'white' : PRIMARY_COLOR_DARK,
                }}
              >
                <tab.icon size={18} style={{ color: isActive ? 'white' : PRIMARY_COLOR }} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'contractors' && renderContractors()}
        {activeTab === 'contracts' && renderContracts()}
        {activeTab === 'performance' && renderPerformance()}
      </div>

      {/* Modal */}
      <ContractorModal />
    </div>
  );
};

export default ContractorTracker;
