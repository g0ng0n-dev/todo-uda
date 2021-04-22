import {TodoItem} from "../models/TodoItem";
import * as ddb from "../data/todo";
import {createLogger} from "../utils/logger";

const logger = createLogger("getTodosForUserService");


export default async function getTodosForUserService(userId: string): Promise<TodoItem[]> {
    logger.debug("start getTodosForUserService");
    const items: TodoItem[] = await ddb.getTodoByUser(userId);
    logger.debug("end getTodosForUserService");
    return items;
}
