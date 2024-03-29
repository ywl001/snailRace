import { ChangeDetectorRef, Component, ElementRef, EventEmitter, input, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snail',
  standalone: true,
  imports: [],
  templateUrl: './snail.component.html',
  styleUrl: './snail.component.scss'
})
export class SnailComponent {

  @ViewChild('root', { static: false }) rootDiv!: ElementRef;

  private _x = 0;
  public get x() {
    return this._x;
  }

  @Input()
  public set x(value) {
    this._x = value;
    this.cdr.markForCheck()
  }

  width: number = 0;

  @Input()
  raceLength: number = 0;

  private _isStart: boolean = false;
  public get isStart(): boolean {
    return this._isStart;
  }

  @Input()
  public set isStart(value: boolean) {
    this._isStart = value;
    // this.x = 0;
    if (this.isStart) {
      this.x = 0;
      this.race()
    } else {

    }
  }

  @Input()
  name = '1'

  @Output() isDone: EventEmitter<any> = new EventEmitter()

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) { }

  ngAfterViewInit() {
    console.log('snail init')
    this.width = this.rootDiv.nativeElement.clientWidth
  }


  private race() {
    if (!this.isStart) {
      console.log('ok')
    } else {
      setTimeout(() => {
        this.x += this.getRandomNumInt(0, 10);
        if (this.x + this.width >= this.raceLength) {
          this.x = this.raceLength - this.width
          this.isDone.emit(this.name)
        }
        this.race();
      }, 10);
    }
  }

  private getRandomNumInt(min: number, max: number) {
    var Range = max - min;
    var Rand = Math.random(); //获取[0-1）的随机数
    return (min + Rand * Range); //放大取整
  }

}
