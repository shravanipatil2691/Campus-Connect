const mongoose = require('mongoose');
const dns = require('dns');

// DNS optimization for dual-stack IPv4/IPv6 networks and SRV record resolution
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    // Ignore fallback errors if custom DNS servers can't be set
}

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_connect';
        const conn = await mongoose.connect(uri, {
            tlsAllowInvalidCertificates: true
        });
        console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

