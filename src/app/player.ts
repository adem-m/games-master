import { Case } from './case';

export class Player {
    id: number;
    lastPosition: number;
    currentPosition: number;
    initPosition: number;
    startPosition: number;
    startIndex: number;
    lastImg: string;
    img: string;
    cases: Case[];
    order: number[];
    zone: string;
    won: boolean;

    constructor(id, last, current, init, start, startIndex: number, img, cases: Case[], order, zone) {
        this.id = id;
        this.lastPosition = last;
        this.currentPosition = current;
        this.initPosition = init;
        this.startPosition = start;
        this.startIndex = startIndex;
        this.img = img;
        this.cases = cases;
        this.order = order;
        this.zone = zone;
        this.won = false;
        this.cases[this.initPosition].content = img;
    }
    move(num: number) {
        if (this.zone === 'start' && num === 6) {
            this.lastPosition = this.currentPosition;
            this.currentPosition = this.startPosition;
            this.lastImg = this.cases[this.currentPosition].content;
            this.zone = 'game';
            this.cases[this.lastPosition].content = '';
            this.cases[this.currentPosition].content = this.img;
        } else if (this.zone === 'game') {
            for (let i = 1; i <= num; i++) {
                this.lastPosition = this.currentPosition;
                this.cases[this.lastPosition].content = this.lastImg;
                if (this.order.indexOf(this.currentPosition, 0) + 1 === this.order.length) {
                    this.currentPosition = this.order[0];
                } else {
                    this.currentPosition = this.order[this.order.indexOf(this.currentPosition, 0) + 1];
                }
                this.lastImg = this.cases[this.currentPosition].content;
                this.cases[this.currentPosition].content = this.img;
            }
        }
    }
}
