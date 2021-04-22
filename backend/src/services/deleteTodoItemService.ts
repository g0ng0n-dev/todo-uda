import {TodoItem} from "../models/TodoItem";
import * as ddb from "../data/todo";
import * as s3Svc from "../data/s3";
import {createLogger} from "../utils/logger";

const logger = createLogger("deleteTodoItemService");

export default async function deleteTodoItemService(userId: string, todoId: string)
    : Promise<void> {
    logger.debug("start deleteTodoItemService");

    const todoItm: TodoItem = await ddb.getTodo(userId, todoId);
    if (todoItm) {
        // Delete attachement from S3 bucket
        if (todoItm.attachmentUrl) {
            await s3Svc.deleteAttachement(todoId);
        }

        // Delete TodoItem from DynamoDB
        await ddb.deleteTodo(userId, todoId);
    }

    logger.debug("end deleteTodoItemService");
    return;
}
