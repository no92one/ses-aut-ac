import { useState } from "react";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");

    const messages = async (prompt, streamEnabled = true) => {
        setIsLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:11434/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama3.2:latest",
                    stream: streamEnabled,
                    prompt: prompt,
                }),
            });

            if (streamEnabled) {
                // Handle streaming response
                const reader = response.body.getReader();
                let fullMessage = "";

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    // Convert the chunk to text
                    const chunk = new TextDecoder().decode(value);
                    const lines = chunk.split('\n').filter(line => line.trim());

                    // Parse each line as JSON
                    for (const line of lines) {
                        const json = JSON.parse(line);
                        fullMessage += json.response;
                        setMessage(fullMessage);
                    }
                }
            } else {
                const data = await response.json();
                setMessage(data.response);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error occurred while generating response");
        } finally {
            setIsLoading(false);
            setPrompt("");
        }
    };

    const handlePrompt = (event) => {
        setPrompt(event.target.value);
    };

    return (
        <div>
            <h1>Chat</h1>
            <input type="text" value={prompt} onChange={handlePrompt} />
            <p>Click the button to generate message</p>
            <button
                onClick={() => messages(prompt, false)}
                disabled={isLoading}
            >
                {isLoading ? "Generating..." : "Generate"}
            </button>
            <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
        </div>
    );
}