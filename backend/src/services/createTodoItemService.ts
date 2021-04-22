import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import * as uuid from 'uuid';
import { createLogger } from '../utils/logger';
import { TodoItem } from '../models/TodoItem';
import * as ddb from '../data/todo';

const logger = createLogger("createTodoItemService");

export default async function createTodoItemService(userId: string, todoBus: CreateTodoRequest): Promise<TodoItem> {
    logger.debug("createTodoItemService - in");

    const todoId = uuid.v4();
    const todoDb: TodoItem = {
        todoId: todoId,
        userId: userId,
        createdAt: new Date().toISOString(),
        name: todoBus.name,
        done: false,
        ...todoBus
    }

    const item: TodoItem = await ddb.createTodo(todoDb);
    logger.debug("todoBl.createTodoItem - out");
    return item;
}
