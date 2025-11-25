class Patient {
    constructor(id, name, age, phone) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
    }
}
//i have defined the schema of the patient

//Logic for the circularQueue
class CircularQueue {
    constructor(size) {
        this.size = size;
        this.queue = new Array(size);
        this.front = -1;
        this.rear = -1;
    }

    isFull() {
        return (this.front === (this.rear + 1) % this.size);
    }

    isEmpty() {
        return this.front === -1;
    }

    enqueue(patient) {
        if (this.isFull()) {
            console.log("Queue is full!");
            return false;
        }
        if (this.isEmpty()) {
            this.front = 0;
        }
        this.rear = (this.rear + 1) % this.size;
        this.queue[this.rear] = patient;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty!");
            return null;
        }

        const removed = this.queue[this.front];
        this.queue[this.front] = null; // Clear slot

        if (this.front === this.rear) {
            // Only one element was present
            this.front = this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }
        return removed;
    }

    getQueue() {
        if (this.isEmpty()) return [];

        let result = [];
        let i = this.front;

        while (true) {
            if (this.queue[i]) result.push(this.queue[i]);
            if (i === this.rear) break;
            i = (i + 1) % this.size;
        }

        return result;
    }
}

module.exports = { CircularQueue, Patient };
