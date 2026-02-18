from langchain_core.messages import HumanMessage
from ..state import AgentState

def researcher_node(state: AgentState):
    # In a real implementation, this would call Tavily/Exa
    # For now, we simulate a research step
    print("\n[Researcher] Searching for information...")
    return {
        "messages": [
            HumanMessage(content="Found relevant documentation on the requested topic.", name="Researcher")
        ],
        "sender": "Researcher"
    }
