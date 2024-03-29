import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { SnailComponent } from './snail/snail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SnailComponent, MatButtonModule, MatRadioModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  players = [1,2,3,4]
  selectedPlayer = 0;
  title = 'snailRace';

  raceLength: number = 0;

  current:number = 0;

  isEnd: boolean = false;

  @ViewChild('raceEnd') raceEnd!: ElementRef
  @ViewChild('raceStart') raceStart!: ElementRef

  @ViewChild(SnailComponent,{static:false,read:SnailComponent}) snail!:SnailComponent

  isStart:boolean = false;

  constructor(private cdr:ChangeDetectorRef){}


  ngAfterViewInit() {
    console.log('app after view init');
    const rectEnd = this.raceEnd.nativeElement.getBoundingClientRect();
    const rectStart = this.raceStart.nativeElement.getBoundingClientRect();
    this.raceLength = rectEnd.left - rectStart.right;
    this.cdr.detectChanges()
    console.log(this.raceLength)
  }

  onStart() {
    console.log('strat');
    this.isStart = true;
  }

  onRaceDone(e:any){
   console.log(e+' is done')
   this.isStart = false;
  }




}
