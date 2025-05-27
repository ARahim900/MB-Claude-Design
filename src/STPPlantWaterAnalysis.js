import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area } from 'recharts';
import { Search, Bell, ChevronDown, SlidersHorizontal, Share2, LayoutDashboard, BarChart2, List, Zap, TrendingUp, Users2, MapPin, Power, DollarSign, Filter, Settings, FileText, Activity, Droplets, Combine, UserCheck, Columns, Sparkles, X, CalendarDays, Building, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Beaker, Thermometer, Gauge } from 'lucide-react';

// Primary Color Scheme (matching main app)
const PRIMARY_COLOR = '#4E4456'; 
const PRIMARY_COLOR_LIGHT = '#7E708A'; 
const PRIMARY_COLOR_DARK = '#3B3241'; 

// Chart Colors
const CHART_COLORS = ['#6A5ACD', '#FFA07A', '#20B2AA', '#FF69B4', '#9370DB', '#F08080', '#4682B4'];

const STPPlantWaterAnalysis = () => {
  const [activeTab, setActiveTab] = useState('stp-overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('weekly');
  const [selectedParameter, setSelectedParameter] = useState('all');

  // Sample data structures - you can replace these with your actual data
  const [stpData, setStpData] = useState({
    // STP Plant operational data
    flowRate: { current: 2500, target: 3000, unit: 'L/min' },
    treatmentEfficiency: { current: 94.5, target: 95, unit: '%' },
    sludgeLevel: { current: 67, target: 70, unit: '%' },
    powerConsumption: { current: 145, target: 150, unit: 'kWh' },
    
    // Equipment status
    equipment: [
      { id: 1, name: 'Primary Pump A', status: 'operational', efficiency: 92 },
      { id: 2, name: 'Primary Pump B', status: 'operational', efficiency: 89 },
      { id: 3, name: 'Aeration Blower 1', status: 'maintenance', efficiency: 0 },
      { id: 4, name: 'Aeration Blower 2', status: 'operational', efficiency: 91 },
      { id: 5, name: 'Secondary Clarifier', status: 'operational', efficiency: 96 },
    ],
    
    // Recent alerts
    alerts: [
      { id: 1, type: 'warning', message: 'Aeration Blower 1 scheduled for maintenance', timestamp: '2025-05-27 08:30' },
      { id: 2, type: 'info', message: 'Daily water quality test completed', timestamp: '2025-05-27 06:00' },
      { id: 3, type: 'success', message: 'Treatment efficiency target achieved', timestamp: '2025-05-26 18:00' },
    ]
  });

  const [waterQualityData, setWaterQualityData] = useState({
    // Water quality parameters
    parameters: {
      ph: { current: 7.2, min: 6.5, max: 8.5, status: 'normal' },
      dissolvedOxygen: { current: 6.8, min: 5.0, max: 9.0, status: 'normal' },
      turbidity: { current: 0.8, min: 0, max: 1.0, status: 'normal' },
      tss: { current: 12, min: 0, max: 30, status: 'normal' },
      bod: { current: 8, min: 0, max: 20, status: 'normal' },
      cod: { current: 25, min: 0, max: 50, status: 'normal' },
      ammonia: { current: 0.5, min: 0, max: 2.0, status: 'normal' },
      phosphorus: { current: 0.3, min: 0, max: 1.0, status: 'normal' }
    },
    
    // Historical trend data
    trends: [
      { date: '2025-05-20', ph: 7.1, do: 6.5, turbidity: 0.9, tss: 15 },
      { date: '2025-05-21', ph: 7.0, do: 6.7, turbidity: 0.7, tss: 13 },
      { date: '2025-05-22', ph: 7.2, do: 6.8, turbidity: 0.8, tss: 12 },
      { date: '2025-05-23', ph: 7.3, do: 6.9, turbidity: 0.6, tss: 11 },
      { date: '2025-05-24', ph: 7.1, do: 6.6, turbidity: 0.9, tss: 14 },
      { date: '2025-05-25', ph: 7.2, do: 6.8, turbidity: 0.8, tss: 12 },
      { date: '2025-05-26', ph: 7.2, do: 6.8, turbidity: 0.8, tss: 12 },
    ]
  });

  // Navigation tabs
  const tabs = [
    { id: 'stp-overview', name: 'STP Overview', icon: Combine },
    { id: 'water-quality', name: 'Water Quality', icon: Beaker },
    { id: 'equipment-status', name: 'Equipment', icon: Settings },
    { id: 'analytics', name: 'Analytics', icon: BarChart2 },
  ];

  // Status indicator component
  const StatusIndicator = ({ status, size = 'sm' }) => {
    const statusConfig = {
      operational: { color: 'bg-green-500', label: 'Operational' },
      maintenance: { color: 'bg-yellow-500', label: 'Maintenance' },
      offline: { color: 'bg-red-500', label: 'Offline' },
      normal: { color: 'bg-green-500', label: 'Normal' },
      warning: { color: 'bg-yellow-500', label: 'Warning' },
      critical: { color: 'bg-red-500', label: 'Critical' }
    };

    const config = statusConfig[status] || statusConfig.offline;
    const sizeClass = size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';

    return (
      <div className="flex items-center space-x-2">
        <div className={`${sizeClass} ${config.color} rounded-full animate-pulse`}></div>
        <span className="text-sm text-slate-600">{config.label}</span>
      </div>
    );
  };

  // Metric card component
  const MetricCard = ({ title, current, target, unit, status, icon: Icon }) => {
    const percentage = target ? (current / target) * 100 : 100;
    const statusColor = percentage >= 90 ? 'text-green-600' : percentage >= 70 ? 'text-yellow-600' : 'text-red-600';

    return (
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-slate-600 font-semibold text-sm">{title}</h3>
          <div className="p-2 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-800">{current}</span>
            <span className="text-slate-500 text-sm">{unit}</span>
          </div>
          {target && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Target: {target} {unit}</span>
              <span className={`font-semibold ${statusColor}`}>
                {percentage.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render STP Overview Tab
  const renderSTPOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Flow Rate"
          current={stpData.flowRate.current}
          target={stpData.flowRate.target}
          unit={stpData.flowRate.unit}
          icon={Droplets}
        />
        <MetricCard
          title="Treatment Efficiency"
          current={stpData.treatmentEfficiency.current}
          target={stpData.treatmentEfficiency.target}
          unit={stpData.treatmentEfficiency.unit}
          icon={CheckCircle}
        />
        <MetricCard
          title="Sludge Level"
          current={stpData.sludgeLevel.current}
          target={stpData.sludgeLevel.target}
          unit={stpData.sludgeLevel.unit}
          icon={Gauge}
        />
        <MetricCard
          title="Power Consumption"
          current={stpData.powerConsumption.current}
          target={stpData.powerConsumption.target}
          unit={stpData.powerConsumption.unit}
          icon={Zap}
        />
      </div>

      {/* Equipment Status Overview */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Equipment Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stpData.equipment.map((equipment) => (
            <div key={equipment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-700">{equipment.name}</h4>
                <StatusIndicator status={equipment.status} />
              </div>
              <div className="text-sm text-slate-600">
                Efficiency: <span className="font-semibold">{equipment.efficiency}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {stpData.alerts.map((alert) => {
            const alertIcons = {
              warning: AlertTriangle,
              info: FileText,
              success: CheckCircle,
              error: XCircle
            };
            const AlertIcon = alertIcons[alert.type];
            const alertColors = {
              warning: 'text-yellow-600',
              info: 'text-blue-600',
              success: 'text-green-600',
              error: 'text-red-600'
            };

            return (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <AlertIcon size={18} className={alertColors[alert.type]} />
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Render Water Quality Tab
  const renderWaterQuality = () => (
    <div className="space-y-6">
      {/* Water Quality Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(waterQualityData.parameters).map(([key, param]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium text-slate-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <StatusIndicator status={param.status} />
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold text-slate-800">{param.current}</div>
              <div className="text-xs text-slate-500">
                Range: {param.min} - {param.max}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Water Quality Trends Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Water Quality Trends</h3>
        <div style={{ height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waterQualityData.trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ph" stroke={CHART_COLORS[0]} strokeWidth={2} name="pH" />
              <Line type="monotone" dataKey="do" stroke={CHART_COLORS[1]} strokeWidth={2} name="Dissolved Oxygen" />
              <Line type="monotone" dataKey="turbidity" stroke={CHART_COLORS[2]} strokeWidth={2} name="Turbidity" />
              <Line type="monotone" dataKey="tss" stroke={CHART_COLORS[3]} strokeWidth={2} name="TSS" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Render Equipment Status Tab
  const renderEquipmentStatus = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-6">Detailed Equipment Status</h3>
        <div className="space-y-4">
          {stpData.equipment.map((equipment) => (
            <div key={equipment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-medium text-slate-700">{equipment.name}</h4>
                <StatusIndicator status={equipment.status} size="lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-slate-500">Efficiency</span>
                  <div className="text-xl font-bold text-slate-800">{equipment.efficiency}%</div>
                </div>
                <div>
                  <span className="text-sm text-slate-500">Runtime Today</span>
                  <div className="text-xl font-bold text-slate-800">18.5h</div>
                </div>
                <div>
                  <span className="text-sm text-slate-500">Last Maintenance</span>
                  <div className="text-sm text-slate-600">2025-05-20</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Analytics Tab
  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <Activity size={48} className="mx-auto mb-4" style={{ color: PRIMARY_COLOR_LIGHT }} />
        <h3 className="text-xl font-semibold text-slate-700 mb-2">Advanced Analytics</h3>
        <p className="text-slate-500">
          Detailed analytics and reporting features will be implemented here.
          This section will include performance trends, predictive maintenance alerts,
          and comprehensive reporting capabilities.
        </p>
      </div>
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
        {activeTab === 'stp-overview' && renderSTPOverview()}
        {activeTab === 'water-quality' && renderWaterQuality()}
        {activeTab === 'equipment-status' && renderEquipmentStatus()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default STPPlantWaterAnalysis;
