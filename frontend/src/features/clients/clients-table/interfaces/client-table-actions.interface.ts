import { Client } from "@entities/client/model/client.model";

export interface ITableActions {
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
}
