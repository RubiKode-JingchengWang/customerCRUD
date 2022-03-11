
/*

Project name: SQL_CRUD
Service name: fetchCustomer
Service version: 1.00

Service created on:
Service last changed on:

*/
import { RubiKodeEngine } from "src/RubiKodeEngine";
import config from "src/config";
import * as winston from "winston";
import path from "path";
import { MySQLClient } from "src/util/mysql_db";
import * as mongoose from "mongoose";
import { MongoClient } from "src/util/mongo_db";

export class FetchCustomer{engine: RubiKodeEngine;
    
    constructor(
        params: { [name: string]: any}, 
        engine?: RubiKodeEngine, 
        logger?: winston.Logger
        ) {
        if (engine) {
            this.engine = engine;
            this.engine.logger.log('info','Using existing engine in service fetchCustomer');
        }
        else {
            this.engine = new RubiKodeEngine(path.join(config.nodePath,'fetchCustomer'),logger);
            this.engine.logger.log('info','Creating new engine in service fetchCustomer');
        }
        if (params) {
            const customerNameVariable = 'customerName' in params?params['customerName']:undefined
            this.engine.createVariable('$customerName','string',customerNameVariable)
        }
    };
    
    blockStart() {
        this.engine.logger.log("info","Executing service fetchCustomer.");
        this.engine.logger.log("info","Executing blockStart with comment: ''");
        const comMondInsurtechCrmAccount = new mongoose.Schema({
        	mailingAddressType: 'String',
        	mailingAddressLine1: 'String',
        	mailingAddressLine2: 'String',
        	mailingCity: 'String',
        	mailingState: 'String',
        	mailingPostalCode: 'String',
        	mailingCountryCd: 'String',
        	billingAddressType: 'String',
        	billingAddressLine1: 'String',
        	billingAddressLine2: 'String',
        	billingCity: 'String',
        	billingState: 'String',
        	billingPostalCode: 'String',
        	billingCountryCd: 'String',
        	phoneTypeCd: 'String',
        	phoneUseCd: 'String',
        	homePhoneNumber: 'String',
        	donotContactIndicator: 'String',
        	emailAddress: 'String',
        	lastName: 'String',
        	firstName: 'String',
        	middleName: 'String',
        })
        const comMondInsurtechCrmAccountList = new mongoose.Schema({
        	accountList: [comMondInsurtechCrmAccount],
        })
        const mongooseSchemas = {
        	'com.mond.insurtech.crm.Account': comMondInsurtechCrmAccount,
        	'com.mond.insurtech.crm.AccountList': comMondInsurtechCrmAccountList,
        }
        const dataModel = new mongoose.Schema(mongooseSchemas)
        this.engine.mongooseSchemas = mongooseSchemas
        this.engine.dataModel = dataModel;
        const Account = this.engine.getMongooseModel('Account', 'com.mond.insurtech.crm.Account');
        this.engine.createVariable('@account', 'com.mond.insurtech.crm.Account', new Account(), true);
        this.engine.outputs = ['@account'];
    };
    
    blockEnd() {
        this.engine.logger.log("info","Completed service fetchCustomer.");
        this.engine.logger.log("info","Executing blockEnd with comment: ''");
        this.engine.logger.log('info','fetchCustomer ending vars:');
        this.engine.logger.log('info',JSON.stringify(this.engine.processVariables));
        this.engine.saveVars('generatedServices/SQL_CRUD/fetchCustomer/fetchCustomer-RK-Response.json');
    };
    
    async blockN1() {
        // Execute Query
        this.engine.logger.log("info","Executing blockN1 with comment: 'Execute Query'");
        this.engine.logger.log("info","Query 'Select Customer based on firstName' belongs to source document, getting the DB connection from source.");
        const queryStr = 'SELECT INS_CUSTOMER2.CUSTOMERID,INS_CUSTOMER2.FIRSTNAME,INS_CUSTOMER2.LASTNAME,INS_CUSTOMER2.MIDDLENAME,INS_CUSTOMER2.PREFIX,INS_CUSTOMER2.MAILINGADDRESSTYPE,INS_CUSTOMER2.MAILINGADDRESSLINE1,INS_CUSTOMER2.MAILINGADDRESSLINE2,INS_CUSTOMER2.MAILINGCITY,INS_CUSTOMER2.MAILINGSTATE,INS_CUSTOMER2.MAILINGPOSTALCODE,INS_CUSTOMER2.MAILINGCOUNTRYCD,INS_CUSTOMER2.BILLINGADDRESSTYPE,INS_CUSTOMER2.BILLINGADDRESSLINE1,INS_CUSTOMER2.BILLINGADDRESSLINE2,INS_CUSTOMER2.BILLINGCITY,INS_CUSTOMER2.BILLINGSTATE,INS_CUSTOMER2.BILLINGPOSTALCODE,INS_CUSTOMER2.BILLINGCOUNTRYCD,INS_CUSTOMER2.PHONETYPECD,INS_CUSTOMER2.PHONEUSECD,INS_CUSTOMER2.HOMEPHONENUMBER,INS_CUSTOMER2.EMAILADDRESS,INS_CUSTOMER2.INSUREDFOR6MONTHSORMORE,INS_CUSTOMER2.PRIORBODYINJURYLIMIT,INS_CUSTOMER2.MONTHSWITHCURRENTAGENT,INS_CUSTOMER2.LOYALCUSTOMERYEARS,INS_CUSTOMER2.RESIDENCETYPE,INS_CUSTOMER2.DONOTCONTACTINDICATOR FROM INS_CUSTOMER2 WHERE INS_CUSTOMER2.FIRSTNAME=? ORDER BY INS_CUSTOMER2.LASTNAME ASC';
        const i = this.engine.n_loops>0?`[${this.engine.getCurrIndex('source') - 1}]`:'';
        const replacements = [
        	this.engine.getVariable('$customerName[1]')
        ];
        try {
            const results = await this.engine.sourceDbClient.query(queryStr, 'SELECT', replacements);
            this.engine.queryResults['Select Customer based on firstName'] = results;
            } catch(error) {
            this.engine.logger.error(error);
            this.engine.updateVariable('$mondErrorLog',error)
        };
    };
    
