import { createLogger } from '../utils/logger';
import { TodoItem } from '../models/TodoItem';
import * as ddb from '../data/todo';
import * as s3Svc from '../data/s3';

const logger = createLogger("todoDb");

export default async function getSignedUrlService(userId: string, todoId: string)
    :Promise<string> {
    logger.debug("todoBl.getSignedUrl - in");
    const todoItm: TodoItem = await ddb.getTodo(userId, todoId);
    
    //record/overwrite as a new attachment URL or update to existing one.    
    if (todoItm) {
        const downloadUrl :string = await s3Svc.getAttachementDownloadUrl(userId, todoId); 
        // Add/update attachementURL for Todo item in DB
        await ddb.updateTodoAttachement(userId, todoId, downloadUrl);

        // get signed/upload URL from S3
        const uploadUrl :string = await s3Svc.getAttachementUploadUrl(userId, todoId);        
        logger.debug("todoBl.getSignedUrl - out 1");        
        return uploadUrl;
    } else {
        logger.debug("todoBl.getSignedUrl - out 2");        
        return null;
    }
}
