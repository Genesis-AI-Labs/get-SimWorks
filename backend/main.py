from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AgentRequest(BaseModel):
    message: str

@app.post("/api/agent")
async def agent_endpoint(request: AgentRequest):
    # Placeholder: echo the message and return dummy code/simulation
    return {
        "response": f"Agent received: {request.message}",
        "code": "% MATLAB code example\nplot(1:10, sin(1:10));",
        "simulation": "<div>Simulation output placeholder</div>"
    }
