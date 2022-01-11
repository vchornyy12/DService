import {Owner} from "../owner/owner";

export class Device {
  id: number | undefined;
  deviceType: string| undefined;
  model: string | undefined;
  code: string | undefined;
  status: string| undefined;
  owner!: Owner;
}
