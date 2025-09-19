import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Info, MapPin, CheckCircle } from "lucide-react";

interface CountryOption {
  id: string;
  name: string;
  flag: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
  features: string[];
  svgPath: string;
  position: {
    x: number;
    y: number;
  };
}

const countries: CountryOption[] = [
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    colors: {
      primary: "#22c55e",
      secondary: "#16a34a", 
      accent: "#facc15"
    },
    description: "Comprehensive medical examinations for Australian visa applications",
    features: ["Panel Physician Services", "Health Assessments", "X-Ray & Laboratory Tests", "Fast Processing"],
    svgPath: "M50,80 L80,60 L120,55 L160,60 L200,70 L240,85 L280,105 L300,130 L310,160 L305,190 L295,220 L275,240 L245,250 L210,255 L175,250 L140,240 L110,225 L85,200 L70,170 L60,140 L55,110 Z M260,180 L275,175 L285,185 L280,200 L265,205 L255,195 L260,180 Z",
    position: { x: 100, y: 150 }
  },
  {
    id: "newzealand", 
    name: "New Zealand",
    flag: "🇳🇿",
    colors: {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      accent: "#3b82f6"
    },
    description: "Complete medical services for New Zealand visa requirements",
    features: ["Immigration Medical Exams", "Specialized Testing", "Health Certificates", "Expert Consultation"],
    svgPath: "M30,50 L40,45 L50,48 L55,55 L50,65 L40,70 L30,65 L25,55 Z M20,95 L35,90 L50,95 L65,100 L70,110 L65,125 L50,130 L35,125 L20,120 L15,105 L20,95 Z",
    position: { x: 450, y: 200 }
  }
];

