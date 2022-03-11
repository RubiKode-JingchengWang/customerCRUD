import { FetchCustomer } from "generatedServices/SQL_CRUD/fetchCustomer/fetchCustomer"
function parseAccount(event: any) {
    let args: Record<string, any> = {};
    if ("pathParameters" in event && event.pathParameters) {
        try {
            args.firstName = event.pathParameters.firstName
            args.lastName = event.pathParameters.lastName
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
        args = parseAccount(event)
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
        const service = new FetchCustomer(args)
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
