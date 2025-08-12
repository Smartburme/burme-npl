import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import vpnService from '../services/vpnService';
import ServerLocationCard from '../components/ServerLocationCard';
import PingTest from '../components/PingTest';

// Fix for leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationPage = () => {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [pingResults, setPingResults] = useState({});
  const [mapCenter, setMapCenter] = useState([16.8409, 96.1735]); // Default to Yangon

  useEffect(() => {
    const loadServers = async () => {
      const availableServers = vpnService.getAllServers();
      setServers(availableServers);
      
      // Initialize ping results
      const initialPingResults = {};
      availableServers.forEach(server => {
        initialPingResults[server.id] = server.ping;
      });
      setPingResults(initialPingResults);
    };

    loadServers();
  }, []);

  const handleServerSelect = (server) => {
    setSelectedServer(server);
    setMapCenter([server.location.lat, server.location.lng]);
  };

  const handleConnect = async () => {
    if (!selectedServer) return;
    
    try {
      const connection = await vpnService.connect(selectedServer.id);
      alert(`Successfully connected to ${selectedServer.name}`);
    } catch (error) {
      alert(`Connection failed: ${error.message}`);
    }
  };

  const updatePingResult = (serverId, ping) => {
    setPingResults(prev => ({
      ...prev,
      [serverId]: ping
    }));
  };

  const RecenterMap = ({ center }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  };

  return (
    <div className="location-container">
      <div className="location-header">
        <h2>Server Locations</h2>
        <p>Select a server location for optimal gaming performance</p>
      </div>

      <div className="location-content">
        <div className="server-list-section">
          <div className="server-filter">
            <input 
              type="text" 
              placeholder="Search locations..." 
              className="search-input"
            />
            <div className="filter-tags">
              <span className="filter-tag active">All</span>
              <span className="filter-tag">Low Ping</span>
              <span className="filter-tag">Premium</span>
              <span className="filter-tag">Standard</span>
            </div>
          </div>

          <div className="server-cards">
            {servers.map(server => (
              <ServerLocationCard
                key={server.id}
                server={server}
                isSelected={selectedServer?.id === server.id}
                onSelect={handleServerSelect}
                ping={pingResults[server.id]}
              />
            ))}
          </div>
        </div>

        <div className="map-section">
          <div className="map-container">
            <MapContainer 
              center={mapCenter} 
              zoom={5} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {servers.map(server => (
                <Marker 
                  key={server.id} 
                  position={[server.location.lat, server.location.lng]}
                  eventHandlers={{
                    click: () => handleServerSelect(server),
                  }}
                >
                  <Popup>
                    <div>
                      <h4>{server.name}</h4>
                      <p>City: {server.city}</p>
                      <p>Ping: {pingResults[server.id] || server.ping}ms</p>
                      <p>Load: {Math.round(server.load * 100)}%</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <RecenterMap center={mapCenter} />
            </MapContainer>
          </div>

          {selectedServer && (
            <div className="server-details">
              <h3>{selectedServer.name}</h3>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span>{selectedServer.city}, {selectedServer.country}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">IP Address:</span>
                <span>{selectedServer.ip}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current Ping:</span>
                <span>{pingResults[selectedServer.id] || selectedServer.ping}ms</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Server Load:</span>
                <span>{Math.round(selectedServer.load * 100)}%</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Protocols:</span>
                <span>{selectedServer.protocols.join(', ')}</span>
              </div>

              <PingTest 
                server={selectedServer} 
                onPingComplete={updatePingResult}
              />

              <button 
                onClick={handleConnect}
                className="connect-button"
              >
                Connect to This Server
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
