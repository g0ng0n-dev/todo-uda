import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../utils/utils';
import { TodoUpdate } from '../../models/TodoUpdate'
import updateTodoItemService from '../../services/updateTodoItemService';

const logger = createLogger("httpUpdateTodo");

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  	logger.debug("start httpUpdateTodo");
  	const todoId = event.pathParameters.todoId
  	const updatedTodoItem: UpdateTodoRequest = JSON.parse(event.body)
  	const usedId = getUserId(event);
  	const response: TodoUpdate = await updateTodoItemService(usedId, todoId, updatedTodoItem);
  	logger.debug(`end httpUpdateTodo`);
  	return {
    	statusCode: 200,
    	headers: {
      		'Access-Control-Allow-Origin': '*',
      		'Access-Control-Allow-Credentials': true
    	},
    	body: JSON.stringify({"item": response})
  	};
}
