import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Delay } from "../Delay";
import { GlobalCooldown } from "../GlobalCooldown";

@Injectable({ providedIn: 'root' })
export class GlobalCooldownDataService {

  protected readonly rotationSource = new BehaviorSubject<Array<GlobalCooldown | Delay>>([]);

  readonly rotation$ = this.rotationSource.asObservable();

  get(): Array<GlobalCooldown | Delay> {
    return this.rotationSource.getValue();
  }

  add(item: GlobalCooldown | Delay): void {
    this.set(
      [...this.get(), item]
    );
  }

  update(item: GlobalCooldown | Delay) {
    let newItems = this.get();
    newItems.splice(this.get().findIndex(i => i.id === item.id), 1, item);

    this.set(newItems);
  }

  remove(item: GlobalCooldown | Delay): void {
    this.set(
      this.get().filter(i => i.id !== item.id)
    );
  }

  protected set(gcd: Array<GlobalCooldown | Delay>): void {
    this.rotationSource.next(gcd);
  }
}
