import {Attributes} from "./attributes"
import {Enrollments} from "./enrollments"

export class TrackedEntityInstances {
  trackedEntity: string;
  orgUnit: string;
  attributes: Attributes[];
  enrollments: Enrollments[];
}
