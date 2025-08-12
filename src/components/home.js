import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import vpnService from '../services/vpnService';
import gameServerService from '../services/gameServerService';
import ServerStatusCard from '../components/ServerStatusCard';
import ConnectionGraph from '../components/ConnectionGraph';

const HomePage = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trafficData, setTrafficData] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState('WireGuard');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load initial data
        const vpnStatus = vpnService.getActiveConnection();
        const gameServers = gameServerService.getAllServers();
        
        setConnectionStatus(vpnStatus);
        setServers(gameServers);
        
        // Start live updates
        setupLiveUpdates();
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    const setupLiveUpdates = () => {
      const interval = setInterval(() => {
        const updatedStatus = vpnService.getActiveConnection();
        const updatedServers = gameServerService.getAllServers();
        
        setConnectionStatus(updatedStatus);
        setServers(updatedServers);
        
        // Update traffic data for graph
        if (updatedStatus) {
          setTrafficData(prev => [
            ...prev.slice(-9),
            {
              time: new Date().toLocaleTimeString(),
              upload: Math.floor(Math.random() * 10),
              download: Math.floor(Math.random() * 15)
            }
          ]);
        }
      }, 5000);

      return () => clearInterval(interval);
    };

    loadData();
  }, []);

  const handleConnect = async () => {
    try {
      setLoading(true);
      if (connectionStatus) {
        await vpnService.disconnect();
        setConnectionStatus(null);
      } else {
        const optimalServer = vpnService.getOptimalServer();
        const connection = await vpnService.connect(optimalServer.id, selectedProtocol);
        setConnectionStatus(connection);
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading server data...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h2>Game Server Dashboard</h2>
        <div className="protocol-selector">
          <label>VPN Protocol:</label>
          <select 
            value={selectedProtocol}
            onChange={(e) => setSelectedProtocol(e.target.value)}
            disabled={!!connectionStatus}
          >
            <option value="WireGuard">WireGuard</option>
            <option value="OpenVPN">OpenVPN</option>
            <option value="IKEv2">IKEv2</option>
          </select>
        </div>
      </div>

      <div className="status-overview">
        <div className="connection-status-card">
          <h3>VPN Connection</h3>
          <div className="connection-visual">
            <CircularProgressbar
              value={connectionStatus ? 100 : 0}
              text={connectionStatus ? 'Connected' : 'Disconnected'}
              styles={buildStyles({
                pathColor: connectionStatus ? '#4CAF50' : '#F44336',
                textColor: connectionStatus ? '#4CAF50' : '#F44336',
              })}
            />
          </div>
          <button 
            onClick={handleConnect}
            className={`connect-btn ${connectionStatus ? 'disconnect' : 'connect'}`}
            disabled={loading}
          >
            {connectionStatus ? 'Disconnect' : 'Connect to VPN'}
          </button>
          {connectionStatus && (
            <div className="connection-details">
              <p><strong>Server:</strong> {connectionStatus.server.name}</p>
              <p><strong>IP:</strong> {connectionStatus.server.ip}</p>
              <p><strong>Protocol:</strong> {connectionStatus.protocol}</p>
              <p><strong>Duration:</strong> {Math.floor(connectionStatus.stats.connectedDuration / 60)}m {Math.floor(connectionStatus.stats.connectedDuration % 60)}s</p>
            </div>
          )}
        </div>

        <div className="traffic-graph">
          <h3>Network Traffic</h3>
          <ConnectionGraph data={trafficData} />
        </div>
      </div>

      <div className="game-servers-section">
        <h3>Game Server Status</h3>
        <div className="server-grid">
          {servers.map(server => (
            <ServerStatusCard 
              key={server.id}
              server={server}
              vpnConnected={!!connectionStatus}
            />
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <i className="icon-shield"></i>
            <span>Enable Kill Switch</span>
          </button>
          <button className="action-btn">
            <i className="icon-globe"></i>
            <span>Change Location</span>
          </button>
          <button className="action-btn">
            <i className="icon-settings"></i>
            <span>Advanced Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
