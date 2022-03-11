import { UpdateCustomer } from "generatedServices/SQL_CRUD/updateCustomer/updateCustomer"
function parseUpdateUser(event: any) {
    let args: Record<string, any> = {};
    if ("body" in event && event.body) {
        try {
            args.account = JSON.parse(event.body).account
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
        args = parseUpdateUser(event)
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
        const service = new UpdateCustomer(args)
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
