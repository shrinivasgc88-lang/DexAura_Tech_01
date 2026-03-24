from motor.motor_asyncio import AsyncIOMotorGridFSBucket
from fastapi import UploadFile
import logging
from bson import ObjectId
from typing import Optional

logger = logging.getLogger(__name__)

class FileService:
    def __init__(self, db):
        self.fs = AsyncIOMotorGridFSBucket(db)
    
    async def upload_file(self, file: UploadFile, metadata: dict = None) -> str:
        """
        Upload file to GridFS
        Returns GridFS file ID
        """
        try:
            contents = await file.read()
            grid_in = self.fs.open_upload_stream(
                file.filename,
                metadata=metadata or {}
            )
            await grid_in.write(contents)
            await grid_in.close()
            return str(grid_in._id)
        except Exception as e:
            logger.error(f"Failed to upload file: {str(e)}")
            raise
    
    async def download_file(self, file_id: str):
        """
        Download file from GridFS
        Returns file content
        """
        try:
            grid_out = await self.fs.open_download_stream(ObjectId(file_id))
            contents = await grid_out.read()
            return contents
        except Exception as e:
            logger.error(f"Failed to download file: {str(e)}")
            raise
    
    async def delete_file(self, file_id: str):
        """
        Delete file from GridFS
        """
        try:
            await self.fs.delete(ObjectId(file_id))
        except Exception as e:
            logger.error(f"Failed to delete file: {str(e)}")
            raise
    
    async def get_file_info(self, file_id: str) -> Optional[dict]:
        """
        Get file metadata from GridFS
        """
        try:
            grid_out = await self.fs.open_download_stream(ObjectId(file_id))
            return {
                "filename": grid_out.filename,
                "length": grid_out.length,
                "upload_date": grid_out.upload_date,
                "metadata": grid_out.metadata
            }
        except Exception as e:
            logger.error(f"Failed to get file info: {str(e)}")
            return None
