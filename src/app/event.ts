/**
 * Created by Comfort Mawkga on 2017/09/28.
 */
import {dataValues} from "./dataValues"

import {coordinate} from "./coordinate"
export class events {
  href: string;
  event: string;
  enrollment: string;
  enrollmentStatus : string;
  attributeCategoryOptions : string;
  lastUpdated : string;
  completedDate : string;
  followup : string;
  deleted: string;
  completedBy: string;
  orgUnitName:string;
  program: string;
  orgUnit: string;
  eventDate: string;
  status:string;
  storedBy: string;
  trackedEntityInstance: string;
  programStage: string;
  dataValues: dataValues[];
  coordinates: coordinate[];
}
