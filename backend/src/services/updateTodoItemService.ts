import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";
import * as ddb from "../data/todo";
import {createLogger} from "../utils/logger";

const logger = createLogger("updateTodoItemService");

export default async function updateTodoItemService(userId: string, todoId: string, todoBus: UpdateTodoRequest)
    : Promise<TodoUpdate> {
    logger.debug("start updateTodoItemService - ");
    const updItem: TodoUpdate = await ddb.updateTodo(userId, todoId, todoBus);
    logger.debug("end updateTodoItemService - out");
    return updItem;
}
