export interface SignatureDataRef {
  getData: () => Promise<string>; // base64
}

export type Output = "image/jpeg" | "image/png" | "image/svg+xml";

export interface SignaturePadProps {
  colors?: string[];
  initialColor?: string;
  outputFormat?: Output;
  uniformColor?: boolean;
  setValid?: (value: boolean) => void;
}
