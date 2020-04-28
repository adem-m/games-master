export class ScoresService {
    j1Score = 0;
    j2Score = 0;
    j1Name = 'Joueur 1';
    j2Name = 'Joueur 2';
    vowels = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U', 'y', 'Y'];
    horsesScore = [0, 0, 0, 0];

    j1ScoreUpdate() {
        this.j1Score++;
    }
    j2ScoreUpdate() {
        this.j2Score++;
    }
    horsesScoreUpdate(i: number) {
        this.horsesScore[i]++;
    }
}
