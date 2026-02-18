import operator
from typing import Annotated, Sequence, TypedDict, Union, List

from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    # The list of messages in the conversation
    messages: Annotated[Sequence[BaseMessage], operator.add]
    # The last agent to act
    sender: str
    # The current objective/task description
    objective: str
    # Context data passed between agents (e.g., code snippets, search results)
    context: dict
