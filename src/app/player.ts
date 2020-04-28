import { Case } from './case';
import { ScoresService } from './services/scores.service';

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
    endOrder: number[];
    horses: Player[];
    zone: string;
    won: boolean;

    constructor(id, last, current, init, start, startIndex: number, img, cases: Case[],
                order, endOrder: number[], zone, horses: Player[], private service: ScoresService) {
        this.id = id;
        this.lastPosition = last;
        this.currentPosition = current;
        this.initPosition = init;
        this.startPosition = start;
        this.startIndex = startIndex;
        this.img = img;
        this.cases = cases;
        this.order = order;
        this.endOrder = endOrder;
        this.zone = zone;
        this.horses = horses;
        this.won = false;
        this.cases[this.initPosition].content = img;
    }
    move(num: number) {
        if (!this.won) {
            if (this.zone === 'start' && num === 6) {
                this.startMove();
            } else if (this.zone === 'game' && this.limitCheck(num)) {
                this.gameMove(num);
            } else if (this.zone === 'end') {
                this.endMove(num);
            }
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
        this.enemyCheck(num);
        let direction = 1;
        for (let i = 1; i <= num; i++) {
            let position;
            if (this.order.indexOf(this.currentPosition) + 1 === this.order.length) {
                position = 0;
            } else {
                position = this.order.indexOf(this.currentPosition) + 1;
            }
            if (i !== num && this.isItAPlayer(this.cases[this.order[position]].content)) {
                if (direction === 1) {
                    direction = -1;
                } else {
                    direction = 1;
                }
            }
            this.lastPosition = this.currentPosition;
            this.cases[this.lastPosition].content = this.lastImg;
            if (this.order.indexOf(this.currentPosition) + direction === this.order.length ||
                this.order.indexOf(this.currentPosition) + direction < 0) {
                if (direction === 1) {
                    this.currentPosition = this.order[0];
                } else {
                    this.currentPosition = this.order[this.order.length - 1];
                }
            } else {
                this.currentPosition = this.order[this.order.indexOf(this.currentPosition) + direction];
            }
            this.lastImg = this.cases[this.currentPosition].content;
            this.cases[this.currentPosition].content = this.img;
        }
        if (this.order.indexOf(this.currentPosition) === this.startIndex - 1) {
            this.zone = 'end';
        }
    }
    private endMove(num) {
        this.lastPosition = this.currentPosition;
        this.cases[this.lastPosition].content = this.lastImg;
        if (this.endOrder.indexOf(this.currentPosition) === 6 && num === 6) {
            this.won = true;
            this.cases[this.currentPosition].content = this.lastImg;
            this.currentPosition = 0;
            this.service.horsesScoreUpdate(Math.floor(this.id / 4));
        } else if (this.endOrder.indexOf(this.currentPosition) === num - 1 && this.cases[this.endOrder[num]].content !== this.img) {
            this.currentPosition = this.endOrder[num];
        }
        if (!this.won) {
            this.lastImg = this.cases[this.currentPosition].content;
            this.cases[this.currentPosition].content = this.img;
        }
    }
    private enemyCheck(num) {
        let destination;
        if (this.order.indexOf(this.currentPosition) + num >= this.order.length) {
            destination = this.order[this.order.indexOf(this.currentPosition) + num - this.order.length];
        } else {
            destination = this.order[this.order.indexOf(this.currentPosition) + num];
        }
        if (this.isItAnEnemy(this.cases[destination].content)) {
            for (const enemy of this.horses) {
                if (enemy.currentPosition === destination) {
                    enemy.back();
                }
            }
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
            && img !== 'assets/img/green-case.png' && img !== 'assets/img/yellow-case.png'
            && img !== 'assets/img/blue-case.png' || img === this.cases[this.startIndex].content) {
            return true;
        }
        return false;
    }
}
