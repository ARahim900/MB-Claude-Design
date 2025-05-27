import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Label, Area } from 'recharts';
import { Search, Bell, ChevronDown, SlidersHorizontal, Share2, LayoutDashboard, BarChart2, List, Zap, TrendingUp, Users2, MapPin, Power, DollarSign, Filter, Settings, FileText, Activity, Droplets, Combine, UserCheck, Columns, Sparkles, X, CalendarDays, Building, ArrowLeft } from 'lucide-react';
import LandingPage from './LandingPage';
import STPPlantWaterAnalysis from './STPPlantWaterAnalysis';
import ContractorTracker from './ContractorTracker';

// OMR Conversion Rate
const OMR_PER_KWH = 0.025;

// Primary Color Scheme
const PRIMARY_COLOR = '#4E4456'; 
const PRIMARY_COLOR_LIGHT = '#7E708A'; 
const PRIMARY_COLOR_DARK = '#3B3241'; 

// Updated PIE_COLORS
const PIE_COLORS = ['#6A5ACD', '#FFA07A', '#20B2AA', '#FF69B4', '#9370DB', '#F08080', '#4682B4'];

const rawDataString = `SL:no.\tZone\tType \tMuscat Bay Number\tUnit Number (Muncipality) \tElectrical Meter Account  No\tNovember-24\tDecember-24\tJanuary-25\tFebruary-25\tMarch-25\tApril-25
1\tInfrastructure\tMC\tMC\tPumping Station 01 \tR52330\t1629\t1640\t1903\t2095\t3032\t3940
2\tInfrastructure\tMC\tMC\tPumping Station 03\tR52329\t0\t179\t32.5\t137.2\t130.7\t276.6
3\tInfrastructure\tMC\tMC\tPumping Station 04 \tR52327\t919\t921\t245.1\t869.5\t646.1\t984.9
4\tInfrastructure\tMC\tMC\tPumping Station 05 \tR52325\t2599\t1952\t2069\t2521\t2601\t3317
5\tInfrastructure\tMC\tMC\tLifting Station 02\tR52328\t0\t0\t0\t0\t0\t0
6\tInfrastructure\tMC\tMC\tLifting Station 03\tR52333\t91\t185\t28\t40\t58\t83
7\tInfrastructure\tMC\tMC\tLifting Station 04\tR52324\t686\t631\t701\t638\t572\t750.22
8\tInfrastructure\tMC\tMC\tLifting Station 05\tR52332\t2413\t2643\t2873\t3665\t3069\t4201.4
9\tInfrastructure\tMC\tMC\tIrrigation Tank 01\tR52324 (R52326)\t1432\t1268\t1689\t2214\t1718\t1663
10\tInfrastructure\tMC\tMC\tIrrigation Tank 02\tR52331\t974\t1026\t983\t1124\t1110\t1830
11\tInfrastructure\tMC\tMC\tIrrigation Tank 03\tR52323\t269\t417\t840\t1009\t845\t1205
12\tInfrastructure\tMC\tMC\tIrrigation Tank 04\tR53195\t212\t213\t39.7\t233.2\t234.9\t447.2
13\tInfrastructure\tMC\tMC\tActuator DB 01 (Z8)\tR53196\t34\t29\t7.3\t27.7\t24.4\t27.1
14\tInfrastructure\tMC\tMC\tActuator DB 02\tR51900\t232\t161\t33\t134\t138.5\t211
15\tInfrastructure\tMC\tMC\tActuator DB 03\tR51904\t220\t199\t55.7\t203.3\t196\t211.6
16\tInfrastructure\tMC\tMC\tActuator DB 04\tR51901\t172\t173\t186\t161\t227\t253
17\tInfrastructure\tMC\tMC\tActuator DB 05\tR51907\t18\t16\t4.2\t17.8\t14\t17.7
18\tInfrastructure\tMC\tMC\tActuator DB 06\tR51909\t49\t44\t47\t45\t38\t46.9
19\tInfrastructure\tMC\tMC\tStreet Light FP 01 (Z8)\tR53197\t3593\t3147\t787\t3228\t2663\t3230
20\tInfrastructure\tMC\tMC\tStreet Light FP 02\tR51906\t2361\t2258\t633\t2298\t1812\t2153
21\tInfrastructure\tMC\tMC\tStreet Light FP 03\tR51905\t2060\t1966\t1868\t1974\t1562\t1847
22\tInfrastructure\tMC\tMC\tStreet Light FP 04\tR51908\t2299\t1389\t325\t1406\t1401\t2412.9
23\tInfrastructure\tMC\tMC\tStreet Light FP 05\tR51902\t1477\t1121\t449\t2069.9\t1870.1\t3233
24\tInfrastructure\tMC\tMC\tBeachwell\tR51903\t24383\t37236\t38168\t18422\t40\t27749
25\tInfrastructure\tMC\tMC\tHelipad\tR52334\t0\t0\t0\t0\t0\t0
26\tCentral Park\tMC\tMC\tCentral Park\tR54672\t9604\t19032\t22819\t19974\t14190\t13846
27\tAncilary\tBuilding\tMC\tGuard House\tR53651\t1225\t814\t798\t936\t879\t1467
28\tAncilary\tBuilding\tMC\tSecurity Building\tR53649\t5702\t5131\t5559\t5417\t4504\t5978
29\tAncilary\tBuilding\tMC\tROP Building\tR53648\t3581\t2352\t2090\t2246\t1939\t3537
30\tZone 3\tSBJ Common Meter\tD 44\tApartment\tR53705\t1377\t764\t647\t657\t650\t1306
31\tZone 3\tSBJ Common Meter\tD 45\tApartment\tR53665\t1252\t841\t670\t556\t608\t1069
32\tZone 3\tSBJ Common Meter\tD 46\tApartment\tR53700\t1577\t890\t724\t690\t752\t1292
33\tZone 3\tSBJ Common Meter\tD 47\tApartment\tR53690\t1774\t1055\t887\t738\t792\t1545
34\tZone 3\tSBJ Common Meter\tD 48\tApartment\tR53666\t1046\t785\t826\t676\t683\t1092
35\tZone 3\tSBJ Common Meter\tD 49\tApartment\tR53715\t1608\t1068\t860\t837\t818\t984
36\tZone 3\tSBJ Common Meter\tD 50\tApartment\tR53672\t1102\t789\t765\t785\t707\t1331
37\tZone 3\tSBJ Common Meter\tD 51\tApartment\tR53657\t1855\t710\t661\t682\t642\t904
38\tZone 3\tSBJ Common Meter\tD 52\tApartment\tR53699\t1986\t1208\t979\t896\t952\t1651
39\tZone 3\tSBJ Common Meter\tD53\tApartment\tR54782\t1764\t968\t693\t732\t760\t1281
40\tZone 3\tSBJ Common Meter\tD54\tApartment\tR54793\t1777\t834\t681\t559\t531\t1042
41\tZone 3\tSBJ Common Meter\tD55\tApartment\tR54804\t1828\t1035\t677\t616\t719\t1417
42\tZone 3\tSBJ Common Meter\tD56\tApartment\tR54815\t1805\t937\t683\t731\t765\t1536
43\tZone 3\tSBJ Common Meter\tD57\tApartment\tR54826\t2262\t1332\t990\t846\t795\t1732
44\tZone 3\tSBJ Common Meter\tD58\tApartment\tR54836\t1534\t778\t593\t535\t594\t1415
45\tZone 3\tSBJ Common Meter\tD59\tApartment\tR54847\t1634\t998\t628\t582\t697\t1138
46\tZone 3\tSBJ Common Meter\tD60\tApartment\tR54858\t1275\t705\t674\t612\t679\t1069
47\tZone 3\tSBJ Common Meter\tD61\tApartment\tR54869\t1734\t977\t767\t800\t719\t1394
48\tZone 3\tSBJ Common Meter\tD 62\tApartment\tR53717\t1630\t957\t715\t677\t595\t800
49\tZone 3\tSBJ Common Meter\tD 74\tApartment\tR53675\t1303\t766\t639\t566\t463\t1079
50\tZone 3\tSBJ Common Meter\tD 75\tApartment\tR53668\t1169\t702\t475\t508\t554\t912
51\t\tSBJ Common Meter\t\tVillage Square\tR56628\t6229\t3695\t3304\t3335\t3383\t4415
52\tZone 3\tSBJ Common Meter\tFP-17\tZone-3 landscape light\tR54872\t0\t0\t0\t0\t0\t0
53\tZone 3\tSBJ Common Meter\tFP-21\tZone-3 landscape light\tR54873\t40\t48\t12.9\t56.6\t46.5\t55
54\tZone 3\tSBJ Common Meter\tFP-22\tZone-3 landscape light\tR54874\t6\t8\t0\t0\t0\t0
55\t\tSBJ Common Meter\t\tBank muscat\tMISSING_METER\t148\t72\t59\t98\t88\t163
56\t\tSBJ Common Meter\t\tCIF kitchen\tMISSING_METER\t16742\t15554\t16788\t16154\t14971\t18446`.trim();

