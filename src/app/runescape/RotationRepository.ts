import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PlannedTick } from "./PlannedTick";

@Injectable({ providedIn: "root" })
export default class RotationRepository {

  public rotation: BehaviorSubject<PlannedTick[]> = new BehaviorSubject<PlannedTick[]>([]);

  constructor() { }


}
