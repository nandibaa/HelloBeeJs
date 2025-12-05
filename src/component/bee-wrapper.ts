import { Bee, Reference } from '@ethersphere/bee-js';
import { persistUrl } from './url-storage';

export class BeeWrapper {
  private readonly bee: Bee;

  constructor(beeUrl: string = 'http://localhost:1633') {
    this.bee = new Bee(beeUrl);
  }

  async getStamp() {
    const allBatches = await this.bee.getPostageBatches();

    if (allBatches.length === 0) {
      throw new Error('Buy a postage batch before uploading!');
    }

    return allBatches[0];
  }

  decodeRef(result: Reference): string {
    if (typeof result === 'string') {
      return result;
    }
    return result.toString();
  }

  async upload(file: File) {
    await this.bee.checkConnection();

    const stamp = await this.getStamp();

    const uploadedResults = await this.bee.uploadFile(
      stamp.batchID,
      file,
      file.name
    );

    const ref = this.decodeRef(uploadedResults.reference);
    persistUrl(ref);
  }
}
