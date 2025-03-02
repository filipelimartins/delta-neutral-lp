//src/config/index.js

//Load environment variables from .env file if present
require('dotenv').config();

//Default configuration
const config ={
    //Blockchain settings
    BLOCKCHAIN: {
        RPC_URL: process.env.RPC_URL || "https://rpc.ankr.com/base",
        CHAIN_ID: parseInt(process.env.CHAIN_ID || "8453", 10), //base chain by default
    },

    //Uniswap settings
    UNISWAP: {
        NFPM_ADDRESS: process.env.NFPM_ADDRESS || "",
        POOL_ADDRESS: process.env.POOL_ADDRESS || "",
        POSITION_ID: process.env.POSITION_ID || "",
    },

    //Binance settings
    BINANCE: {
        API_KEY: process.env.BINANCE_API_KEY || "",
        API_SECRET: process.env.BINANCE_API_SECRET || "",
        TESTNET: process.env.BINANCE_TESTNET === 'true' || false,
    },

    TRADING: {
        UPDATE_INTERVAL: parseInt(process.env.UPDATE_INTERVAL || '10',10), //minutes
        REBALANCE_THRESHOLD: parseFloat(process.env.REBALANCE_THRESHOLD || '0.05'), //5% default
        MIN_TRADE_SIZE: parseFloat(process.env.MIN_TRADE_SIZE || '0.01'),
    },
};

//Validate essential configuration
function validateConfig() {
    const errors =[];

    if (!config.BLOCKCHAIN.RPC_URL){
        errors.push('Missing RPC_URL in configuration');        
    }
    if(!config.UNISWAP.POSITION_ID){
        errors.push('Missing POSITION_ID in configuration');
    }
    if(!config.UNISWAP.POOL_ADDRESS){
        errors.push('Missing POOL_ADDRESS in configuration');
    }

    //Check for binance settings if not in testmode
    if(!config.BINANCE_TESTNET){
        if(!config.BINANCE_API_KEY){
            errors.push('Missing BINANCE_API_KEY in configuration');
        }
        if(!config.BINANCE_API_SECRET){
            errors.push('Missing BINANCE_API_SECRET in configuration');
        }
    }

    return errors;
}

//Export configuration and validation function
module.exports = {
    config,
    validateConfig,
};