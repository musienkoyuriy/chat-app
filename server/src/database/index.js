class InMemoryDatabase {
    static _dbInstance;

    userNames = [
        "Josh",
        "Bob",
        "Andre",
        "Andreas",
        "Aaron",
        "Jack",
        "Mike",
    ]

    constructor() {
        this.messages = []
        this.users = []
    }

    generateName() {
        const name = this.userNames[Math.floor(Math.random() * this.userNames.length)]
        const userExists = this.users.find(user => user.userName == name)

        if (userExists) {
            console.log("user already exists")
            console.log(this.users)
        }

        return userExists ? this.generateName() : name
    }

    generateID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    static get Instance() {
        return this._dbInstance || (this._dbInstance = new this());
    }

    addMessage({ messageText, userID }) {
        console.log(messageText)
        console.log(userID)
        const user = this.users.find(user => user.id == userID)
        const newMessage = {
            id: this.generateID(),
            messageText,
            userName: user.userName,
            userID,
            time: new Date()
        }
        this.messages.push(newMessage)

        return newMessage
    }

    newUser(id) {
        const user = {
            id,
            userName: this.generateName(),
            active: true
        }
        this.users.push(user)

        return user
    }

    unconnectUser(userID) {
        const unconnectedUserIndex = this.users.findIndex(user => user.id === userID);
        this.users.splice(unconnectedUserIndex, 1)
    }

    receiveMessages() {
        return this.messages
    }

}

module.exports.inMemoryDatabase = InMemoryDatabase.Instance;