export default function CountrySelection() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent, countryId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedCountry(selectedCountry === countryId ? null : countryId);
    }
  };

  const selectedCountryData = countries.find(c => c.id === selectedCountry);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTrackBooking = () => {
    // This will trigger the track booking functionality from the Hero component
    const trackButton = document.querySelector('[data-testid="button-track-booking"]') as HTMLButtonElement;
    if (trackButton) {
      trackButton.click();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 via-brand-purple/5 to-brand-teal/5"></div>
      
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-purple rounded-3xl flex items-center justify-center shadow-xl">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-brand-black">Choose Your</span>
            <br />
            <span className="text-brand-orange">Medical Service</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select your destination country to access specialized medical examination services for your visa application
          </p>
        </div>

        {/* Interactive Country Maps */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden">
            <svg viewBox="0 0 600 400" className="w-full h-80">
              {/* Ocean background */}
              <rect width="600" height="400" fill="url(#oceanGradient)" />
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#bae6fd" />
                </linearGradient>
                {countries.map((country) => (
                  <linearGradient key={`gradient-${country.id}`} id={`gradient-${country.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={country.colors.primary} />
                    <stop offset="100%" stopColor={country.colors.accent} />
                  </linearGradient>
                ))}
              </defs>

              {/* Country shapes */}
              {countries.map((country) => (
                <g key={country.id} transform={`translate(${country.position.x}, ${country.position.y})`}>
                  <path
                    d={country.svgPath}
                    fill={selectedCountry === country.id || hoveredCountry === country.id 
                      ? `url(#gradient-${country.id})` 
                      : '#9ca3af'
                    }
                    stroke={selectedCountry === country.id 
                      ? country.colors.primary 
                      : hoveredCountry === country.id 
                        ? country.colors.primary 
                        : '#6b7280'
                    }
                    strokeWidth={selectedCountry === country.id ? "3" : hoveredCountry === country.id ? "2" : "1"}
                    className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg"
                    style={{
                      filter: selectedCountry === country.id 
                        ? `drop-shadow(0 10px 20px ${country.colors.primary}40)` 
                        : hoveredCountry === country.id 
                          ? `drop-shadow(0 5px 15px ${country.colors.primary}30)` 
                          : 'none',
                      transform: selectedCountry === country.id 
                        ? 'scale(1.1)' 
                        : hoveredCountry === country.id 
                          ? 'scale(1.05)' 
                          : 'scale(1)',
                      transformOrigin: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={() => setHoveredCountry(country.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => setSelectedCountry(selectedCountry === country.id ? null : country.id)}
                    onKeyDown={(e) => handleKeyDown(e, country.id)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedCountry === country.id}
                    aria-label={`Select ${country.name} - medical services ${selectedCountry === country.id ? 'selected' : 'available'}`}
                    data-testid={`button-select-country-${country.id}`}
                  />
                  
                  {/* Country labels */}
                  <text
                    x="150"
                    y="40"
                    textAnchor="middle"
                    className="text-lg font-semibold pointer-events-none"
                    fill={selectedCountry === country.id || hoveredCountry === country.id 
                      ? country.colors.primary 
                      : '#374151'
                    }
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {country.flag} {country.name}
                  </text>
                  
                  {/* Selection indicator */}
                  {selectedCountry === country.id && (
                    <circle
                      cx="200"
                      cy="30"
                      r="12"
                      fill={country.colors.primary}
                      className="animate-pulse"
                    >
                      <animate
                        attributeName="r"
                        values="8;16;8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              ))}
            </svg>
            
            {/* Map legend */}
            <div className="mt-6 flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded mr-2"></div>
                <span>Available Services</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                <span>Hover to preview</span>
              </div>
            </div>
          </div>
          
          {/* Country Info Cards - Show below map when hovered */}
          {(hoveredCountry || selectedCountry) && (
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {countries
                .filter(country => 
                  country.id === hoveredCountry || 
                  (country.id === selectedCountry && !hoveredCountry)
                )
                .map((country) => (
                  <div
                    key={country.id}
                    className="glass-effect p-6 rounded-2xl border transition-all duration-300"
                    style={{ borderColor: country.colors.primary + '30' }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{country.flag}</span>
                      <h3 
                        className="text-2xl font-bold"
                        style={{ color: country.colors.primary }}
                      >
                        {country.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{country.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {country.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle 
                            className="w-3 h-3 mr-2 flex-shrink-0"
                            style={{ color: country.colors.primary }}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>

        {/* Action Buttons - Show when country is selected */}
        {selectedCountryData && (
          <div className="max-w-2xl mx-auto">
            <div 
              className="glass-effect p-8 rounded-3xl border-2 shadow-2xl"
              style={{ borderColor: selectedCountryData.colors.primary + '30' }}
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl mr-3">{selectedCountryData.flag}</span>
                  <h3 
                    className="text-2xl font-bold"
                    style={{ color: selectedCountryData.colors.primary }}
                  >
                    {selectedCountryData.name} Medical Services
                  </h3>
                </div>
                <p className="text-gray-600">
                  Ready to proceed with your {selectedCountryData.name.toLowerCase()} visa medical examination?
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="lg"
                  className="flex-1 text-white font-semibold text-lg py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: selectedCountryData.colors.primary }}
                  data-testid={`button-schedule-examination-${selectedCountryData.id}`}
                >
                  <CalendarCheck className="mr-3 h-6 w-6" />
                  Schedule Examination
                </Button>
                
                <Button
                  onClick={handleTrackBooking}
                  variant="outline"
                  size="lg"
                  className="flex-1 font-semibold text-lg py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg border-2"
                  style={{ 
                    borderColor: selectedCountryData.colors.primary,
                    color: selectedCountryData.colors.primary,
                  }}
                  data-testid={`button-track-booking-${selectedCountryData.id}`}
                >
                  <Info className="mr-3 h-6 w-6" />
                  Track My Booking
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Call to action when no country selected */}
        {!selectedCountry && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <MapPin className="w-5 h-5 text-brand-orange mr-2" />
              <p className="text-gray-600 font-medium">
                Select a country above to see available medical services
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}