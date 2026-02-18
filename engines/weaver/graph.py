from langgraph.graph import StateGraph, END
from .state import AgentState
from .supervisor import supervisor_chain, members
from .workers.researcher import researcher_node
from .workers.coder import coder_node
from .workers.reviewer import reviewer_node

# Initialize the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("Researcher", researcher_node)
workflow.add_node("Coder", coder_node)
workflow.add_node("Reviewer", reviewer_node)
workflow.add_node("supervisor", supervisor_chain)

# Add edges
for member in members:
    # After a worker finishes, return to supervisor
    workflow.add_edge(member, "supervisor")

# The supervisor routes to the next worker or finishes
conditional_map = {k: k for k in members}
conditional_map["FINISH"] = END

workflow.add_conditional_edges(
    "supervisor",
    lambda x: x["next"],
    conditional_map,
)

# Entry point
workflow.set_entry_point("supervisor")

graph = workflow.compile()
