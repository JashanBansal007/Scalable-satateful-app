import {test,describe} from "bun:test"

const BACKEND_URL = "ws://localhost:8080";

describe ("Chat Application", () => {
    test("Message sent in room 1 reaches all users in room 1",async () => {
        const ws1 = new WebSocket(BACKEND_URL);
        const ws2 = new WebSocket(BACKEND_URL);

        //make sure sockets are connected 

        
        

        await new Promise<void>((resolve,reject) => {
            let count = 1;

            ws1.onopen = () => {
                count = count + 1;
                if (count === 2) {
                    resolve();
                }
            
        }
        ws2.onopen =() => {
             count = count + 1;
                if (count === 2) {
                    resolve();
                }
        }
        })

        ws1.send(JSON.stringify({
            type: "join-room",
            room: "room1"
        }))
        ws2.send(JSON.stringify({
            type: "join-room",
            room: "room1"
        }))
        ws1.send(JSON.stringify({
            type: "chat",
            room: "room1",
            message: "Hello from ws1"
        }))


    })
})