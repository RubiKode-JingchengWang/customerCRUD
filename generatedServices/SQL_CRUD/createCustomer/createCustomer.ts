
/*

Project name: SQL_CRUD
Service name: createCustomer
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

export class CreateCustomer{engine: RubiKodeEngine;
    
    constructor(
        params: { [name: string]: any}, 
        engine?: RubiKodeEngine, 
        logger?: winston.Logger
        ) {
        if (engine) {
            this.engine = engine;
            this.engine.logger.log('info','Using existing engine in service createCustomer');
        }
        else {
            this.engine = new RubiKodeEngine(path.join(config.nodePath,'createCustomer'),logger);
            this.engine.logger.log('info','Creating new engine in service createCustomer');
        }
        if (params) {
            const accountVariable = 'account' in params?params['account']:undefined
            const Account = this.engine.getMongooseModel('Account', 'com.mond.insurtech.crm.Account')
            this.engine.createVariable('@account', 'com.mond.insurtech.crm.Account', new Account(), true)
        }
    };
    
    blockStart() {
        this.engine.logger.log("info","Executing service createCustomer.");
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
        this.engine.createVariable('$result','string','undefined');
        this.engine.outputs = ['$result'];
    };
    
    blockEnd() {
        this.engine.logger.log("info","Completed service createCustomer.");
        this.engine.logger.log("info","Executing blockEnd with comment: ''");
        this.engine.logger.log('info','createCustomer ending vars:');
        this.engine.logger.log('info',JSON.stringify(this.engine.processVariables));
        this.engine.saveVars('generatedServices/SQL_CRUD/createCustomer/createCustomer-RK-Response.json');
    };
    
    async block500() {
        // if first name does not exist
        this.engine.logger.log("info","Executing block500 with comment: 'if first name does not exist'");
        this.engine.logger.log("info","Executing if-else block with condition 'accountfirstName == null'");
        const accountfirstName = this.engine.getVariable('@account.firstName');
        if (accountfirstName == null) {
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
        // if last name does not exist
        this.engine.logger.log("info","Executing blockN5 with comment: 'if last name does not exist'");
        this.engine.logger.log("info","Executing if-else block with condition 'accountlastName == null'");
        const accountlastName = this.engine.getVariable('@account.lastName');
        if (accountlastName == null) {
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
        this.engine.logger.log("info","In set operator, target '$result' default value 'Last name does not exist'");
        this.engine.updateVariable('$result',`Last name does not exist`);
    };
    
    async blockN7() {
        // Execute Query
        this.engine.logger.log("info","Executing blockN7 with comment: 'Execute Query'");
        this.engine.logger.log("info","Query 'Insert INS_CUSTOMER2' belongs to source document, getting the DB connection from source.");
        const queryStr = 'INSERT INTO INS_CUSTOMER2(INS_CUSTOMER2.CUSTOMERID,INS_CUSTOMER2.FIRSTNAME,INS_CUSTOMER2.LASTNAME,INS_CUSTOMER2.MIDDLENAME,INS_CUSTOMER2.PREFIX,INS_CUSTOMER2.MAILINGADDRESSTYPE,INS_CUSTOMER2.MAILINGADDRESSLINE1,INS_CUSTOMER2.MAILINGADDRESSLINE2,INS_CUSTOMER2.MAILINGCITY,INS_CUSTOMER2.MAILINGSTATE,INS_CUSTOMER2.MAILINGPOSTALCODE,INS_CUSTOMER2.MAILINGCOUNTRYCD,INS_CUSTOMER2.BILLINGADDRESSTYPE,INS_CUSTOMER2.BILLINGADDRESSLINE1,INS_CUSTOMER2.BILLINGADDRESSLINE2,INS_CUSTOMER2.BILLINGCITY,INS_CUSTOMER2.BILLINGSTATE,INS_CUSTOMER2.BILLINGPOSTALCODE,INS_CUSTOMER2.BILLINGCOUNTRYCD,INS_CUSTOMER2.PHONETYPECD,INS_CUSTOMER2.PHONEUSECD,INS_CUSTOMER2.HOMEPHONENUMBER,INS_CUSTOMER2.EMAILADDRESS,INS_CUSTOMER2.INSUREDFOR6MONTHSORMORE,INS_CUSTOMER2.PRIORBODYINJURYLIMIT,INS_CUSTOMER2.MONTHSWITHCURRENTAGENT,INS_CUSTOMER2.LOYALCUSTOMERYEARS,INS_CUSTOMER2.RESIDENCETYPE,INS_CUSTOMER2.DONOTCONTACTINDICATOR) VALUES(LAST_INSERT_ID()+1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const i = this.engine.n_loops>0?`[${this.engine.getCurrIndex('source') - 1}]`:'';
        const replacements = [
        	this.engine.formatDbColumn(`CustomerIdentifier${i}`, undefined, `INT`, `NO`, 10, undefined, undefined),
        	this.engine.formatDbColumn(`FirstName${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`LastName${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`MiddleName${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`TitlePrefix${i}`, undefined, `VARCHAR`, `YES`, 15, undefined, undefined),
        	this.engine.formatDbColumn(`MailingAddressType${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`MailingAddressLine1${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`MailingAddressLine2${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`MailingCity${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`MailingState${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`MailingPostalCode${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`MailingCountryCd${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`BillingAddressType${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`BillingAddressLine1${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`BillingAddressLine2${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`BillingCity${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`BillingState${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`BillingPostalCode${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`BillingCountryCd${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`PhoneTypeCd${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`PhoneUseCd${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`HomePhoneNumber${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`EmailAddress${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`InsuredFor6MonthsOrMore${i}`, 0, `INT`, `YES`, 10, undefined, undefined),
        	this.engine.formatDbColumn(`PriorBodyInjuryLimit${i}`, 0, `FLOAT`, `YES`, 15, 2, undefined),
        	this.engine.formatDbColumn(`MonthsWithCurrentAgent${i}`, 0, `INT`, `YES`, 10, undefined, undefined),
        	this.engine.formatDbColumn(`LoyalCustomerYears${i}`, 0, `INT`, `YES`, 10, undefined, undefined),
        	this.engine.formatDbColumn(`ResidenceType${i}`, undefined, `VARCHAR`, `YES`, 50, undefined, undefined),
        	this.engine.formatDbColumn(`DonotContactIndicator${i}`, undefined, `INT`, `YES`, 10, undefined, undefined)
        ];
        try {
            const results = await this.engine.sourceDbClient.query(queryStr, 'INSERT', replacements);
            this.engine.queryResults['Insert INS_CUSTOMER2'] = results;
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
        // Set error
        this.engine.logger.log("info","Executing blockN9 with comment: 'Set error'");
        this.engine.logger.log("info","In set operator, target '$result' default value 'Customer info could not be added'");
        this.engine.updateVariable('$result',`Customer info could not be added`);
    };
    
    blockN10() {
        // Set success
        this.engine.logger.log("info","Executing blockN10 with comment: 'Set success'");
        this.engine.logger.log("info","In set operator, target '$result' default value 'Customer info added'");
        this.engine.updateVariable('$result',`Customer info added`);
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
        await this.block500();
        await this.blockCloseDb();
        return this.engine.getOutputs()
    };
    
    
    }
    const service = new CreateCustomer({});
service.executeFunction();