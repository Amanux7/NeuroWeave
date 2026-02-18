from langchain_core.messages import HumanMessage
from ..state import AgentState

def reviewer_node(state: AgentState):
    # Simulated review step
    print("\n[Reviewer] Reviewing code quality...")
    return {
        "messages": [
            HumanMessage(content="Code looks good. Meets all requirements.", name="Reviewer")
        ],
        "sender": "Reviewer"
    }
