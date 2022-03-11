import { FetchAllCustomers } from "generatedServices/SQL_CRUD/fetchAllCustomers/fetchAllCustomers"
export async function handler(event: any) {
    let output
    try {
        const service = new FetchAllCustomers()
        output = await service.executeFunction()
    }
    catch(error: any) {
        return {
                              statusCode: 400,
                              body: JSON.stringify({
                                message: `Failed running service: ${error}`,
                              }),
                            };
    }
    return {
                      statusCode: 200,
                      body: JSON.stringify(
                        {
                          output,
                        },
                        null,
                        2
                      ),
                    };
};
