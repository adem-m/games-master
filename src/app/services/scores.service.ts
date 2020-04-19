export class ScoresService {
    j1Score = 0;
    j2Score = 0;
    j1Name;
    j2Name;

    j1ScoreUpdate() {
        this.j1Score++;
    }
    j2ScoreUpdate() {
        this.j2Score++;
    }
}
