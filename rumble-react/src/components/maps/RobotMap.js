import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

// Main map component that uses Google Maps
const MapComponent = ({ robots, sharedRobots, selectedRobot, onRobotSelect, center, zoom }) => {
  const ref = useRef();
  const [map, setMap] = useState();
  const markersRef = useRef([]);
  const infoWindowRef = useRef();

  // Memoize only the selected robot for display
  const robotToDisplay = useMemo(() => {
    if (!selectedRobot || !selectedRobot.location) return null;
    
    // Check if it's from regular robots or shared robots
    const allRobots = [...robots, ...sharedRobots];
    return allRobots.find(robot => robot.id === selectedRobot.id);
  }, [robots, sharedRobots, selectedRobot]);

  // Memoized map styles to prevent recreation
  const mapStyles = useMemo(() => [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2c3e50" }]
    }
  ], []);

  // Initialize map only once
  useEffect(() => {
    if (ref.current && !map && window.google && window.google.maps) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      });
      
      // Create single info window to reuse
      infoWindowRef.current = new window.google.maps.InfoWindow();
      
      setMap(newMap);
    }
  }, [ref, map, center, zoom, mapStyles]);

  // Optimized marker creation - show all robots or just selected robot
  const updateMarkers = useCallback(() => {
    if (!map) return;

    // Clear existing markers efficiently
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // If a robot is selected, show only that robot
    if (robotToDisplay && robotToDisplay.location) {
      const isShared = sharedRobots.some(sr => sr.id === robotToDisplay.id);
      
      // Create single marker for selected robot
      const getMarkerColor = () => {
        switch (robotToDisplay.status) {
          case 'active': return '#10B981';
          case 'charging': return '#F59E0B';
          case 'maintenance': return '#EF4444';
          default: return '#6B7280';
        }
      };

      const marker = new window.google.maps.Marker({
        position: { lat: robotToDisplay.location.lat, lng: robotToDisplay.location.lng },
        map,
        title: robotToDisplay.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: getMarkerColor(),
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3
        },
        optimized: true
      });

      // Click handler for the marker
      marker.addListener('click', () => {
        infoWindowRef.current.setContent(`
          <div style="padding: 10px; min-width: 200px; font-family: system-ui;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${robotToDisplay.name}</h3>
              ${isShared ? '<span style="background: #E0E7FF; color: #5B21B6; padding: 2px 8px; border-radius: 12px; font-size: 10px;">Shared</span>' : ''}
            </div>
            <div style="font-size: 14px; line-height: 1.4;">
              <div><strong>Status:</strong> ${robotToDisplay.status.charAt(0).toUpperCase() + robotToDisplay.status.slice(1)}</div>
              <div><strong>Battery:</strong> ${robotToDisplay.batteryLevel}%</div>
              ${robotToDisplay.trashCollected ? `<div><strong>Trash Collected:</strong> ${robotToDisplay.trashCollected} kg</div>` : ''}
              ${isShared && robotToDisplay.sharedBy ? `<div><strong>Shared by:</strong> ${robotToDisplay.sharedBy}</div>` : ''}
            </div>
          </div>
        `);
        infoWindowRef.current.open(map, marker);
      });

      markersRef.current = [marker];

      // Only center on robot if there's a location change
      if (robotToDisplay.location) {
        map.panTo({ lat: robotToDisplay.location.lat, lng: robotToDisplay.location.lng });
        if (map.getZoom() < 15) {
          map.setZoom(15);
        }
      }
    } else {
      // No robot selected - show all robots for context
      const allRobotsWithLocation = [...robots, ...sharedRobots].filter(robot => robot.location);
      
      allRobotsWithLocation.forEach(robot => {
        const isShared = sharedRobots.some(sr => sr.id === robot.id);
        
        const getMarkerColor = () => {
          switch (robot.status) {
            case 'active': return '#10B981';
            case 'charging': return '#F59E0B';
            case 'maintenance': return '#EF4444';
            default: return '#6B7280';
          }
        };

        const marker = new window.google.maps.Marker({
          position: { lat: robot.location.lat, lng: robot.location.lng },
          map,
          title: robot.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getMarkerColor(),
            fillOpacity: 0.7,
            strokeColor: '#ffffff',
            strokeWeight: 2
          },
          optimized: true
        });

        marker.addListener('click', () => {
          onRobotSelect(robot);
        });

        markersRef.current.push(marker);
      });
    }

  }, [map, robotToDisplay, robots, sharedRobots, onRobotSelect]);

  // Update markers when data changes
  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  return <div ref={ref} style={{ width: "100%", height: "100%", minHeight: "400px" }} />;
};

// Optimized wrapper component
const RobotMap = ({ 
  robots = [], 
  sharedRobots = [], 
  selectedRobot, 
  onRobotSelect,
  height = "400px",
  className = ""
}) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  // Memoize center calculation
  const mapCenter = useMemo(() => {
    const defaultCenter = { lat: 42.0308, lng: -93.6319 }; // Iowa State University
    
    // Use selected robot location if available
    if (selectedRobot && selectedRobot.location) {
      return {
        lat: selectedRobot.location.lat,
        lng: selectedRobot.location.lng
      };
    }
    
    // If no robot selected but robots exist, center on first robot with location
    const allRobots = [...robots, ...sharedRobots];
    const robotWithLocation = allRobots.find(robot => robot.location);
    if (robotWithLocation) {
      return {
        lat: robotWithLocation.location.lat,
        lng: robotWithLocation.location.lng
      };
    }
    
    return defaultCenter;
  }, [selectedRobot, robots, sharedRobots]);

  const render = useCallback((status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Loading Maps...</p>
            </div>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="w-full h-full bg-red-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-3">⚠️</div>
              <h3 className="text-sm font-semibold text-red-800 mb-1">Map Load Failed</h3>
              <p className="text-red-600 text-xs">Check API key and connection</p>
            </div>
          </div>
        );
      case Status.SUCCESS:
        return (
          <div className="relative w-full h-full">
            <MapComponent
              robots={robots}
              sharedRobots={sharedRobots}
              selectedRobot={selectedRobot}
              onRobotSelect={onRobotSelect}
              center={mapCenter}
              zoom={15}
            />
          </div>
        );
      default:
        return null;
    }
  }, [robots, sharedRobots, selectedRobot, onRobotSelect, mapCenter]);

  // Check API key
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <div className="w-full h-full bg-yellow-50 rounded-lg flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-3xl mb-2">🔑</div>
            <h3 className="text-sm font-bold text-yellow-800 mb-1">API Key Required</h3>
            <p className="text-yellow-700 text-xs">Add key to .env file</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Wrapper 
        apiKey={apiKey} 
        render={render}
        libraries={[]} // Don't load extra libraries
      />
    </div>
  );
};

export default React.memo(RobotMap);