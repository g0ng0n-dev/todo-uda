import 'source-map-support/register'
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../utils/utils';
import * as uuid from 'uuid';
import deleteTodoItemService from '../../services/deleteTodoItemService';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const logger = createLogger("HttpDeleteTodo");

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  	const eventId = uuid.v4()
   	logger.debug(`start HttpDeleteTodo - ${eventId}`);
  	const todoId = event.pathParameters.todoId
  	const uid = getUserId(event);
  	await deleteTodoItemService(uid, todoId);
  	logger.debug(`end HttpDeleteTodo - ${eventId}`);

	return {
    	statusCode: 200,
    	headers: {
      		'Access-Control-Allow-Origin': '*',
      		'Access-Control-Allow-Credentials': true
    	},
    	body: ""
  	};
}
