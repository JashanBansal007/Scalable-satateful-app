import {test,describe, expect} from "bun:test"

const BACKEND_URL = "ws://localhost:8080";

describe ("Chat Application", () => {
    test("Message sent in room 1 reaches all users in room 1",async () => {
        const ws1 = new WebSocket(BACKEND_URL);
        const ws2 = new WebSocket(BACKEND_URL);

        //make sure sockets are connected 

        
        

        await new Promise<void>((resolve,reject) => {
            let count = 0;

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

        await new Promise<void>((resolve) => {
             ws2.onmessage = ({data}) => {
            const parsedData = JSON.parse(data);
            expect(parsedData.type == "chat")
            expect(parsedData.message == "HI there")
            
        }

        ws1.send(JSON.stringify({
            type: "chat",
            room: "room1",
            message: "Hello from ws1"
        }))
        })

       
        


    })
})