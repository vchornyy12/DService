import {Owner} from "../owner/owner";

export class Device {
  id!: number;
  deviceType!: string;
  model!: string;
  code!: string;
  status!: string;
  owner!: Owner;
}
