from fastapi import FastAPI
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Context-Bridge (Module D) connecting to Vector DB...")
    yield
    print("Context-Bridge disconnecting...")

app = FastAPI(title="Context-Bridge Engine", version="0.1.0", lifespan=lifespan)

@app.get("/")
async def root():
    return {"module": "context-bridge", "status": "online", "role": "memory-mcp"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/search")
async def search(q: str):
    # Mock vector search for MVP
    import random
    
    results = [
        {"id": f"vec_{random.randint(1000,9999)}", "text": f"Found relevant context for: '{q}' regarding architecture patterns.", "score": 0.95, "type": "doc"},
        {"id": f"vec_{random.randint(1000,9999)}", "text": f"Memory fragment: User prefers dark mode interfaces.", "score": 0.88, "type": "memory"},
        {"id": f"vec_{random.randint(1000,9999)}", "text": f"System log: Previous deployment to production successful.", "score": 0.76, "type": "log"},
        {"id": f"vec_{random.randint(1000,9999)}", "text": f"Code reference: See 'main.py' lines 45-60 for implementation details.", "score": 0.65, "type": "code"},
    ]
    return {"results": results}
