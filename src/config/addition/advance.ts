export type Entity<TIdentifier extends number | string> = {
    id?: TIdentifier;
};

export interface UseCase<TInput, TOutput> {
    execute(payload?: TInput): Promise<TOutput>;
}

export type Consult<EntityType> = {
    unidades: EntityType[];
    total: number;
    fields?: [
      {
        key: string;
        label: string;
        visible: boolean;
      }?
    ];
  };