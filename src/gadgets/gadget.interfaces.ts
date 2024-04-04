

export interface TGadget {
  name: string;
  price: number;
  quantity: number;
  releaseYear: number;
  brand: string;
  category: string;
  model: string;
  os: string;
  connectivity: string;
  powerSource: string;
  features: TGadgetFeatures;
  others: TOthers;
  isDeleted: boolean;
}

type TGadgetFeatures = {
  camera: string;
  storage: string;
  screenSize: number;
};

type TOthers = {
  weight: number;
  dimensions: string;
};



