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
    horses: Player[];
    zone: string;
    won: boolean;

    constructor(id, last, current, init, start, startIndex: number, img, cases: Case[], order, zone, horses: Player[]) {
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
        this.horses = horses;
        this.won = false;
        this.cases[this.initPosition].content = img;
    }
    move(num: number) {
        if (this.zone === 'start' && num === 6) {
            this.startMove();
        } else if (this.zone === 'game' && this.limitCheck(num)) {
            this.gameMove(num);
        } else if (this.zone === 'end') {

        }
    }
    private startMove() {
        this.lastPosition = this.currentPosition;
        this.currentPosition = this.startPosition;
        this.lastImg = this.cases[this.currentPosition].content;
        this.zone = 'game';
        this.cases[this.lastPosition].content = '';
        this.cases[this.currentPosition].content = this.img;
    }
    private gameMove(num: number) {
        let destination;
        if (this.order.indexOf(this.currentPosition, 0) + num >= this.order.length) {
            destination = this.order[this.order.indexOf(this.currentPosition, 0) + num - this.order.length];
        } else {
            destination = this.order[this.order.indexOf(this.currentPosition, 0) + num];
        }
        if (this.isItAnEnemy(this.cases[destination].content)) {
            for (const enemy of this.horses) {
                if (enemy.currentPosition === destination) {
                    enemy.back();
                }
            }
        }
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
        if (this.order.indexOf(this.currentPosition, 0) === this.startIndex) {
            this.zone = 'end';
        }
    }
    private back() {
        this.zone = 'start';
        this.lastPosition = this.currentPosition;
        this.currentPosition = this.initPosition;
        this.cases[this.lastPosition].content = this.lastImg;
        this.lastImg = this.cases[this.currentPosition].content;
        this.cases[this.currentPosition].content = this.img;
    }
    private limitCheck(num): boolean {
        let position = this.order.indexOf(this.currentPosition);
        for (let i = 1; i <= num; i++) {
            position++;
            if (position === this.order.length) {
                position = 0;
            }
            if (position === this.startIndex) {
                return false;
            }
        }
        console.log('true');
        return true;
    }
    private isItAnEnemy(img): boolean {
        if (img !== this.img && img !== 'assets/img/empty-case.png' && img !== 'assets/img/red-case.png'
            && img !== 'assets/img/green-case.png' && img !== 'assets/img/yellow-case.png' && img !== 'assets/img/blue-case.png') {
            return true;
        }
        return false;
    }
    private isItAPlayer(img): boolean {
        if (img !== 'assets/img/empty-case.png' && img !== 'assets/img/red-case.png'
            && img !== 'assets/img/green-case.png' && img !== 'assets/img/yellow-case.png' && img !== 'assets/img/blue-case.png') {
            return true;
        }
        return false;
    }
}
