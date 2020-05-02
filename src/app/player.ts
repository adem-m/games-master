import { Case } from './case';
import { ScoresService } from './services/scores.service';

export class Player {
    id: number;
    lastPosition: number;
    currentPosition: number;
    initPosition: number;
    startPosition: number;
    startIndex: number;
    startImg: string;
    lastImg: string;
    img: string;
    cases: Case[];
    order: number[];
    endOrder: number[];
    horses: Player[];
    zone: string;
    won: boolean;
    canFinish = false;

    constructor(id, last, current, init, start, startIndex: number, img, startImg: string, cases: Case[],
        // tslint:disable-next-line: align
        order, endOrder: number[], zone, horses: Player[], private service: ScoresService) {
        this.id = id;
        this.lastPosition = last;
        this.currentPosition = current;
        this.initPosition = init;
        this.startPosition = start;
        this.startIndex = startIndex;
        this.img = img;
        this.startImg = startImg;
        this.cases = cases;
        this.order = order;
        this.endOrder = endOrder;
        this.zone = zone;
        this.horses = horses;
        this.won = false;
        this.cases[this.initPosition].content = img;
    }
    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        if (this.cases[this.startPosition].content !== this.img) {
            if (this.cases[this.startPosition].content !== this.startImg) {
                this.startKill();
            }
            this.lastPosition = this.currentPosition;
            this.currentPosition = this.startPosition;
            this.lastImg = this.cases[this.currentPosition].content;
            this.zone = 'game';
            this.cases[this.lastPosition].content = '';
            this.cases[this.currentPosition].content = this.img;
        }
    }
    private async gameMove(num: number) {
        let direction = 1;
        for (let i = 1; i <= num; i++) {
            await this.delay(300);
            let position;
            if (this.order.indexOf(this.currentPosition) + direction === this.order.length) {
                position = 0;
            } else if (this.order.indexOf(this.currentPosition) + direction === -1) {
                position = this.order.length - 1;
            } else {
                position = this.order.indexOf(this.currentPosition) + direction;
            }
            if (this.isItAPlayer(this.cases[this.order[position]].content) && i !== num) {
                if (direction === 1) {
                    direction = -1;
                } else {
                    direction = 1;
                }
            } else if (i === num && this.isItAPlayer(this.cases[this.order[position]].content) &&
                !this.isItAnEnemy(this.cases[this.order[position]].content)) {
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
            if (i === num) {
                this.enemyCheck(this.currentPosition);
            }
            this.lastImg = this.cases[this.currentPosition].content;
            this.cases[this.currentPosition].content = this.img;
        }
        if (this.order.indexOf(this.currentPosition) > this.startIndex + 6 &&
            this.order.indexOf(this.currentPosition) < this.startIndex + 13) {
            this.canFinish = true;
        }
        if (this.order.indexOf(this.currentPosition) === this.startIndex - 1 && this.canFinish) {
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
        if (this.isItAnEnemy(this.cases[num].content)) {
            for (const enemy of this.horses) {
                if (enemy.currentPosition === num && enemy.img !== this.img) {
                    enemy.back();
                }
            }
        }
    }
    private startKill() {
        for (const enemy of this.horses) {
            if (enemy.currentPosition === this.startPosition) {
                enemy.back();
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
        if (this.canFinish) {
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
        }
        return true;
    }
    private isItAnEnemy(img): boolean {
        if (img === 'assets/img/red-horse.png' || img === 'assets/img/green-horse.png' ||
            img === 'assets/img/yellow-horse.png' || img === 'assets/img/blue-horse.png') {
            if (img !== this.img) {
                return true;
            }
        }
        return false;
    }
    private isItAPlayer(img): boolean {
        if (img === 'assets/img/red-horse.png' || img === 'assets/img/green-horse.png' ||
            img === 'assets/img/yellow-horse.png' || img === 'assets/img/blue-horse.png') {
            return true;
        }
        return false;
    }
    isPlayable(dice: number): boolean {
        if (this.zone === 'start' && dice === 6 && this.cases[this.startPosition].content !== this.img) {
            return true;
        } else if (this.zone === 'game') {
            let position;
            let front;
            let back;
            if (this.order.indexOf(this.currentPosition) === this.order.length) {
                position = 0;
                front = 1;
                back = this.order.length - 1;
            } else if (this.order.indexOf(this.currentPosition) === -1) {
                position = this.order.length - 1;
                front = 0;
                back = position - 1;
            } else {
                position = this.order.indexOf(this.currentPosition);
                front = position + 1;
                back = position - 1;
            }
            if (this.isItAPlayer(this.cases[this.order[front]]) && this.isItAPlayer(this.cases[this.order[back]])) {
                return false;
            }
            return true;
        } else {
            if (this.endOrder.indexOf(this.currentPosition) === dice - 1 && this.cases[this.endOrder[dice]].content !== this.img) {
                return true;
            } else if (this.endOrder.indexOf(this.currentPosition) === 6 && dice === 6) {
                return true;
            }
        }
        return false;
    }
}
