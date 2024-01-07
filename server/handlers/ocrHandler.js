const { AzureKeyCredential, DocumentAnalysisClient } = require('@azure/ai-form-recognizer');
const { Receipt, Item } = require('../models/user');

class OcrHandler {
  constructor(endpoint, key) {
    this.endpoint = endpoint;
    this.key = key;
    this.documentAnalysisClient = new DocumentAnalysisClient(this.endpoint, new AzureKeyCredential(this.key));
  }

  removeCurrencySymbol(str) {
    if ((str.charAt(0) == "$") || (str.charAt(0) == "€") || (str.charAt(0) == "£")) {
      return str.substring(1); // Remove the first character if it's $ or €
    }
    return str; // Return the original string if the first character is not $ or €
  }

  async analyzeReceipt(blobUrl) {
    try {
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

      const itemsList = []

      for (const item of (Items && Items.values) || []) {
        const {
          Description,
          TotalPrice
        } = item.properties;
        
        const itemDesc = Description.content
        const itemPrice = this.removeCurrencySymbol(TotalPrice.content)

        const fetchedItem = {
          name: itemDesc,
          price: itemPrice
        }

        itemsList.push(new Item(fetchedItem))
      }

      const totalFetched = this.removeCurrencySymbol(Total.content)

      const fetchedReceiptInfo = {
        merchant: MerchantName.content, 
        totalPrice: totalFetched, 
        items: itemsList, 
        date: new Date()
      }

      const receipt = new Receipt(fetchedReceiptInfo)

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


      return receipt;
    } else {
      throw new Error("Expected at least one receipt in the result.");
    }
  } catch (err) {
    throw new Error("Error processing receipt")
  }
  }
}

module.exports = OcrHandler;