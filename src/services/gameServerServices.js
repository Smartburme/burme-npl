class GameServerService {
    constructor() {
        this.initializeServers();
        this.preferredServer = 'local';
        this.connectionPool = new Map();
        this.serverStats = new Map();
        this.maintenanceSchedule = new Map();
        this.initializeMaintenanceSchedule();
        this.startServerMonitoring();
    }
    
    initializeServers() {
        this.servers = [
            { 
                id: 'local', 
                name: 'Local Game Server', 
                region: 'local', 
                ip: '192.168.1.100', 
                port: 25565,
                location: { lat: 16.8409, lng: 96.1735 }, // Yangon coordinates
                players: 124, 
                maxPlayers: 200, 
                status: 'online',
                gameTypes: ['FPS', 'Battle Royale', 'RPG'],
                ping: 12,
                lastUpdated: new Date()
            },
            { 
                id: 'asia', 
                name: 'Asia Game Server', 
                region: 'asia', 
                ip: '203.176.141.101', 
                port: 25565,
                location: { lat: 1.3521, lng: 103.8198 }, // Singapore coordinates
                players: 89, 
                maxPlayers: 200, 
                status: 'online',
                gameTypes: ['FPS', 'MOBA', 'Racing'],
                ping: 45,
                lastUpdated: new Date()
            },
            { 
                id: 'europe', 
                name: 'Europe Game Server', 
                region: 'europe', 
                ip: '185.143.223.42', 
                port: 25565,
                location: { lat: 51.5074, lng: 0.1278 }, // London coordinates
                players: 0, 
                maxPlayers: 200, 
                status: 'maintenance',
                gameTypes: ['FPS', 'Strategy', 'Simulation'],
                ping: null,
                lastUpdated: new Date()
            }
        ];
        
        // Initialize server statistics
        this.servers.forEach(server => {
            this.serverStats.set(server.id, {
                uptime: 0,
                connections: 0,
                avgPing: server.ping || 0,
                peakPlayers: server.players,
                downtime: 0
            });
        });
    }
    
    initializeMaintenanceSchedule() {
        // Set maintenance schedule (in a real app, this would come from an API)
        this.maintenanceSchedule.set('local', { 
            nextMaintenance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
            duration: 120 // minutes
        });
        
        this.maintenanceSchedule.set('asia', { 
            nextMaintenance: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            duration: 90 // minutes
        });
        
        this.maintenanceSchedule.set('europe', { 
            nextMaintenance: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
            duration: 180 // minutes
        });
    }
    
    startServerMonitoring() {
        // Simulate periodic server updates
        this.monitorInterval = setInterval(() => {
            this.updateServerStats();
            
            // Randomly adjust player counts for demo purposes
            this.servers.forEach(server => {
                if (server.status === 'online') {
                    const change = Math.floor(Math.random() * 10) - 3; // -3 to +6
                    server.players = Math.max(0, Math.min(server.maxPlayers, server.players + change));
                    
                    // Update peak players
                    const stats = this.serverStats.get(server.id);
                    if (server.players > stats.peakPlayers) {
                        stats.peakPlayers = server.players;
                    }
                    
                    // Small ping fluctuation
                    if (server.ping) {
                        server.ping += Math.floor(Math.random() * 10) - 5;
                        server.ping = Math.max(5, server.ping); // Minimum 5ms
                    }
                    
                    server.lastUpdated = new Date();
                }
            });
            
            // Check for maintenance
            this.checkMaintenance();
            
        }, 5000); // Update every 5 seconds
    }
    
    updateServerStats() {
        this.servers.forEach(server => {
            const stats = this.serverStats.get(server.id);
            
            if (server.status === 'online') {
                stats.uptime += 5; // 5 seconds
            } else {
                stats.downtime += 5;
            }
            
            // Update average ping
            if (server.ping) {
                stats.avgPing = (stats.avgPing * stats.connections + server.ping) / (stats.connections + 1);
            }
        });
    }
    
    checkMaintenance() {
        const now = new Date();
        
        this.maintenanceSchedule.forEach((schedule, serverId) => {
            const server = this.servers.find(s => s.id === serverId);
            
            if (server && now >= schedule.nextMaintenance && server.status !== 'maintenance') {
                // Start maintenance
                server.status = 'maintenance';
                server.players = 0;
                server.ping = null;
                server.lastUpdated = new Date();
                
                // Schedule end of maintenance
                setTimeout(() => {
                    server.status = 'online';
                    server.lastUpdated = new Date();
                    
                    // Schedule next maintenance
                    schedule.nextMaintenance = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                }, schedule.duration * 60 * 1000);
            }
        });
    }
    
    getAllServers() {
        return this.servers.map(server => ({
            ...server,
            maintenance: this.getMaintenanceInfo(server.id),
            stats: this.getServerStats(server.id)
        }));
    }
    
    getServer(serverId) {
        const server = this.servers.find(s => s.id === serverId);
        if (!server) return null;
        
        return {
            ...server,
            maintenance: this.getMaintenanceInfo(serverId),
            stats: this.getServerStats(serverId)
        };
    }
    
    getServerStatus(serverId) {
        const server = this.servers.find(s => s.id === serverId);
        return server ? server.status : 'unknown';
    }
    
    getServerStats(serverId) {
        return this.serverStats.get(serverId) || {};
    }
    
    getMaintenanceInfo(serverId) {
        const schedule = this.maintenanceSchedule.get(serverId);
        if (!schedule) return null;
        
        return {
            nextMaintenance: schedule.nextMaintenance,
            duration: schedule.duration,
            inProgress: this.getServerStatus(serverId) === 'maintenance'
        };
    }
    
    setPreferredServer(serverId) {
        if (this.servers.some(s => s.id === serverId)) {
            this.preferredServer = serverId;
            return true;
        }
        return false;
    }
    
    getPreferredServer() {
        return this.getServer(this.preferredServer);
    }
    
    async connectToGame(serverId, playerId) {
        const server = this.servers.find(s => s.id === serverId);
        if (!server) {
            throw new Error('Server not found');
        }
        
        if (server.status !== 'online') {
            throw new Error(`Server is ${server.status}`);
        }
        
        if (server.players >= server.maxPlayers) {
            throw new Error('Server is full');
        }
        
        // Check if player is already connected
        if (this.connectionPool.has(playerId)) {
            throw new Error('Player is already connected to a server');
        }
        
        // Simulate connection process with actual steps
        try {
            // Step 1: Handshake
            await this.simulateNetworkRequest(300);
            
            // Step 2: Authentication
            await this.simulateNetworkRequest(400);
            
            // Step 3: Session creation
            await this.simulateNetworkRequest(500);
            
            // Step 4: Final connection
            await this.simulateNetworkRequest(300);
            
            // Update server and stats
            server.players++;
            server.lastUpdated = new Date();
            
            const stats = this.serverStats.get(serverId);
            stats.connections++;
            
            // Add to connection pool
            this.connectionPool.set(playerId, {
                serverId,
                connectTime: new Date(),
                ping: server.ping
            });
            
            return {
                success: true,
                server: this.getServer(serverId),
                message: 'Connected to game server successfully',
                connectionId: `${serverId}-${Date.now()}`
            };
        } catch (error) {
            throw new Error(`Connection failed: ${error.message}`);
        }
    }
    
    async disconnectFromGame(playerId) {
        if (!this.connectionPool.has(playerId)) {
            throw new Error('Player is not connected to any server');
        }
        
        const connection = this.connectionPool.get(playerId);
        const server = this.servers.find(s => s.id === connection.serverId);
        
        try {
            // Simulate disconnection process
            await this.simulateNetworkRequest(200);
            
            // Update server
            if (server) {
                server.players = Math.max(0, server.players - 1);
                server.lastUpdated = new Date();
            }
            
            // Remove from connection pool
            this.connectionPool.delete(playerId);
            
            return {
                success: true,
                serverId: connection.serverId,
                duration: (new Date() - connection.connectTime) / 1000, // in seconds
                message: 'Disconnected successfully'
            };
        } catch (error) {
            throw new Error(`Disconnection failed: ${error.message}`);
        }
    }
    
    getPlayerConnection(playerId) {
        return this.connectionPool.get(playerId);
    }
    
    async transferPlayer(playerId, targetServerId) {
        const currentConnection = this.connectionPool.get(playerId);
        if (!currentConnection) {
            throw new Error('Player is not connected to any server');
        }
        
        if (currentConnection.serverId === targetServerId) {
            throw new Error('Player is already connected to this server');
        }
        
        // Disconnect from current server
        await this.disconnectFromGame(playerId);
        
        // Connect to new server
        return this.connectToGame(targetServerId, playerId);
    }
    
    async simulateNetworkRequest(delay) {
        // 10% chance of failure for simulation purposes
        if (Math.random() < 0.1) {
            throw new Error('Network error occurred');
        }
        
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    getServerLoad(serverId) {
        const server = this.servers.find(s => s.id === serverId);
        if (!server) return 0;
        
        return server.players / server.maxPlayers;
    }
    
    getOptimalServer(gameType, playerLocation) {
        // In a real implementation, this would consider:
        // - Game type compatibility
        // - Player location (lat/lng)
        // - Server load
        // - Ping
        
        const availableServers = this.servers.filter(server => 
            server.status === 'online' && 
            server.gameTypes.includes(gameType)
        );
        
        if (availableServers.length === 0) {
            return null;
        }
        
        // Simple selection based on lowest ping
        return availableServers.reduce((best, current) => 
            (current.ping < best.ping) ? current : best
        );
    }
    
    // Clean up when service is no longer needed
    stopMonitoring() {
        clearInterval(this.monitorInterval);
    }
}

// Export a singleton instance
const gameServerService = new GameServerService();
export default gameServerService;
