import 'source-map-support/register'
import { getUserId } from '../../utils/utils';
import { TodoItem } from '../../models/TodoItem'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import createTodoItemService from '../../services/createTodoItemService';
import { createLogger } from '../../utils/logger';
import * as uuid from 'uuid';

const logger = createLogger("HttpCreateTodo");

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent)
  : Promise<APIGatewayProxyResult> => {
	const eventId = uuid.v4()

  	logger.debug(`start HttpCreateTodo - ${eventId}`);
  	const newTodoItm: CreateTodoRequest = JSON.parse(event.body)
  	const uid = getUserId(event);
  	const ret: TodoItem = await createTodoItemService(uid, newTodoItm);
  	logger.debug(`end HttpCreateTodo - ${eventId}`);
  	return {
    	statusCode: 200,
    	headers: {
      		'Access-Control-Allow-Origin': '*',
      		'Access-Control-Allow-Credentials': true
    	},
    	body: JSON.stringify({"item": ret})
  	};
}
