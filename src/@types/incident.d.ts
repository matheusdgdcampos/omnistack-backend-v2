declare type IncidentAttributes = {
  id: string;
  title: string;
  description: string;
  value: number;
  ongId: string;
};

declare type IncidentCreationAttributes = Optional<IncidentAttributes, 'id'>;
