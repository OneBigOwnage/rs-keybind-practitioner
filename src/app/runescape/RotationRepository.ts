import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Tick } from "./Tick";

@Injectable({ providedIn: "root" })
export default class RotationRepository {

  public rotation: BehaviorSubject<Tick[]> = new BehaviorSubject<Tick[]>([]);

  constructor() { }


}
