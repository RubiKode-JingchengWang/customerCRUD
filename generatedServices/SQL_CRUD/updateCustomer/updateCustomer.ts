
/*

Project name: SQL_CRUD
Service name: updateCustomer
Service version: 1.00

Service created on:
Service last changed on:

*/
import config from "src/config";
import * as winston from "winston";
import path from "path";
import { Logger } from "winston";
import { initLogger } from "src/util/util";
import { MySQLClient } from "src/util/mysql_db";
import * as mongoose from "mongoose";
import { MongoClient } from "src/util/mongo_db";

export class UpdateCustomer{
    logger: Logger;
    
    constructor(
        params: { [name: string]: any}
        ) {
        this.logger = initLogger('/tmp/generated-1645649990/generatedServices');
        if (params) {
            const customerInfoVariable = 'customerInfo' in params?params['customerInfo']:undefined
            const CustomerInfo = this.engine.getMongooseModel('CustomerInfo', 'com.mond.insurtech.crm.Account')
            this.engine.createVariable('@customerInfo', 'com.mond.insurtech.crm.Account', new CustomerInfo(), true)
        };
    };
    
    start() {
        this.logger.info("Executing service updateCustomer.");
        this.logger.info("Executing blockStart with comment: ''");
        this.engine.createVariable('$result','string','undefined');
        this.engine.outputs = ['$result'];
    };
    
    end() {
        this.logger.info("Completed service updateCustomer.");
        this.logger.info("Executing blockEnd with comment: ''");
        this.engine.logger.log('info','updateCustomer ending vars:');
        this.engine.logger.log('info',JSON.stringify(this.engine.processVariables));
        this.engine.saveVars('generatedServices/SQL_CRUD/updateCustomer/updateCustomer-RK-Response.json');
    };
    
    async initDatabaseConn() {
        // Initialize database connections
        this.logger.info("Executing blockInitDb with comment: 'Initialize database connections'");
        try {
            const sqlClient = new MySQLClient(config.mysql, this.engine.logger);
            await sqlClient.getConnection();
            this.engine.sourceDbClient = sqlClient;
            } catch(error) {
            this.engine.logger.error(error);
        };
        const mongoClient = new MongoClient(config.mongodb);
        await mongoClient.getConnection();
        this.engine.mongoClient = mongoClient;
    };
    
    async undefined() {
        // Close database connections
        this.logger.info("Executing blockCloseDb with comment: 'Close database connections'");
        try {
            await this.engine.sourceDbClient.closeConn();
            } catch(error) {
            this.engine.logger.error(error);
        };
        this.engine.mongoClient.close();
    };
    
    async runService() {
        await  this.initDatabaseConn();
        this.start();
        this.end();
        await  this.undefined();
        return this.engine.getOutputs()
    };
    
    
    }
    const service = new UpdateCustomer({});
service.runService();