class VPNService {
  constructor() {
    this.connections = new Map();
    this.servers = [
      {
        id: 'myanmar-1',
        name: 'Myanmar Server',
        country: 'MM',
        city: 'Yangon',
        ip: '203.81.64.1',
        load: 0.32,
        ping: 28,
        tier: 'premium',
        protocols: ['OpenVPN', 'WireGuard', 'IKEv2'],
        isSecure: true,
        supportsPortForwarding: true,
        bandwidthLimit: 1000 // Mbps
      },
      {
        id: 'singapore-1',
        name: 'Singapore Server',
        country: 'SG',
        city: 'Singapore',
        ip: '45.124.64.12',
        load: 0.45,
        ping: 62,
        tier: 'standard',
        protocols: ['OpenVPN', 'IKEv2'],
        isSecure: true,
        supportsPortForwarding: false,
        bandwidthLimit: 500 // Mbps
      },
      {
        id: 'japan-1',
        name: 'Japan Server',
        country: 'JP',
        city: 'Tokyo',
        ip: '210.140.10.50',
        load: 0.28,
        ping: 112,
        tier: 'premium',
        protocols: ['OpenVPN', 'WireGuard', 'L2TP'],
        isSecure: true,
        supportsPortForwarding: true,
        bandwidthLimit: 1000 // Mbps
      }
    ];

    this.userPreferences = {
      protocol: 'WireGuard',
      autoConnect: false,
      killSwitch: true,
      dnsProtection: true
    };

    this.startHealthMonitoring();
  }

  // Server Health Monitoring
  startHealthMonitoring() {
    this.healthInterval = setInterval(() => {
      this.updateServerStatus();
    }, 30000); // Update every 30 seconds
  }

  async updateServerStatus() {
    // In a real implementation, this would ping servers
    this.servers.forEach(server => {
      // Simulate random load changes
      server.load = Math.min(1, Math.max(0, server.load + (Math.random() * 0.1 - 0.05));
      
      // Simulate ping fluctuations
      if (Math.random() > 0.9) {
        // 10% chance of ping spike
        server.ping = server.ping * (1 + Math.random() * 0.5);
      } else {
        // Normal small fluctuation
        server.ping = server.ping * (0.95 + Math.random() * 0.1);
      }
      server.ping = Math.round(server.ping);
    });
  }

  // Connection Management
  async connect(serverId, protocol = this.userPreferences.protocol) {
    const server = this.getServer(serverId);
    if (!server) {
      throw new Error('Server not found');
    }

    if (!server.protocols.includes(protocol)) {
      throw new Error(`Protocol ${protocol} not supported on this server`);
    }

    if (this.getActiveConnection()) {
      throw new Error('Already connected to a VPN server');
    }

    const connectionId = `conn-${Date.now()}`;
    const connection = {
      id: connectionId,
      server,
      protocol,
      startTime: new Date(),
      stats: {
        bytesSent: 0,
        bytesReceived: 0,
        connectedDuration: 0
      },
      isActive: true
    };

    // Simulate connection process
    await this.simulateConnection(server, protocol);

    this.connections.set(connectionId, connection);
    return connection;
  }

  async disconnect(connectionId = null) {
    if (!connectionId) {
      const activeConn = this.getActiveConnection();
      connectionId = activeConn?.id;
    }

    if (!connectionId || !this.connections.has(connectionId)) {
      throw new Error('No active connection found');
    }

    const connection = this.connections.get(connectionId);
    connection.endTime = new Date();
    connection.isActive = false;

    // Simulate disconnection
    await new Promise(resolve => setTimeout(resolve, 500));

    this.connections.set(connectionId, connection);
    return connection;
  }

  async reconnect(connectionId = null) {
    const currentConn = connectionId 
      ? this.connections.get(connectionId)
      : this.getActiveConnection();

    if (!currentConn) {
      throw new Error('No connection to reconnect');
    }

    await this.disconnect(currentConn.id);
    return this.connect(currentConn.server.id, currentConn.protocol);
  }

  // Server Selection
  getOptimalServer() {
    // Consider ping, server load, and user preferences
    const availableServers = this.servers.filter(s => s.isSecure);
    
    return availableServers.reduce((best, current) => {
      const bestScore = best.ping * (1 + best.load);
      const currentScore = current.ping * (1 + current.load);
      return currentScore < bestScore ? current : best;
    });
  }

  getServer(serverId) {
    return this.servers.find(s => s.id === serverId);
  }

  getAllServers() {
    return [...this.servers]; // Return a copy
  }

  getServerByCountry(countryCode) {
    return this.servers.filter(s => s.country === countryCode);
  }

  // Connection Info
  getActiveConnection() {
    for (const [_, conn] of this.connections) {
      if (conn.isActive) return conn;
    }
    return null;
  }

  getConnectionStats(connectionId) {
    if (!this.connections.has(connectionId)) {
      throw new Error('Connection not found');
    }
    return this.connections.get(connectionId).stats;
  }

  // User Preferences
  setProtocol(protocol) {
    const validProtocols = ['OpenVPN', 'WireGuard', 'IKEv2', 'L2TP'];
    if (!validProtocols.includes(protocol)) {
      throw new Error('Invalid protocol');
    }
    this.userPreferences.protocol = protocol;
  }

  toggleKillSwitch() {
    this.userPreferences.killSwitch = !this.userPreferences.killSwitch;
    return this.userPreferences.killSwitch;
  }

  toggleAutoConnect() {
    this.userPreferences.autoConnect = !this.userPreferences.autoConnect;
    return this.userPreferences.autoConnect;
  }

  // Utility Methods
  async simulateConnection(server, protocol) {
    // Simulate different connection times based on protocol
    const protocolTimes = {
      'WireGuard': 800,
      'OpenVPN': 1500,
      'IKEv2': 1000,
      'L2TP': 2000
    };

    const baseTime = protocolTimes[protocol] || 1000;
    const loadFactor = 1 + server.load * 2; // Higher load = slower connection
    const totalTime = baseTime * loadFactor;

    // 10% chance of failure
    if (Math.random() < 0.1) {
      throw new Error('Connection failed due to network issues');
    }

    await new Promise(resolve => setTimeout(resolve, totalTime));
  }

  updateTrafficStats(connectionId, bytesSent, bytesReceived) {
    if (!this.connections.has(connectionId)) return;

    const connection = this.connections.get(connectionId);
    connection.stats.bytesSent += bytesSent;
    connection.stats.bytesReceived += bytesReceived;
    connection.stats.connectedDuration = (new Date() - connection.startTime) / 1000; // in seconds
  }

  // Cleanup
  stopService() {
    clearInterval(this.healthInterval);
    this.connections.clear();
  }
}

// Export singleton instance
const vpnService = new VPNService();
export default vpnService;
