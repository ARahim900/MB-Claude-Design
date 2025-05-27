import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Label, Area } from 'recharts';
import { Search, Bell, ChevronDown, SlidersHorizontal, Share2, LayoutDashboard, BarChart2, List, Zap, TrendingUp, Users2, MapPin, Power, DollarSign, Filter, Settings, FileText, Activity, Droplets, Combine, UserCheck, Columns, Sparkles, X, CalendarDays, Building } from 'lucide-react';

// OMR Conversion Rate
const OMR_PER_KWH = 0.025;

// Primary Color Scheme
const PRIMARY_COLOR = '#4E4456'; 
const PRIMARY_COLOR_LIGHT = '#7E708A'; 
const PRIMARY_COLOR_DARK = '#3B3241'; 

// Updated PIE_COLORS
const PIE_COLORS = ['#6A5ACD', '#FFA07A', '#20B2AA', '#FF69B4', '#9370DB', '#F08080', '#4682B4'];

const rawDataString = `SL:no.	Zone	Type 	Muscat Bay Number	Unit Number (Muncipality) 	Electrical Meter Account  No	November-24	December-24	January-25	February-25	March-25	April-25
1	Infrastructure	MC	MC	Pumping Station 01 	R52330	1629	1640	1903	2095	3032	3940
2	Infrastructure	MC	MC	Pumping Station 03	R52329	0	179	32.5	137.2	130.7	276.6
3	Infrastructure	MC	MC	Pumping Station 04 	R52327	919	921	245.1	869.5	646.1	984.9
4	Infrastructure	MC	MC	Pumping Station 05 	R52325	2599	1952	2069	2521	2601	3317
5	Infrastructure	MC	MC	Lifting Station 02	R52328	0	0	0	0	0	0
6	Infrastructure	MC	MC	Lifting Station 03	R52333	91	185	28	40	58	83
7	Infrastructure	MC	MC	Lifting Station 04	R52324	686	631	701	638	572	750.22
8	Infrastructure	MC	MC	Lifting Station 05	R52332	2413	2643	2873	3665	3069	4201.4
9	Infrastructure	MC	MC	Irrigation Tank 01	R52324 (R52326)	1432	1268	1689	2214	1718	1663
10	Infrastructure	MC	MC	Irrigation Tank 02	R52331	974	1026	983	1124	1110	1830
11	Infrastructure	MC	MC	Irrigation Tank 03	R52323	269	417	840	1009	845	1205
12	Infrastructure	MC	MC	Irrigation Tank 04	R53195	212	213	39.7	233.2	234.9	447.2
13	Infrastructure	MC	MC	Actuator DB 01 (Z8)	R53196	34	29	7.3	27.7	24.4	27.1
14	Infrastructure	MC	MC	Actuator DB 02	R51900	232	161	33	134	138.5	211
15	Infrastructure	MC	MC	Actuator DB 03	R51904	220	199	55.7	203.3	196	211.6
16	Infrastructure	MC	MC	Actuator DB 04	R51901	172	173	186	161	227	253
17	Infrastructure	MC	MC	Actuator DB 05	R51907	18	16	4.2	17.8	14	17.7
18	Infrastructure	MC	MC	Actuator DB 06	R51909	49	44	47	45	38	46.9
19	Infrastructure	MC	MC	Street Light FP 01 (Z8)	R53197	3593	3147	787	3228	2663	3230
20	Infrastructure	MC	MC	Street Light FP 02	R51906	2361	2258	633	2298	1812	2153
21	Infrastructure	MC	MC	Street Light FP 03	R51905	2060	1966	1868	1974	1562	1847
22	Infrastructure	MC	MC	Street Light FP 04	R51908	2299	1389	325	1406	1401	2412.9
23	Infrastructure	MC	MC	Street Light FP 05	R51902	1477	1121	449	2069.9	1870.1	3233
24	Infrastructure	MC	MC	Beachwell	R51903	24383	37236	38168	18422	40	27749
25	Infrastructure	MC	MC	Helipad	R52334	0	0	0	0	0	0
26	Central Park	MC	MC	Central Park	R54672	9604	19032	22819	19974	14190	13846
27	Ancilary	Building	MC	Guard House	R53651	1225	814	798	936	879	1467
28	Ancilary	Building	MC	Security Building	R53649	5702	5131	5559	5417	4504	5978
29	Ancilary	Building	MC	ROP Building	R53648	3581	2352	2090	2246	1939	3537
30	Zone 3	SBJ Common Meter	D 44	Apartment	R53705	1377	764	647	657	650	1306
31	Zone 3	SBJ Common Meter	D 45	Apartment	R53665	1252	841	670	556	608	1069
32	Zone 3	SBJ Common Meter	D 46	Apartment	R53700	1577	890	724	690	752	1292
33	Zone 3	SBJ Common Meter	D 47	Apartment	R53690	1774	1055	887	738	792	1545
34	Zone 3	SBJ Common Meter	D 48	Apartment	R53666	1046	785	826	676	683	1092
35	Zone 3	SBJ Common Meter	D 49	Apartment	R53715	1608	1068	860	837	818	984
36	Zone 3	SBJ Common Meter	D 50	Apartment	R53672	1102	789	765	785	707	1331
37	Zone 3	SBJ Common Meter	D 51	Apartment	R53657	1855	710	661	682	642	904
38	Zone 3	SBJ Common Meter	D 52	Apartment	R53699	1986	1208	979	896	952	1651
39	Zone 3	SBJ Common Meter	D53	Apartment	R54782	1764	968	693	732	760	1281
40	Zone 3	SBJ Common Meter	D54	Apartment	R54793	1777	834	681	559	531	1042
41	Zone 3	SBJ Common Meter	D55	Apartment	R54804	1828	1035	677	616	719	1417
42	Zone 3	SBJ Common Meter	D56	Apartment	R54815	1805	937	683	731	765	1536
43	Zone 3	SBJ Common Meter	D57	Apartment	R54826	2262	1332	990	846	795	1732
44	Zone 3	SBJ Common Meter	D58	Apartment	R54836	1534	778	593	535	594	1415
45	Zone 3	SBJ Common Meter	D59	Apartment	R54847	1634	998	628	582	697	1138
46	Zone 3	SBJ Common Meter	D60	Apartment	R54858	1275	705	674	612	679	1069
47	Zone 3	SBJ Common Meter	D61	Apartment	R54869	1734	977	767	800	719	1394
48	Zone 3	SBJ Common Meter	D 62	Apartment	R53717	1630	957	715	677	595	800
49	Zone 3	SBJ Common Meter	D 74	Apartment	R53675	1303	766	639	566	463	1079
50	Zone 3	SBJ Common Meter	D 75	Apartment	R53668	1169	702	475	508	554	912
51		SBJ Common Meter		Village Square	R56628	6229	3695	3304	3335	3383	4415
52	Zone 3	SBJ Common Meter	FP-17	Zone-3 landscape light	R54872	0	0	0	0	0	0
53	Zone 3	SBJ Common Meter	FP-21	Zone-3 landscape light	R54873	40	48	12.9	56.6	46.5	55
54	Zone 3	SBJ Common Meter	FP-22	Zone-3 landscape light	R54874	6	8	0	0	0	0
55		SBJ Common Meter		Bank muscat	MISSING_METER	148	72	59	98	88	163
56		SBJ Common Meter		CIF kitchen	MISSING_METER	16742	15554	16788	16154	14971	18446`.trim();

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
const Sidebar = ({ activeMainSection, setActiveMainSection }) => {
  const mainSections = [
    { name: 'Electricity System', icon: Zap, sectionId: 'ElectricitySystem' },
    { name: 'Water Analysis', icon: Droplets, sectionId: 'WaterAnalysis' },
    { name: 'STP Plant', icon: Combine, sectionId: 'STPPlant' },
    { name: 'Contractor Tracker', icon: UserCheck, sectionId: 'ContractorTracker' },
  ];

  return (
    <div className="w-64 text-slate-100 p-5 space-y-8 min-h-screen shadow-2xl print:hidden" style={{backgroundColor: PRIMARY_COLOR_DARK}}>
      <div className="text-3xl font-bold flex items-center space-x-3 text-white">
        <Power size={32} style={{ color: PRIMARY_COLOR_LIGHT }} className="animate-pulse"/> 
        <span>Muscat Bay OMS</span>
      </div>
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

// Placeholder Page Component
const PlaceholderPage = ({ title, icon }) => {
    const IconComponent = icon || Activity;
    return ( <div className="flex-1 p-8 space-y-8"> <div className="bg-white p-10 rounded-xl shadow-lg text-center"> <h2 className="text-3xl font-bold text-slate-700 mb-4">{title}</h2> <p className="text-slate-500">This section is under construction. Content for {title.toLowerCase()} will be available soon.</p> <IconComponent size={48} className="mx-auto mt-6 text-slate-400" style={{color: PRIMARY_COLOR_LIGHT}}/> </div> </div> );
};

// AI Analysis Modal
const AiAnalysisModal = ({ isOpen, onClose, analysisResult, isLoading }) => {
    if (!isOpen) return null;
    return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"> <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"> <div className="flex justify-between items-center mb-4"> <h3 className="text-xl font-semibold" style={{color: PRIMARY_COLOR}}>✨ AI Consumption Analysis</h3> <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200"> <X size={20} className="text-slate-600"/> </button> </div> {isLoading ? ( <div className="text-center py-8"> <Sparkles size={48} className="mx-auto animate-pulse" style={{color: PRIMARY_COLOR_LIGHT}} /> <p className="mt-2 text-slate-600">AI is analyzing data, please wait...</p> </div> ) : ( <div className="text-sm text-slate-700 space-y-3 whitespace-pre-wrap"> {analysisResult ? ( analysisResult.split('\n').map((line, index) => ( <p key={index}>{line.startsWith('* ') || line.startsWith('- ') ? `• ${line.substring(2)}` : line}</p> )) ) : ( <p>No analysis available or an error occurred.</p> )} </div> )} <div className="mt-6 text-right"> <button onClick={onClose} className="text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: PRIMARY_COLOR }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR_DARK} onMouseOut={(e) => e.currentTarget.style.backgroundColor = PRIMARY_COLOR}> Close </button> </div> </div> </div> );
};

// Main Application Component
const App = () => {
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
                    <PlaceholderPage title="More Advanced Analytics" icon={Activity} />
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
        default: return <PlaceholderPage title="Sub-section Not Found" />;
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
        case 'WaterAnalysis': return <PlaceholderPage title="Water Analysis Module" icon={Droplets} />;
        case 'STPPlant': return <PlaceholderPage title="STP Plant Monitoring" icon={Combine} />;
        case 'ContractorTracker': return <PlaceholderPage title="Contractor Tracker" icon={UserCheck} />;
        default: return <PlaceholderPage title="Module Not Found" icon={Columns} />;
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100 font-inter" style={{'--selection-bg': PRIMARY_COLOR_LIGHT, '--selection-text': 'white'}}>
      <style>{`::selection { background-color: var(--selection-bg); color: var(--selection-text); }`}</style>
      <Sidebar activeMainSection={activeMainSection} setActiveMainSection={setActiveMainSection} />
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