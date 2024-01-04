const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

class BlobHandler {
    constructor(accountName, accountKey, containerName, sasToken) {
        this.accountName = accountName;
        this.accountKey = accountKey;
        this.containerName = containerName;
        this.sasToken = sasToken;
        this.sharedKeyCredential = new StorageSharedKeyCredential(this.accountName, this.accountKey);
        this.blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, this.sharedKeyCredential);
    }

    // Function to upload a file to Azure Blob Storage
    async uploadFile(localFilePath, destinationBlobName) {
        try {
            // Get a reference to a container
            const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
            const blobClient = containerClient.getBlockBlobClient(destinationBlobName);
        
            // Create a block blob client and upload the file to the specified container
            await blobClient.uploadFile(localFilePath);
            console.log(`File ${localFilePath} uploaded to Azure Blob Storage as ${destinationBlobName}.`);

        } catch (error) {
            console.error('Error uploading file to Azure Blob Storage:', error);
            throw error;
        }
    }

    async deleteFile(blobName) {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        const blobClient = containerClient.getBlockBlobClient(blobName);
    
        try {
          await blobClient.delete();
          console.log(`Blob "${blobName}" deleted successfully.`);
        } catch (error) {
          console.error(`Error deleting blob "${blobName}":`, error.message);
          throw error;
        }
    }

    generateBlobUrl(blobName) {
        return `https://${this.accountName}.blob.core.windows.net/${this.containerName}/${blobName}` + this.sasToken;
    }
}

module.exports = BlobHandler;