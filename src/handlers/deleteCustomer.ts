import { DeleteCustomer } from "generatedServices/SQL_CRUD/deleteCustomer/deleteCustomer"
function parseDeleteCustomer(event: any) {
    let args: Record<string, any> = {};
    if ("queryStringParameters" in event && event.queryStringParameters) {
        try {
            args.firstName = event.queryStringParameters.firstName
            args.lastName = event.queryStringParameters.lastName
        }
        catch(error: any) {
            throw Error(error)
        }
    }
    return args;
};

export async function handler(event: any) {
    let args: Record<string, any>
    try {
        args = parseDeleteCustomer(event)
    }
    catch(error) {
        return {
                                statusCode: 400,
                                body: JSON.stringify({
                                  message: `Request is missing required argument: ${error}.`,
                                }),
                              };
    }
    let output
    try {
        const service = new DeleteCustomer(args)
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
