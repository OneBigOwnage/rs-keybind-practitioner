import { Injectable } from "@angular/core";
import { ActualTick } from "./ActualTick";
import { PlannedTick } from "./PlannedTick";
import ResultSet from "./ResultSet";

@Injectable({ providedIn: "root" })
export default class Comparator {
  compare(planned: PlannedTick, actual: ActualTick): ResultSet {
    return new ResultSet(planned.ID, [], [], [], []);
  }
}
