import React from 'react';
import { Droplets, Zap, Combine, Users2 } from 'lucide-react';

const LandingPage = ({ onNavigateToSystem }) => {
  const currentYear = new Date().getFullYear();

  const systems = [
    {
      id: 'water',
      title: 'Water Management',
      description: 'Monitor water supply, distribution, consumption, and analyze water loss across various zones.',
      icon: Droplets,
      color: 'blue',
      borderColor: 'border-l-blue-500',
      iconColor: 'text-blue-500',
      linkColor: 'text-blue-600 hover:text-blue-700',
      available: false
    },
    {
      id: 'electricity',
      title: 'Electricity System',
      description: 'Track power generation, distribution networks, consumption patterns, and system efficiency.',
      icon: Zap,
      color: 'amber',
      borderColor: 'border-l-amber-500',
      iconColor: 'text-amber-500',
      linkColor: 'text-amber-600 hover:text-amber-700',
      available: true
    },
    {
      id: 'stp',
      title: 'STP Plant',
      description: 'Oversee sewage treatment plant operations, effluent quality, and environmental compliance.',
      icon: Combine,
      color: 'emerald',
      borderColor: 'border-l-emerald-500',
      iconColor: 'text-emerald-500',
      linkColor: 'text-emerald-600 hover:text-emerald-700',
      available: false
    },
    {
      id: 'contractor',
      title: 'Contractor Tracker',
      description: 'Manage contractor activities, project timelines, performance metrics, and resource allocation.',
      icon: Users2,
      color: 'indigo',
      borderColor: 'border-l-indigo-500',
      iconColor: 'text-indigo-500',
      linkColor: 'text-indigo-600 hover:text-indigo-700',
      available: false
    }
  ];

  const handleSystemClick = (systemId) => {
    if (systemId === 'electricity') {
      onNavigateToSystem('ElectricitySystem');
    } else {
      // For other systems, you can add navigation logic here
      console.log(`Navigating to ${systemId} system (not yet implemented)`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-white shadow-lg" style={{ backgroundColor: '#4E4456' }}>
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-15 h-15 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-lg">
              MB
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Muscat Bay</h1>
              <p className="text-lg text-gray-200">Integrated Systems Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: '#4E4456' }}>
          Welcome to the Muscat Bay Operations Hub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {systems.map((system) => {
            const IconComponent = system.icon;
            return (
              <div
                key={system.id}
                onClick={() => handleSystemClick(system.id)}
                className={`bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col border-l-4 ${system.borderColor} ${
                  system.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
                }`}
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <IconComponent className={`h-10 w-10 ${system.iconColor} mr-3`} />
                    <h3 className="text-xl font-semibold" style={{ color: '#4E4456' }}>
                      {system.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{system.description}</p>
                  {!system.available && (
                    <div className="mt-3">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <span className={`font-medium transition-colors ${system.linkColor}`}>
                    {system.available ? (
                      <>Access {system.title} &rarr;</>
                    ) : (
                      `View ${system.title} (Coming Soon)`
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#4E4456' }}>
              Comprehensive Operations Management
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Muscat Bay Integrated Systems Dashboard provides real-time monitoring and analytics 
              across all critical infrastructure systems. Built with modern technology and designed for 
              efficiency, our platform ensures optimal performance and sustainable operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#4E4456' }}>4</div>
                <div className="text-sm text-gray-500">Integrated Systems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#4E4456' }}>24/7</div>
                <div className="text-sm text-gray-500">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#4E4456' }}>Real-time</div>
                <div className="text-sm text-gray-500">Analytics</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-white text-center py-6 mt-12" style={{ backgroundColor: '#4E4456' }}>
        <p>&copy; {currentYear} Muscat Bay Integrated Systems. All rights reserved.</p>
        <p className="text-sm text-gray-300 mt-1">Powered by MB Technology Division</p>
      </footer>
    </div>
  );
};

export default LandingPage;