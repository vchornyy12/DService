import { Device } from "../device/device";

export class Owner {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  devices!: Device[];

}
