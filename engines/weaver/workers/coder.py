from langchain_core.messages import HumanMessage
from ..state import AgentState

def coder_node(state: AgentState):
    # Simulated coding step
    print("\n[Coder] Generating code...")
    return {
        "messages": [
            HumanMessage(content="Generated the requested Python script.", name="Coder")
        ],
        "sender": "Coder"
    }
