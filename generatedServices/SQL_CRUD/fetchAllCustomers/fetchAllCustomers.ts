
/*

Project name: SQL_CRUD
Service name: fetchAllCustomers
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

export class FetchAllCustomers{engine: RubiKodeEngine;
    
    constructor(
        engine?: RubiKodeEngine, 
        logger?: winston.Logger
        ) {
        if (engine) {
            this.engine = engine;
            this.engine.logger.log('info','Using existing engine in service fetchAllCustomers');
        }
        else {
            this.engine = new RubiKodeEngine(path.join(config.nodePath,'fetchAllCustomers'),logger);
            this.engine.logger.log('info','Creating new engine in service fetchAllCustomers');
        }
        
    };
    
    blockStart() {
        this.engine.logger.log("info","Executing service fetchAllCustomers.");
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
        const AccoountInfo = this.engine.getMongooseModel('AccoountInfo', 'com.mond.insurtech.crm.Account');
        this.engine.createVariable('@accoountInfo', 'com.mond.insurtech.crm.Account', new AccoountInfo(), true);
        this.engine.createVariable('$result','string','');
        const AccountListTemp = this.engine.getMongooseModel('AccountListTemp', 'com.mond.insurtech.crm.AccountList');
        this.engine.createVariable('@accountListTemp', 'com.mond.insurtech.crm.AccountList', new AccountListTemp(), true);
        const AccountList = this.engine.getMongooseModel('AccountList', 'com.mond.insurtech.crm.AccountList');
        this.engine.createVariable('@accountList', 'com.mond.insurtech.crm.AccountList', new AccountList(), true);
        this.engine.outputs = ['@accountList'];
    };
    
    blockEnd() {
        this.engine.logger.log("info","Completed service fetchAllCustomers.");
        this.engine.logger.log("info","Executing blockEnd with comment: ''");
        this.engine.logger.log('info','fetchAllCustomers ending vars:');
        this.engine.logger.log('info',JSON.stringify(this.engine.processVariables));
        this.engine.saveVars('generatedServices/SQL_CRUD/fetchAllCustomers/fetchAllCustomers-RK-Response.json');
    };
    
    async blockN1() {
        // Execute Query
        this.engine.logger.log("info","Executing blockN1 with comment: 'Execute Query'");
        this.engine.logger.log("info","Query 'Select All Customers' belongs to source document, getting the DB connection from source.");
        const queryStr = 'SELECT INS_CUSTOMER2.CUSTOMERID,INS_CUSTOMER2.FIRSTNAME,INS_CUSTOMER2.LASTNAME,INS_CUSTOMER2.MIDDLENAME,INS_CUSTOMER2.PREFIX,INS_CUSTOMER2.MAILINGADDRESSTYPE,INS_CUSTOMER2.MAILINGADDRESSLINE1,INS_CUSTOMER2.MAILINGADDRESSLINE2,INS_CUSTOMER2.MAILINGCITY,INS_CUSTOMER2.MAILINGSTATE,INS_CUSTOMER2.MAILINGPOSTALCODE,INS_CUSTOMER2.MAILINGCOUNTRYCD,INS_CUSTOMER2.BILLINGADDRESSLINE1,INS_CUSTOMER2.BILLINGADDRESSTYPE,INS_CUSTOMER2.BILLINGADDRESSLINE2,INS_CUSTOMER2.BILLINGCITY,INS_CUSTOMER2.BILLINGSTATE,INS_CUSTOMER2.BILLINGPOSTALCODE,INS_CUSTOMER2.BILLINGCOUNTRYCD,INS_CUSTOMER2.PHONETYPECD,INS_CUSTOMER2.PHONEUSECD,INS_CUSTOMER2.HOMEPHONENUMBER,INS_CUSTOMER2.EMAILADDRESS,INS_CUSTOMER2.INSUREDFOR6MONTHSORMORE,INS_CUSTOMER2.PRIORBODYINJURYLIMIT,INS_CUSTOMER2.MONTHSWITHCURRENTAGENT,INS_CUSTOMER2.LOYALCUSTOMERYEARS,INS_CUSTOMER2.RESIDENCETYPE,INS_CUSTOMER2.DONOTCONTACTINDICATOR FROM INS_CUSTOMER2 ORDER BY INS_CUSTOMER2.FIRSTNAME ASC';
        try {
            const results = await this.engine.sourceDbClient.query(queryStr, 'SELECT');
            this.engine.queryResults['Select All Customers'] = results;
            } catch(error) {
            this.engine.logger.error(error);
            this.engine.updateVariable('$mondErrorLog',error)
        };
    };
    
    blockN4() {
        // While Fetch Next Row
        this.engine.logger.log("info","Executing blockN4 with comment: 'While Fetch Next Row'");
        this.engine.updateLoopLevel(1);
        const queryResults = this.engine.queryResults['Select All Customers'];
        for (const row of queryResults){
            this.engine.incrementLoopIndex();
            this.engine.logger.log("info",`Row '${this.engine.getCurrIndex('source')}' fetched, setting the values now`);
            this.engine.updateVariable("CustomerIdentifier", row["CUSTOMERID"],"array");
            this.engine.updateVariable("FirstName", row["FIRSTNAME"],"array");
            this.engine.updateVariable("LastName", row["LASTNAME"],"array");
            this.engine.updateVariable("MiddleName", row["MIDDLENAME"],"array");
            this.engine.updateVariable("TitlePrefix", row["PREFIX"],"array");
            this.engine.updateVariable("MailingAddressType", row["MAILINGADDRESSTYPE"],"array");
            this.engine.updateVariable("MailingAddressLine1", row["MAILINGADDRESSLINE1"],"array");
            this.engine.updateVariable("MailingAddressLine2", row["MAILINGADDRESSLINE2"],"array");
            this.engine.updateVariable("MailingCity", row["MAILINGCITY"],"array");
            this.engine.updateVariable("MailingState", row["MAILINGSTATE"],"array");
            this.engine.updateVariable("MailingPostalCode", row["MAILINGPOSTALCODE"],"array");
            this.engine.updateVariable("MailingCountryCd", row["MAILINGCOUNTRYCD"],"array");
            this.engine.updateVariable("BillingAddressLine1", row["BILLINGADDRESSLINE1"],"array");
            this.engine.updateVariable("BillingAddressType", row["BILLINGADDRESSTYPE"],"array");
            this.engine.updateVariable("BillingAddressLine2", row["BILLINGADDRESSLINE2"],"array");
            this.engine.updateVariable("BillingCity", row["BILLINGCITY"],"array");
            this.engine.updateVariable("BillingState", row["BILLINGSTATE"],"array");
            this.engine.updateVariable("BillingPostalCode", row["BILLINGPOSTALCODE"],"array");
            this.engine.updateVariable("BillingCountryCd", row["BILLINGCOUNTRYCD"],"array");
            this.engine.updateVariable("PhoneTypeCd", row["PHONETYPECD"],"array");
            this.engine.updateVariable("PhoneUseCd", row["PHONEUSECD"],"array");
            this.engine.updateVariable("HomePhoneNumber", row["HOMEPHONENUMBER"],"array");
            this.engine.updateVariable("EmailAddress", row["EMAILADDRESS"],"array");
            this.engine.updateVariable("InsuredFor6MonthsOrMore", row["INSUREDFOR6MONTHSORMORE"],"array");
            this.engine.updateVariable("PriorBodyInjuryLimit", row["PRIORBODYINJURYLIMIT"],"array");
            this.engine.updateVariable("MonthsWithCurrentAgent", row["MONTHSWITHCURRENTAGENT"],"array");
            this.engine.updateVariable("LoyalCustomerYears", row["LOYALCUSTOMERYEARS"],"array");
            this.engine.updateVariable("ResidenceType", row["RESIDENCETYPE"],"array");
            this.engine.updateVariable("DonotContactIndicator", row["DONOTCONTACTINDICATOR"],"array");
            this.blockN5();
            this.blockN3();
            this.blockN7();
            this.blockN9();
            this.blockN6();
            this.engine.logger.log("info",`Completed processsing row '${this.engine.getCurrIndex('source')}' for query 'Select All Customers' `);
        };
        this.engine.resetLoopIndex();
        this.engine.updateLoopLevel(-1);
    };
    
    blockN5() {
        // Add To Log
        this.engine.logger.log("info","Executing blockN5 with comment: 'Add To Log'");
        const rowNumber = this.engine.getCurrIndex('source');
        this.engine.logger.log("info",`fetched row ${rowNumber}`);
    };
    
    blockN3() {
        // Create Account Object
        this.engine.logger.log("info","Executing blockN3 with comment: 'Create Account Object'");
        this.engine.logger.log("info","Creating Mongo Object 'account' with class 'com.mond.insurtech.crm.Account'");
        const Ccount = this.engine.getMongooseModel('Ccount', 'com.mond.insurtech.crm.Account');
        this.engine.createVariable('account','com.mond.insurtech.crm.Account',new Ccount(),true);
    };
    
    blockN9() {
        // Append Object To Array
        this.engine.logger.log("info","Executing blockN9 with comment: 'Append Object To Array'");
        this.engine.logger.log("info","Adding object '@accoountInfo' to array '@accountListTemp.accountList'");
        this.engine.appendToObjectArray('@accountListTemp.accountList', this.engine.getVariable('@accoountInfo'));
    };
    
    blockN7() {
        // Set Object From Source
        this.engine.logger.log("info","Executing blockN7 with comment: 'Set Object From Source'");
        this.engine.logger.log('info','Setting Object "@accoountInfo" Fields From Source');
        const i = this.engine.getCurrIndex('source') - 1;
        this.engine.updateVariable(`@accoountInfo.mailingAddressType`,this.engine.getVariable(`MailingAddressType[${i}]`));
        this.engine.updateVariable(`@accoountInfo.mailingAddressLine1`,this.engine.getVariable(`MailingAddressLine1[${i}]`));
        this.engine.updateVariable(`@accoountInfo.mailingAddressLine2`,this.engine.getVariable(`MailingAddressLine2[${i}]`));
        this.engine.updateVariable(`@accoountInfo.mailingCity`,this.engine.getVariable(`MailingCity[${i}]`));
        this.engine.updateVariable(`@accoountInfo.mailingState`,this.engine.getVariable(`MailingState[${i}]`));
        this.engine.updateVariable(`@accoountInfo.mailingPostalCode`,this.engine.getVariable(`MailingPostalCode[${i}]`));
        this.engine.updateVariable(`@accoountInfo.mailingCountryCd`,this.engine.getVariable(`MailingCountryCd[${i}]`));
        this.engine.updateVariable(`@accoountInfo.billingAddressType`,this.engine.getVariable(`BillingAddressType[${i}]`));
        this.engine.updateVariable(`@accoountInfo.billingAddressLine1`,this.engine.getVariable(`BillingAddressLine1[${i}]`));
        this.engine.updateVariable(`@accoountInfo.billingAddressLine2`,this.engine.getVariable(`BillingAddressLine2[${i}]`));
        this.engine.updateVariable(`@accoountInfo.billingCity`,this.engine.getVariable(`BillingCity[${i}]`));
        this.engine.updateVariable(`@accoountInfo.billingState`,this.engine.getVariable(`BillingState[${i}]`));
        this.engine.updateVariable(`@accoountInfo.billingPostalCode`,this.engine.getVariable(`BillingPostalCode[${i}]`));
        this.engine.updateVariable(`@accoountInfo.billingCountryCd`,this.engine.getVariable(`BillingCountryCd[${i}]`));
        this.engine.updateVariable(`@accoountInfo.phoneTypeCd`,this.engine.getVariable(`PhoneTypeCd[${i}]`));
        this.engine.updateVariable(`@accoountInfo.phoneUseCd`,this.engine.getVariable(`PhoneUseCd[${i}]`));
        this.engine.updateVariable(`@accoountInfo.homePhoneNumber`,this.engine.getVariable(`HomePhoneNumber[${i}]`));
        this.engine.updateVariable(`@accoountInfo.donotContactIndicator`,this.engine.getVariable(`DonotContactIndicator[${i}]`));
        this.engine.updateVariable(`@accoountInfo.emailAddress`,this.engine.getVariable(`EmailAddress[${i}]`));
        this.engine.updateVariable(`@accoountInfo.lastName`,this.engine.getVariable(`LastName[${i}]`));
        this.engine.updateVariable(`@accoountInfo.firstName`,this.engine.getVariable(`FirstName[${i}]`));
        this.engine.updateVariable(`@accoountInfo.middleName`,this.engine.getVariable(`MiddleName[${i}]`));
    };
    
    blockN6() {
        // Clear Object
        this.engine.logger.log("info","Executing blockN6 with comment: 'Clear Object'");
        this.engine.logger.log("info","Clearing object '@accoountInfo'");
        this.engine.updateVariable('@accoountInfo',{});
    };
    
    blockN10() {
        // Create JSON from Object
        this.engine.logger.log("info","Executing blockN10 with comment: 'Create JSON from Object'");
        this.engine.logger.log("info","Creating JSON from object '@accountListTemp'");
        const obj = this.engine.getVariable('@accountListTemp');
        this.engine.updateVariable('$result',JSON.stringify(obj));
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
        this.blockN4();
        this.blockN10();
        this.blockEnd();
        await this.blockCloseDb();
        return this.engine.getOutputs()
    };
    
    
    }
    const service = new FetchAllCustomers();
service.executeFunction();