    blockN3() {
        // If-Else Row Fetched
        this.engine.logger.log("info","Executing blockN3 with comment: 'If-Else Row Fetched'");
        this.engine.logger.log("info","Executing if row exists, fetch next block");
        if (this.engine.queryResults['undefined']) {
            this.engine.logger.log("info","Executing true block of if-else");
            this.blockN7();
            this.blockEnd();
        }
        else {
            this.engine.logger.log("info","Executing false block of if-else");
            this.blockN6();
        };
    };
    
    blockN7() {
        // Set Object From Source
        this.engine.logger.log("info","Executing blockN7 with comment: 'Set Object From Source'");
        this.engine.logger.log('info','Setting Object "@account" Fields From Source');
        const i = this.engine.getCurrIndex('source') - 1;
        this.engine.updateVariable(`@account.mailingAddressType`,this.engine.getVariable(`MailingAddressType[${i}]`));
        this.engine.updateVariable(`@account.mailingAddressLine1`,this.engine.getVariable(`MailingAddressLine1[${i}]`));
        this.engine.updateVariable(`@account.mailingAddressLine2`,this.engine.getVariable(`MailingAddressLine2[${i}]`));
        this.engine.updateVariable(`@account.mailingCity`,this.engine.getVariable(`MailingCity[${i}]`));
        this.engine.updateVariable(`@account.mailingState`,this.engine.getVariable(`MailingState[${i}]`));
        this.engine.updateVariable(`@account.mailingPostalCode`,this.engine.getVariable(`MailingPostalCode[${i}]`));
        this.engine.updateVariable(`@account.mailingCountryCd`,this.engine.getVariable(`MailingCountryCd[${i}]`));
        this.engine.updateVariable(`@account.billingAddressType`,this.engine.getVariable(`BillingAddressType[${i}]`));
        this.engine.updateVariable(`@account.billingAddressLine1`,this.engine.getVariable(`BillingAddressLine1[${i}]`));
        this.engine.updateVariable(`@account.billingAddressLine2`,this.engine.getVariable(`BillingAddressLine2[${i}]`));
        this.engine.updateVariable(`@account.billingCity`,this.engine.getVariable(`BillingCity[${i}]`));
        this.engine.updateVariable(`@account.billingState`,this.engine.getVariable(`BillingState[${i}]`));
        this.engine.updateVariable(`@account.billingPostalCode`,this.engine.getVariable(`BillingPostalCode[${i}]`));
        this.engine.updateVariable(`@account.billingCountryCd`,this.engine.getVariable(`BillingCountryCd[${i}]`));
        this.engine.updateVariable(`@account.phoneTypeCd`,this.engine.getVariable(`PhoneTypeCd[${i}]`));
        this.engine.updateVariable(`@account.phoneUseCd`,this.engine.getVariable(`PhoneUseCd[${i}]`));
        this.engine.updateVariable(`@account.homePhoneNumber`,this.engine.getVariable(`HomePhoneNumber[${i}]`));
        this.engine.updateVariable(`@account.donotContactIndicator`,this.engine.getVariable(`DonotContactIndicator[${i}]`));
        this.engine.updateVariable(`@account.emailAddress`,this.engine.getVariable(`EmailAddress[${i}]`));
        this.engine.updateVariable(`@account.lastName`,this.engine.getVariable(`LastName[${i}]`));
        this.engine.updateVariable(`@account.firstName`,this.engine.getVariable(`FirstName[${i}]`));
        this.engine.updateVariable(`@account.middleName`,this.engine.getVariable(`MiddleName[${i}]`));
    };
    
    blockN6() {
        // Customer not found
        this.engine.logger.log("info","Executing blockN6 with comment: 'Customer not found'");
        this.engine.logger.log("info","In set operator, target '$mondErrorLog' default value 'Could not find customer'");
        this.engine.updateVariable('$mondErrorLog',`Could not find customer`);
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
        const mongoClient = new MongoClient(config.mongodb);
        await mongoClient.getConnection();
        this.engine.mongoClient = mongoClient;
    };
    
    async blockCloseDb() {
        // Close database connections
        this.engine.logger.log("info","Executing blockCloseDb with comment: 'Close database connections'");
        try {
            await this.engine.sourceDbClient.closeConn();
            } catch(error) {
            this.engine.logger.error(error);
        };
        this.engine.mongoClient.close();
    };
    
    async executeFunction() {
        await this.blockInitDb();
        this.blockStart();
        await this.blockN1();
        this.blockN3();
        await this.blockCloseDb();
        return this.engine.getOutputs()
    };
    
    
    }
    const service = new FetchCustomer({});
service.executeFunction();