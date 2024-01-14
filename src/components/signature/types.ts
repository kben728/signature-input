export interface SignatureDataRef {
  getData: () => Promise<string>; // base64
}