const extractCategory = (unitName) => {
    if (!unitName) return 'Other';
    const lowerUnitName = unitName.toLowerCase();
    if (lowerUnitName.includes('pumping station')) return 'Pumping Station';
    if (lowerUnitName.includes('lifting station')) return 'Lifting Station';
    if (lowerUnitName.includes('street light')) return 'Street Light';
    if (lowerUnitName.includes('irrigation tank')) return 'Irrigation Tank';
    if (lowerUnitName.includes('actuator db')) return 'Actuator DB';
    if (lowerUnitName.includes('apartment')) return 'Apartment';
    if (lowerUnitName.includes('guard house') || lowerUnitName.includes('security building') || lowerUnitName.includes('rop building')) return 'Ancillary Building';
    if (lowerUnitName.includes('central park')) return 'Central Park';
    if (lowerUnitName.includes('village square')) return 'Village Square';
    if (lowerUnitName.includes('bank muscat')) return 'Commercial (Bank)';
    if (lowerUnitName.includes('cif kitchen')) return 'Commercial (Kitchen)';
    if (lowerUnitName.includes('landscape light')) return 'Landscape Light';
    if (lowerUnitName.includes('beachwell')) return 'Beachwell';
    if (lowerUnitName.includes('helipad')) return 'Helipad';
    return 'Other';
};

