import { Injectable } from "@angular/core";
import { Delay } from "../Delay";
import { GlobalCooldown } from "../GlobalCooldown";
import Rotation from "../Rotation";

@Injectable({ providedIn: 'root' })
export class RotationService {

  createRotation(items: Array<GlobalCooldown | Delay>): Rotation {

  }

}
