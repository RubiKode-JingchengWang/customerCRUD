
/*

Project name: SQL_CRUD
Service name: deleteCustomer
Service version: 1.00

Service created on:
Service last changed on:

*/
import { RubiKodeEngine } from "src/RubiKodeEngine";
import config from "src/config";
import * as winston from "winston";
import path from "path";
import { MySQLClient } from "src/util/mysql_db";

export class DeleteCustomer{engine: RubiKodeEngine;
    
    constructor(
        params: { [name: string]: any}, 
        engine?: RubiKodeEngine, 
        logger?: winston.Logger
        ) {
        if (engine) {
            this.engine = engine;
            this.engine.logger.log('info','Using existing engine in service deleteCustomer');
        }
        else {
            this.engine = new RubiKodeEngine(path.join(config.nodePath,'deleteCustomer'),logger);
            this.engine.logger.log('info','Creating new engine in service deleteCustomer');
        }
        if (params) {
            const firstNameVariable = 'firstName' in params?params['firstName']:undefined
            this.engine.createVariable('$firstName','string',firstNameVariable)
            const lastNameVariable = 'lastName' in params?params['lastName']:undefined
            this.engine.createVariable('$lastName','string',lastNameVariable)
        }
    };
    
    blockStart() {
        this.engine.logger.log("info","Executing service deleteCustomer.");
        this.engine.logger.log("info","Executing blockStart with comment: ''");
        ;
        this.engine.createVariable('$result','string','undefined');
        this.engine.outputs = ['$result'];
    };
    
    blockEnd() {
        this.engine.logger.log("info","Completed service deleteCustomer.");
        this.engine.logger.log("info","Executing blockEnd with comment: ''");
        this.engine.logger.log('info','deleteCustomer ending vars:');
        this.engine.logger.log('info',JSON.stringify(this.engine.processVariables));
        this.engine.saveVars('generatedServices/SQL_CRUD/deleteCustomer/deleteCustomer-RK-Response.json');
    };
    
    async block500() {
        // if first name does not exist
        this.engine.logger.log("info","Executing block500 with comment: 'if first name does not exist'");
        this.engine.logger.log("info","Executing if-else block with condition 'firstName == null'");
        const firstName = this.engine.getVariable('$firstName');
        if (firstName == null) {
            this.engine.logger.log("info","Executing true block of if-else");
            this.blockN1();
            this.blockEnd();
        }
        else {
            this.engine.logger.log("info","Executing false block of if-else");
            await this.blockN5();
        };
    };
    
    blockN1() {
        // Set
        this.engine.logger.log("info","Executing blockN1 with comment: 'Set'");
        this.engine.logger.log("info","In set operator, target '$result' default value 'First name is required'");
        this.engine.updateVariable('$result',`First name is required`);
    };
    
    async blockN5() {
        // If last name does not exist
        this.engine.logger.log("info","Executing blockN5 with comment: 'If last name does not exist'");
        this.engine.logger.log("info","Executing if-else block with condition 'lastName == null'");
        const lastName = this.engine.getVariable('$lastName');
        if (lastName == null) {
            this.engine.logger.log("info","Executing true block of if-else");
            this.blockN6();
        }
        else {
            this.engine.logger.log("info","Executing false block of if-else");
            await this.blockN7();
            this.blockN8();
        };
    };
    
    blockN6() {
        // Set
        this.engine.logger.log("info","Executing blockN6 with comment: 'Set'");
        this.engine.logger.log("info","In set operator, target '$result' default value 'Last name is required'");
        this.engine.updateVariable('$result',`Last name is required`);
    };
    
    async blockN7() {
        // Execute delete customer Query
        this.engine.logger.log("info","Executing blockN7 with comment: 'Execute delete customer Query'");
        this.engine.logger.log("info","Query 'Delete INS_CUSTOMER2' belongs to source document, getting the DB connection from source.");
        const queryStr = 'DELETE FROM INS_CUSTOMER2 WHERE INS_CUSTOMER2.CUSTOMERID=?';
        const i = this.engine.n_loops>0?`[${this.engine.getCurrIndex('source') - 1}]`:'';
        const replacements = [
        	this.engine.getVariable('$firstName[1]'),
        	this.engine.getVariable('$lastName[2]')
        ];
        try {
            const results = await this.engine.sourceDbClient.query(queryStr, 'DELETE', replacements);
            this.engine.queryResults['Delete INS_CUSTOMER2'] = results;
            } catch(error) {
            this.engine.logger.error(error);
            this.engine.updateVariable('$mondErrorLog',error)
        };
    };
    
    blockN8() {
        // If error
        this.engine.logger.log("info","Executing blockN8 with comment: 'If error'");
        this.engine.logger.log("info","Executing if-else block with condition 'mondErrorLog != null'");
        const mondErrorLog = this.engine.getVariable('$mondErrorLog');
        if (mondErrorLog != null) {
            this.engine.logger.log("info","Executing true block of if-else");
            this.blockN9();
        }
        else {
            this.engine.logger.log("info","Executing false block of if-else");
            this.blockN10();
        };
    };
    
    blockN9() {
        // Set
        this.engine.logger.log("info","Executing blockN9 with comment: 'Set'");
        this.engine.logger.log("info","In set operator, target '$result' default value 'Could not delete customer'");
        this.engine.updateVariable('$result',`Could not delete customer`);
    };
    
    blockN10() {
        // Set
        this.engine.logger.log("info","Executing blockN10 with comment: 'Set'");
        this.engine.logger.log("info","In set operator, target '$result' default value 'Customer deleted'");
        this.engine.updateVariable('$result',`Customer deleted`);
    };
    
    async blockInitDb() {
        // Initialize database connections
        this.engine.logger.log("info","Executing blockInitDb with comment: 'Initialize database connections'");
        try {
            const sqlClient = new MySQLClient(config.mysql, this.engine.logger);
            await sqlClient.getConnection();
            this.engine.sourceDbClient = sqlClient;
            } catch(error) {
            this.engine.logger.error(error);
        };
    };
    
    async blockCloseDb() {
        // Close database connections
        this.engine.logger.log("info","Executing blockCloseDb with comment: 'Close database connections'");
        try {
            await this.engine.sourceDbClient.closeConn();
            } catch(error) {
            this.engine.logger.error(error);
        };
    };
    
    async executeFunction() {
        await this.blockInitDb();
        this.blockStart();
        await this.block500();
        await this.blockCloseDb();
        return this.engine.getOutputs()
    };
    
    
    }
    const service = new DeleteCustomer({});
service.executeFunction();