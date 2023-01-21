declare type OngAttributes = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  incidents: IncidentAttributes[];
  uf: string;
};

declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
declare type OngCreationAttributes = Optional<
  OngAttributes,
  'id' | 'incidents'
>;