const parseData = (rawData) => {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthsHeader = headerLine.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const unitName = values[4]?.trim() || 'N/A';
    const entry = {
      id: parseInt(values[0], 10) || index + 1,
      slNo: parseInt(values[0], 10) || index + 1,
      zone: values[1]?.trim() || 'N/A',
      type: values[2]?.trim() || 'N/A',
      muscatBayNumber: values[3]?.trim() || 'N/A',
      unitName: unitName,
      category: extractCategory(unitName),
      meterAccountNo: values[5]?.trim() || 'N/A',
      consumption: {},
      totalConsumption: 0, 
    };
    let currentOverallTotal = 0;
    monthsHeader.forEach((month, i) => {
      const consumptionValue = parseFloat(values[6 + i]);
      entry.consumption[month] = isNaN(consumptionValue) ? 0 : consumptionValue;
      if (!isNaN(consumptionValue)) {
        currentOverallTotal += consumptionValue;
      }
    });
    entry.totalConsumption = parseFloat(currentOverallTotal.toFixed(2));
    return entry;
  });
};

const initialElectricityData = parseData(rawDataString);
const availableMonths = Object.keys(initialElectricityData[0].consumption);

// Sidebar Component
const Sidebar = ({ activeMainSection, setActiveMainSection, onBackToLanding }) => {
  const mainSections = [
    { name: 'Electricity System', icon: Zap, sectionId: 'ElectricitySystem' },
    { name: 'STP & Water Analysis', icon: Combine, sectionId: 'STPWaterAnalysis' },
    { name: 'Contractor Tracker', icon: UserCheck, sectionId: 'ContractorTracker' },
  ];

  return (
    <div className="w-64 text-slate-100 p-5 space-y-8 min-h-screen shadow-2xl print:hidden" style={{backgroundColor: PRIMARY_COLOR_DARK}}>
      <div className="text-3xl font-bold flex items-center space-x-3 text-white">
        <Power size={32} style={{ color: PRIMARY_COLOR_LIGHT }} className="animate-pulse"/> 
        <span>Muscat Bay OMS</span>
      </div>
      
      {/* Back to Home Button */}
      <button
        onClick={onBackToLanding}
        className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-in-out group hover:bg-slate-600 text-slate-300 hover:text-white"
      >
        <ArrowLeft size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </button>

      <nav className="space-y-2">
        {mainSections.map(section => (
          <button
            key={section.sectionId}
            onClick={() => setActiveMainSection(section.sectionId)}
            style={section.sectionId === activeMainSection ? { backgroundColor: PRIMARY_COLOR, color: 'white' } : {color: 'white'}}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-in-out group hover:text-white`}
            onMouseOver={(e) => { if (section.sectionId !== activeMainSection) e.currentTarget.style.backgroundColor = PRIMARY_COLOR_LIGHT; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { if (section.sectionId !== activeMainSection) {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white';}}}
          >
            <section.icon size={22} className={`group-hover:scale-110 transition-transform text-white`} />
            <span className="font-medium">{section.name}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto p-4 bg-slate-700 bg-opacity-30 rounded-lg text-center border" style={{borderColor: PRIMARY_COLOR_LIGHT}}>
        <p className="text-sm" style={{color: PRIMARY_COLOR_LIGHT}}>Operations Management Suite</p>
        <button 
            className="mt-3 w-full text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-lg transition-all"
            style={{ backgroundColor: PRIMARY_COLOR }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR_DARK} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR}
        >
          Global Settings
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 print:hidden">
      <div className="mb-3 md:mb-0">
        <h1 className="text-2xl font-bold text-slate-800">Operations Dashboard</h1>
        <p className="text-sm text-slate-500">Muscat Bay Utilities & Services Overview</p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-5">
        <div className="relative">
          <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search..." className="pl-11 pr-4 py-2.5 w-full sm:w-48 md:w-72 border border-slate-300 rounded-lg focus:ring-2 outline-none text-sm transition-all" style={{ '--tw-ring-color': PRIMARY_COLOR_LIGHT }} />
        </div>
        <button className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors group hidden sm:block"> <SlidersHorizontal size={22} className="text-slate-600 group-hover:text-slate-800" /> </button>
        <button className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors group hidden md:block"> <Share2 size={22} className="text-slate-600 group-hover:text-slate-800" /> </button>
        <button className="p-2.5 rounded-lg hover:bg-slate-100 relative transition-colors group"> <Bell size={22} className="text-slate-600 group-hover:text-slate-800" /> <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span> </button>
        <div className="flex items-center space-x-3 cursor-pointer group">
          <img src={`https://placehold.co/40x40/${PRIMARY_COLOR.substring(1)}/FFFFFF?text=MB&font=Inter`} alt="User Avatar" className="w-10 h-10 rounded-full border-2 transition-all" style={{ borderColor: PRIMARY_COLOR_LIGHT }} onMouseOver={(e) => e.currentTarget.style.borderColor = PRIMARY_COLOR} onMouseOut={(e) => e.currentTarget.style.borderColor = PRIMARY_COLOR_LIGHT} />
          <div className="hidden md:block"> <span className="text-sm text-slate-700 font-semibold block">Muscat Bay Admin</span> <span className="text-xs text-slate-500">Administrator</span> </div>
          <ChevronDown size={18} className="text-slate-500 group-hover:text-slate-800 transition-colors hidden md:block" />
        </div>
      </div>
    </div>
  );
};

// StyledSelect Component
const StyledSelect = ({ label, value, onChange, options, id, icon: Icon }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <div className="relative">
                <select id={id} value={value} onChange={onChange} className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700" style={{ '--tw-ring-color': PRIMARY_COLOR_LIGHT, borderColor: 'rgb(203 213 225 / 1)', ringColor: PRIMARY_COLOR_LIGHT }} >
                    {options.map(option => ( <option key={option.value} value={option.value}>{option.label}</option> ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    {Icon ? <Icon size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>
        </div>
    );
};

// FilterBar Component
const FilterBar = ({ months, categories, selectedMonth, setSelectedMonth, selectedCategory, setSelectedCategory }) => {
    const monthOptions = [{ value: "All Months", label: "All Months" }, ...months.map(m => ({ value: m, label: m }))];
    const categoryOptions = [{ value: "All Categories", label: "All Categories" }, ...categories.map(c => ({ value: c, label: c }))];
    return (
        <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden sticky top-[110px] md:top-[88px] z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                <StyledSelect id="monthFilter" label="Filter by Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} options={monthOptions} icon={CalendarDays}/>
                <StyledSelect id="categoryFilter" label="Filter by Unit Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} options={categoryOptions} icon={List}/>
                <button onClick={() => { setSelectedMonth("All Months"); setSelectedCategory("All Categories"); }} className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full lg:w-auto" style={{ backgroundColor: PRIMARY_COLOR_DARK }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR} onMouseOut={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR_DARK}> <Filter size={16}/> <span>Reset Filters</span> </button>
            </div>
        </div>
    );
};

// Styled SubNavBar for Electricity System
const ElectricitySubNavBarStyled = ({ activeSubSection, setActiveSubSection }) => {
    const subSections = [
        { name: 'Dashboard', id: 'Dashboard', icon: LayoutDashboard },
        { name: 'Performance', id: 'Performance', icon: TrendingUp },
        { name: 'Analytics', id: 'Analytics', icon: BarChart2 },
        { name: 'Unit Details', id: 'UnitDetails', icon: List },
    ];
    return (
        <div className="mb-6 print:hidden flex justify-center">
            <div className="bg-white shadow-md rounded-full p-1.5 inline-flex space-x-1">
                {subSections.map((tab) => {
                    const isActive = activeSubSection === tab.id;
                    return ( <button key={tab.id} onClick={() => setActiveSubSection(tab.id)} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105`} style={{ backgroundColor: isActive ? PRIMARY_COLOR : 'transparent', color: isActive ? 'white' : PRIMARY_COLOR_DARK, }} onMouseOver={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = PRIMARY_COLOR_LIGHT; if(!isActive) e.currentTarget.style.color = 'white';}} onMouseOut={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; if(!isActive) e.currentTarget.style.color = PRIMARY_COLOR_DARK;}}> <tab.icon size={18} style={{ color: isActive ? 'white' : PRIMARY_COLOR }}/> <span>{tab.name}</span> </button> );
                })}
            </div>
        </div>
    );
};

// Summary Card Component
const SummaryCard = ({ title, value, icon, unit, trend, trendColor, iconBgColor }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-slate-500 font-semibold text-md">{title}</h3>
        <div className={`p-3 rounded-full text-white shadow-md`} style={{backgroundColor: iconBgColor || PRIMARY_COLOR }}>
          <IconComponent size={22} />
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1.5">{value} <span className="text-base font-medium text-slate-500">{unit}</span></p>
      {trend && <p className={`text-xs sm:text-sm font-medium ${trendColor}`}>{trend}</p>}
    </div>
  );
};

// ChartWrapper Component
const ChartWrapper = ({ title, children, subtitle }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
    {subtitle && <p className="text-sm text-slate-500 mb-4">{subtitle}</p>}
    <div className="mt-4" style={{ height: '350px' }}>
      {children}
    </div>
  </div>
);

// DonutLegend Component
const DonutLegend = ({ payload, data }) => {
  if (!payload || payload.length === 0 || !data || data.length === 0) { return <div className="mt-4 text-center text-xs text-slate-500">No data to display in legend.</div>; }
  const totalForLegend = data.reduce((sum, entry) => sum + entry.value, 0);
  if (totalForLegend === 0) { return <div className="mt-4 text-center text-xs text-slate-500">Total is zero, percentages not applicable.</div>; }
  return ( <div className="mt-4 text-center"> <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2"> {payload.map((entry, index) => ( <li key={`item-${index}`} className="flex items-center text-xs text-slate-600"> <span style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-sm mr-2 inline-block"></span> {entry.payload.name}: {entry.payload.value.toLocaleString()} kWh ({((entry.payload.value / totalForLegend) * 100).toFixed(1)}%) </li> ))} </ul> </div> );
};

// AI Analysis Modal
const AiAnalysisModal = ({ isOpen, onClose, analysisResult, isLoading }) => {
    if (!isOpen) return null;
    return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"> <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"> <div className="flex justify-between items-center mb-4"> <h3 className="text-xl font-semibold" style={{color: PRIMARY_COLOR}}>✨ AI Consumption Analysis</h3> <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200"> <X size={20} className="text-slate-600"/> </button> </div> {isLoading ? ( <div className="text-center py-8"> <Sparkles size={48} className="mx-auto animate-pulse" style={{color: PRIMARY_COLOR_LIGHT}} /> <p className="mt-2 text-slate-600">AI is analyzing data, please wait...</p> </div> ) : ( <div className="text-sm text-slate-700 space-y-3 whitespace-pre-wrap"> {analysisResult ? ( analysisResult.split('\n').map((line, index) => ( <p key={index}>{line.startsWith('* ') || line.startsWith('- ') ? `• ${line.substring(2)}` : line}</p> )) ) : ( <p>No analysis available or an error occurred.</p> )} </div> )} <div className="mt-6 text-right"> <button onClick={onClose} className="text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: PRIMARY_COLOR }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR_DARK} onMouseOut={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR}> Close </button> </div> </div> </div> );
};

// Main Application Component
const App = () => {
  // Navigation state - determines if we're on landing page or in a system
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'system'
  const [activeMainSection, setActiveMainSection] = useState('ElectricitySystem');
  const [activeElectricitySubSection, setActiveElectricitySubSection] = useState('Dashboard');
  
  const [selectedMonth, setSelectedMonth] = useState("All Months"); 
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedUnitId, setSelectedUnitId] = useState(initialElectricityData.length > 0 ? initialElectricityData[0].id.toString() : "");

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const distinctCategories = useMemo(() => 
    [...new Set(initialElectricityData.map(d => d.category))].sort(), 
  []);
  
  const distinctUnitsForDropdown = useMemo(() => 
    initialElectricityData.map(d => ({ value: d.id.toString(), label: `${d.unitName} (${d.meterAccountNo})`})).sort((a,b) => a.label.localeCompare(b.label)),
  []);

  const filteredElectricityData = useMemo(() => {
    return initialElectricityData.filter(item => {
      const categoryMatch = selectedCategory === "All Categories" || item.category === selectedCategory;
      return categoryMatch; 
    });
  }, [selectedCategory]);

  const kpiAndTableData = useMemo(() => {
    if (selectedMonth === "All Months") {
        return filteredElectricityData.map(item => ({ ...item, }));
    }
    return filteredElectricityData.map(item => ({ ...item, totalConsumption: item.consumption[selectedMonth] || 0, }));
  }, [filteredElectricityData, selectedMonth]);

  const totalConsumptionKWh = useMemo(() => kpiAndTableData.reduce((acc, curr) => acc + curr.totalConsumption, 0), [kpiAndTableData]);
  const totalCostOMR = useMemo(() => totalConsumptionKWh * OMR_PER_KWH, [totalConsumptionKWh]);
  const averageConsumptionPerUnit = useMemo(() => kpiAndTableData.length > 0 ? totalConsumptionKWh / kpiAndTableData.length : 0, [totalConsumptionKWh, kpiAndTableData]);
  const activeMeters = useMemo(() => kpiAndTableData.filter(d => d.meterAccountNo !== 'N/A' && d.meterAccountNo !== 'MISSING_METER' && d.totalConsumption > 0).length, [kpiAndTableData]);

  const monthlyTrendForAllMonths = useMemo(() => {
    return availableMonths.map(month => {
      const total = filteredElectricityData.reduce((acc, curr) => acc + (curr.consumption[month] || 0), 0);
      return { name: month.replace('-24', '').replace('-25', ''), total: parseFloat(total.toFixed(2)) };
    });
  }, [filteredElectricityData]);

  const consumptionByTypeChartData = useMemo(() => {
    const dataToUse = kpiAndTableData; 
    const typeData = {};
    dataToUse.forEach(d => { typeData[d.type] = (typeData[d.type] || 0) + d.totalConsumption; });
    return Object.entries(typeData).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) })).filter(item => item.value > 0).sort((a,b) => b.value - a.value);
  }, [kpiAndTableData]);
  const totalForTypeChartLabel = useMemo(() => consumptionByTypeChartData.reduce((sum, item) => sum + item.value, 0), [consumptionByTypeChartData]);

  const topConsumersChartData = useMemo(() => {
    const dataToUse = kpiAndTableData;
    return dataToUse.slice().sort((a, b) => b.totalConsumption - a.totalConsumption).filter(d => d.totalConsumption > 0).slice(0, 7).map(d => ({ name: d.unitName, consumption: d.totalConsumption, monthlyDataFull: initialElectricityData.find(item => item.id === d.id)?.consumption || {} }));
  }, [kpiAndTableData]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  React.useEffect(() => {
    setCurrentPage(1);
    if (activeMainSection !== 'ElectricitySystem' || (activeMainSection === 'ElectricitySystem' && activeElectricitySubSection !== 'Dashboard')) {
        setSelectedMonth("All Months");
        setSelectedCategory("All Categories");
    }
  }, [selectedMonth, selectedCategory, activeMainSection, activeElectricitySubSection]);

  const totalPages = Math.ceil(kpiAndTableData.length / itemsPerPage);
  const paginatedTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return kpiAndTableData.slice(startIndex, startIndex + itemsPerPage);
  }, [kpiAndTableData, currentPage, itemsPerPage]);

  // Navigation handlers
  const handleNavigateToSystem = (systemId) => {
    setActiveMainSection(systemId);
    setCurrentView('system');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    // Reset any filters when going back to landing
    setSelectedMonth("All Months");
    setSelectedCategory("All Categories");
    setActiveElectricitySubSection('Dashboard');
  };

  // Gemini API Call Function
  const handleAiAnalysis = async () => {
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiAnalysisResult("");
    // AI analysis functionality placeholder
    setAiAnalysisResult("AI analysis requires API integration. Connect your preferred AI service to enable intelligent consumption insights.");
    setIsAiLoading(false);
  };

  // Data for Performance Page: Consumption by Category
  const consumptionByCategoryPerformance = useMemo(() => {
    const dataToUse = kpiAndTableData;
    const categoryTotals = {};
    dataToUse.forEach(item => {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.totalConsumption;
    });
    return Object.entries(categoryTotals)
        .map(([name, value]) => ({ name, consumption: parseFloat(value.toFixed(2)) }))
        .sort((a, b) => b.consumption - a.consumption);
  }, [kpiAndTableData]);

  // Data for Analytics Page: Consumption by Zone
  const consumptionByZoneAnalytics = useMemo(() => {
    const dataToUse = kpiAndTableData;
    const zoneTotals = {};
    dataToUse.forEach(item => {
        zoneTotals[item.zone] = (zoneTotals[item.zone] || 0) + item.totalConsumption;
    });
    return Object.entries(zoneTotals)
        .map(([name, value]) => ({ name, consumption: parseFloat(value.toFixed(2)) }))
        .sort((a, b) => b.consumption - a.consumption);
  }, [kpiAndTableData]);

  // Data for Unit Details Page
  const selectedUnitData = useMemo(() => {
    if (!selectedUnitId) return null;
    const unit = initialElectricityData.find(u => u.id.toString() === selectedUnitId);
    if (!unit) return null;

    const displayConsumption = selectedMonth === "All Months" 
        ? unit.totalConsumption 
        : (unit.consumption[selectedMonth] || 0);

    return {
        ...unit,
        displayConsumption: displayConsumption,
        monthlyBreakdown: availableMonths.map(m => ({
            month: m,
            consumption: unit.consumption[m] || 0
        }))
    };
  }, [selectedUnitId, selectedMonth]);

  const renderElectricitySystemContent = () => {
    switch (activeElectricitySubSection) {
        case 'Dashboard':
            return (
                <>
                    <div className="mb-6"> <button onClick={handleAiAnalysis} className="flex items-center justify-center space-x-2 text-white py-2.5 px-5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all w-full sm:w-auto" style={{ backgroundColor: PRIMARY_COLOR }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR_DARK} onMouseOut={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR} disabled={isAiLoading}> <Sparkles size={18} /> <span>{isAiLoading ? 'Analyzing...' : '✨ Analyze Consumption with AI'}</span> </button> </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SummaryCard title="Total Consumption" value={totalConsumptionKWh.toLocaleString(undefined, {maximumFractionDigits:0})} unit="kWh" icon={Zap} trend={selectedMonth === "All Months" ? "Overall" : `For ${selectedMonth}`} trendColor={"text-slate-500 font-medium"} iconBgColor={PRIMARY_COLOR} />
                        <SummaryCard title="Total Est. Cost" value={totalCostOMR.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} unit="OMR" icon={DollarSign} trend="Based on selection" trendColor="text-slate-500 font-medium" iconBgColor="#84CC16" />
                        <SummaryCard title="Avg. Consumption/Unit" value={averageConsumptionPerUnit.toLocaleString(undefined, {maximumFractionDigits:0})} unit="kWh" icon={BarChart2} trend={selectedMonth === "All Months" ? "Overall" : `For ${selectedMonth}`} trendColor={"text-slate-500 font-medium"} iconBgColor="#F59E0B" />
                        <SummaryCard title="Active Meters" value={activeMeters} unit="units" icon={Users2} trend="In selection" trendColor="text-slate-500 font-medium" iconBgColor="#10B981" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3"> <ChartWrapper title="Consumption Trend (All Months)" subtitle={`For category: ${selectedCategory}`}> <ResponsiveContainer width="100%" height="100%"> <LineChart data={monthlyTrendForAllMonths} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}> <defs> <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1"> <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.8}/> <stop offset="95%" stopColor={PRIMARY_COLOR} stopOpacity={0}/> </linearGradient> </defs> <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /> <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} /> <YAxis tick={{ fontSize: 12, fill: '#64748b' }} /> <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} itemStyle={{color: '#334155'}} labelStyle={{color: '#0f172a', fontWeight: 'bold'}}/> <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/> <Area type="monotone" dataKey="total" stroke={PRIMARY_COLOR} fillOpacity={1} fill="url(#colorTotal)" /> <Line type="monotone" dataKey="total" stroke={PRIMARY_COLOR} strokeWidth={3} activeDot={{ r: 7, strokeWidth: 2, fill: PRIMARY_COLOR }} dot={{r:4, fill: PRIMARY_COLOR}} name="Total kWh" /> </LineChart> </ResponsiveContainer> </ChartWrapper> </div>
                        <div className="lg:col-span-2"> <ChartWrapper title="Consumption by Type" subtitle={`For ${selectedMonth}`}> <ResponsiveContainer width="100%" height="100%"> <PieChart> <Pie data={consumptionByTypeChartData} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={60} outerRadius={90} fill="#8884d8" paddingAngle={2} cornerRadius={5}> {consumptionByTypeChartData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="focus:outline-none hover:opacity-80 transition-opacity" stroke="none"/> ))} <Label value={`${totalForTypeChartLabel.toLocaleString(undefined, {maximumFractionDigits:0})}`} position="centerBottom" dy={-5} className="text-2xl font-bold fill-slate-700"/> <Label value="Total kWh" position="centerTop" dy={10} className="text-xs fill-slate-500"/> </Pie> <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}}/> <Legend content={<DonutLegend data={consumptionByTypeChartData}/>} verticalAlign="bottom" wrapperStyle={{paddingTop: '15px'}}/> </PieChart> </ResponsiveContainer> </ChartWrapper> </div>
                    </div>
                    <div className="grid grid-cols-1"> <ChartWrapper title="Top 7 Consumers" subtitle={`For ${selectedMonth}`}> <ResponsiveContainer width="100%" height="100%"> <BarChart data={topConsumersChartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}> <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false}/> <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} /> <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155', width:95 }} interval={0} width={100} /> <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} itemStyle={{color: PIE_COLORS[2]}} labelStyle={{color: '#0f172a', fontWeight: 'bold'}}/> <Bar dataKey="consumption" fill={PIE_COLORS[2]} name="Total kWh" barSize={18} radius={[0, 5, 5, 0]}/> </BarChart> </ResponsiveContainer> </ChartWrapper> </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5"> <h3 className="text-xl font-semibold text-slate-700 mb-2 sm:mb-0">Detailed Consumption Data ({selectedMonth})</h3> <span className="text-sm text-slate-500">{kpiAndTableData.length} records found</span> </div>
                        <div className="overflow-x-auto"> <table className="min-w-full divide-y divide-slate-200 text-sm"> <thead className="bg-slate-100"> <tr> {['SL No.', 'Unit Name', 'Category', 'Meter No.', selectedMonth === "All Months" ? "Total kWh (All Months)" : `${selectedMonth} kWh`, ...(selectedMonth === "All Months" ? availableMonths : [])].map(header => ( <th key={header} scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap"> {header} </th> ))} </tr> </thead> <tbody className="bg-white divide-y divide-slate-200"> {paginatedTableData.length > 0 ? paginatedTableData.map((item) => ( <tr key={item.id} className="hover:bg-slate-50/50 transition-colors"> <td className="px-4 py-3 whitespace-nowrap text-slate-500">{item.slNo}</td> <td className="px-4 py-3 whitespace-nowrap font-semibold" style={{color: PRIMARY_COLOR_DARK}}>{item.unitName}</td> <td className="px-4 py-3 whitespace-nowrap text-slate-600">{item.category}</td> <td className="px-4 py-3 whitespace-nowrap text-slate-600">{item.meterAccountNo}</td> <td className="px-4 py-3 whitespace-nowrap text-slate-800 font-bold text-right tabular-nums"> {item.totalConsumption.toLocaleString()} </td> {selectedMonth === "All Months" && availableMonths.map(month => ( <td key={month} className="px-4 py-3 whitespace-nowrap text-slate-700 text-right tabular-nums">{item.consumption[month].toLocaleString()}</td> ))} </tr> )) : ( <tr> <td colSpan={selectedMonth === "All Months" ? 5 + availableMonths.length : 5} className="text-center py-10 text-slate-500">No data matches your current filters.</td> </tr> )} </tbody> </table> </div>
                        {kpiAndTableData.length > 0 && ( <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm"> <span className="text-slate-600 mb-2 sm:mb-0"> Showing <span className="font-semibold text-slate-700">{((currentPage - 1) * itemsPerPage) + 1}</span>- <span className="font-semibold text-slate-700">{Math.min(currentPage * itemsPerPage, kpiAndTableData.length)}</span> of <span className="font-semibold text-slate-700">{kpiAndTableData.length}</span> units </span> <div className="space-x-1.5"> <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3.5 py-1.5 border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700">Previous</button> <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3.5 py-1.5 border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700">Next</button> </div> </div> )}
                    </div>
                </>
            );
        case 'Performance': 
            return (
                <div className="space-y-6">
                    <ChartWrapper title="Overall Consumption Trend (All Months)" subtitle={`Selected Category: ${selectedCategory}`}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyTrendForAllMonths} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <defs><linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.7}/><stop offset="95%" stopColor={PRIMARY_COLOR} stopOpacity={0.1}/></linearGradient></defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip /> <Legend />
                                <Area type="monotone" dataKey="total" stroke={PRIMARY_COLOR_DARK} fill="url(#perfGrad)" name="Total kWh" />
                                <Line type="monotone" dataKey="total" stroke={PRIMARY_COLOR_DARK} strokeWidth={2} dot={false} name="Total kWh" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartWrapper>
                    <ChartWrapper title="Consumption by Category" subtitle={`For ${selectedMonth}`}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={consumptionByCategoryPerformance} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-35} textAnchor="end" height={70} interval={0} tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} /> <Tooltip /> <Legend />
                                <Bar dataKey="consumption" name="kWh" radius={[5, 5, 0, 0]}>
                                    {consumptionByCategoryPerformance.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} /> ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartWrapper>
                </div>
            );
        case 'Analytics': 
            return (
                 <div className="space-y-6">
                    <ChartWrapper title="Consumption by Zone" subtitle={`Category: ${selectedCategory} | Month: ${selectedMonth}`}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={consumptionByZoneAnalytics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 10 }}/> <Tooltip /> <Legend />
                                <Bar dataKey="consumption" name="kWh" fill={PRIMARY_COLOR_LIGHT} radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartWrapper>
                    <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                      <Activity size={48} className="mx-auto mb-4" style={{ color: PRIMARY_COLOR_LIGHT }} />
                      <h3 className="text-xl font-semibold text-slate-700 mb-2">More Advanced Analytics</h3>
                      <p className="text-slate-500">
                        Additional analytics features will be implemented here.
                        This will include predictive analytics, trend forecasting, and comparative analysis.
                      </p>
                    </div>
                 </div>
            );
        case 'UnitDetails':
             return (
                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <StyledSelect
                            id="unitDetailSelect"
                            label="Select Unit for Details"
                            value={selectedUnitId}
                            onChange={(e) => setSelectedUnitId(e.target.value)}
                            options={distinctUnitsForDropdown}
                            icon={Building}
                        />
                    </div>
                    {selectedUnitData ? (
                        <>
                            <SummaryCard 
                                title={selectedUnitData.unitName}
                                value={selectedUnitData.displayConsumption.toLocaleString(undefined, {maximumFractionDigits:0})}
                                unit="kWh"
                                icon={Zap}
                                trend={`Meter: ${selectedUnitData.meterAccountNo} | Category: ${selectedUnitData.category}`}
                                trendColor="text-slate-500"
                                iconBgColor={PRIMARY_COLOR}
                            />
                            <ChartWrapper title={`Monthly Consumption for ${selectedUnitData.unitName}`} subtitle="All available months">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={selectedUnitData.monthlyBreakdown} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" tickFormatter={(tick) => tick.replace('-24','').replace('-25','')} />
                                        <YAxis /> <Tooltip /> <Legend />
                                        <Bar dataKey="consumption" name="kWh" fill={PRIMARY_COLOR_LIGHT} radius={[3,3,0,0]}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartWrapper>
                        </>
                    ) : <p className="text-center text-slate-500">Please select a unit to view its details.</p>}
                </div>
            );
        default: return <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                      <Columns size={48} className="mx-auto mb-4" style={{ color: PRIMARY_COLOR_LIGHT }} />
                      <h3 className="text-xl font-semibold text-slate-700 mb-2">Sub-section Not Found</h3>
                      <p className="text-slate-500">The requested subsection could not be found.</p>
                    </div>;
    }
  };

  const renderMainContent = () => {
    switch(activeMainSection) {
        case 'ElectricitySystem':
            return (
                <>
                    <ElectricitySubNavBarStyled activeSubSection={activeElectricitySubSection} setActiveSubSection={setActiveElectricitySubSection} />
                    {activeElectricitySubSection === 'Dashboard' && (
                         <FilterBar 
                            months={availableMonths} 
                            categories={distinctCategories}
                            selectedMonth={selectedMonth}
                            setSelectedMonth={setSelectedMonth}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    )}
                    {renderElectricitySystemContent()}
                </>
            );
        case 'STPWaterAnalysis': return <STPPlantWaterAnalysis />;
        case 'ContractorTracker': return <ContractorTracker />;
        default: return <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                      <Columns size={48} className="mx-auto mb-4" style={{ color: PRIMARY_COLOR_LIGHT }} />
                      <h3 className="text-xl font-semibold text-slate-700 mb-2">Module Not Found</h3>
                      <p className="text-slate-500">The requested module could not be found.</p>
                    </div>;
    }
  }

  // Render landing page or system dashboard based on current view
  if (currentView === 'landing') {
    return <LandingPage onNavigateToSystem={handleNavigateToSystem} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100 font-inter" style={{'--selection-bg': PRIMARY_COLOR_LIGHT, '--selection-text': 'white'}}>
      <style>{`::selection { background-color: var(--selection-bg); color: var(--selection-text); }`}</style>
      <Sidebar 
        activeMainSection={activeMainSection} 
        setActiveMainSection={setActiveMainSection}
        onBackToLanding={handleBackToLanding}
      />
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <Header />
        <main className={`flex-1 p-6 md:p-8 space-y-6 md:space-y-8`}>
            {renderMainContent()}
        </main>
        <AiAnalysisModal 
            isOpen={isAiModalOpen} 
            onClose={() => setIsAiModalOpen(false)}
            analysisResult={aiAnalysisResult}
            isLoading={isAiLoading}
        />
      </div>
    </div>
  );
};

export default App;
