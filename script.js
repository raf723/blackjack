class Card {
    constructor(rank, suit) {
        this.rank = rank
        this.suit = suit
    }

    toString() {
        return `${this.rank}${this.suit}`
    }

    // Card image api requires 10 to be passed as 0 e.g. 0D represents 10D
    toApi() {
        return (this.rank == 10) ? `0${this.suit}`: `${this.rank}${this.suit}`
    }

    getSuit() {
        return this.toString().substr(-1)
    }

    get points() {
        return { A: 11, J: 10, Q: 10, K: 10 }[this.rank] || parseInt(this.rank, 10)
    }
}

class Hand {
    constructor(cards) {
        if (!cards.every((card) => card instanceof Card)) {
            throw new TypeError('A Hand can only contain Cards')
        }

        this.cards = cards
    }

    get points() {
        if (this.cards.length == 2 && this.cards[0].rank == 'A' && this.cards[1].rank == 'A') return 21
        return this.cards.reduce((sum, card) => sum += card.points, 0)
    }
}

class Deck {
    constructor() {
        this.cards = []
        for (let suit of ['S', 'D', 'C', 'H']) {
            for (let rank of ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']) {
                this.cards.push(new Card(rank, suit))
            }
        }
    }

    draw() {
        return this.cards.shift()
    }

    shuffle() {
        this.cards = shuffle(this.cards, Date.now())
    }
}
