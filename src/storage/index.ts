export enum StorageProperties {
  ACCESS_TOKEN = "@PDU/ACCESS_TOKEN",
  USER = "@PDU/USER",
}

export interface StorageValueType extends Record<StorageProperties, any> {
  [StorageProperties.ACCESS_TOKEN]: string;
  [StorageProperties.USER]: string;
}

class Storage {
  private storage = window.localStorage;

  get accessToken() {
    return this.storage.getItem(StorageProperties.ACCESS_TOKEN) ?? null;
  }

  set accessToken(value) {
    this.storage.setItem(StorageProperties.ACCESS_TOKEN, value ?? "");
  }

  public remove(property: StorageProperties) {
    this.storage.removeItem(property);
  }

  public getter<P extends StorageProperties>(
    property: P,
  ): StorageValueType[P] | null {
    const value = this.storage.getItem(property);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value as any;
    }
  }

  public setter<P extends StorageProperties>(
    property: P,
    value: StorageValueType[P],
  ) {
    this.storage.setItem(property, JSON.stringify(value));
  }
}

export const storage = new Storage();
