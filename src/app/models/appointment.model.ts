import {User} from "../core/user/user.types";
import {IHospital} from "./hospitals.model";

export interface IAppointment {
  id: number;
  doctor: User;
  user: User;
  hospital: IHospital;
  date: Date;
  is_approved: boolean;
}
