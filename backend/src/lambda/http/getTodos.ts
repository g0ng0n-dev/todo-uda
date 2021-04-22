import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from "../../utils/utils";
import { createLogger } from '../../utils/logger' ;
import getTodosForUserService from '../../services/getTodosForUserService';

const logger = createLogger("HttpGetTodosForCurrentUser");


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  	logger.debug("start HttpGetTodosForCurrentUser");
  	const userId = getUserId(event);

  	if (!userId){
  		logger.debug("end HttpGetTodosForCurrentUser - error");
    	return {
      		statusCode: 401,
      		headers: {
        		'Access-Control-Allow-Origin': '*',
        		'Access-Control-Allow-Credentials': true
      		},
      		body: "{}"      
    	};
  	}
    const items = await getTodosForUserService(userId);

    logger.debug("end HttpGetTodosForCurrentUser");
    return {
    	statusCode: 200,
      	headers: {
        	'Access-Control-Allow-Origin': '*',
        	'Access-Control-Allow-Credentials': true
      		},
      		body: JSON.stringify({ items: items})
    };

}
