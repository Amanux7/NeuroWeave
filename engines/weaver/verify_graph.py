import sys
import os

# Add the project root to the python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.append(project_root)

from dotenv import load_dotenv
load_dotenv()

try:
    from engines.weaver.graph import graph
    print("SUCCESS: LangGraph compiled successfully.")
    print(f"Graph nodes: {graph.nodes.keys()}")
except Exception as e:
    print(f"FAILURE: {e}")
    sys.exit(1)
