const { AzureKeyCredential, DocumentAnalysisClient } = require('@azure/ai-form-recognizer');

class OcrHandler {
  constructor(endpoint, key) {
    this.endpoint = endpoint;
    this.key = key;
    this.documentAnalysisClient = new DocumentAnalysisClient(this.endpoint, new AzureKeyCredential(this.key));
  }

  async analyzeReceipt(blobUrl) {
    const poller = await this.documentAnalysisClient.beginAnalyzeDocument("prebuilt-receipt", blobUrl);
    const {
        documents: [result]
    } = await poller.pollUntilDone();

    if (result) {
      const {
          MerchantName,
          Items,
          Total
      } = result.fields;

      console.log("=== Receipt Information ===");
      console.log("Type:", result.docType);
      console.log("Merchant:", MerchantName && MerchantName.content);

      console.log("Items:");
      for (const item of (Items && Items.values) || []) {
          const {
              Description,
              TotalPrice
          } = item.properties;

          console.log("- Description:", Description && Description.content);
          console.log("  Total Price:", TotalPrice && TotalPrice.content);
      }
      console.log("Total:", Total && Total.content);
    
    } else {
      throw new Error("Expected at least one receipt in the result.");
    }
  }
}

module.exports = OcrHandler;