import argparse
import subprocess
import platform
import os
import sys
from pathlib import Path

# Configuration
SERVICES = [
    {
        "name": "Gemini-UI",
        "path": "apps/gemini-ui",
        "install": "npm install",
        "start": "npm run dev",
        "port": 3000
    },
    {
        "name": "Weaver Engine",
        "path": "engines/weaver",
        "install": "pip install -r requirements.txt",
        "start": "python main.py",
        "port": 8000
    },
    {
        "name": "Drift-Guard",
        "path": "engines/drift-guard",
        "install": "pip install -r requirements.txt",
        "start": "python main.py",
        "port": 8001
    },
    {
        "name": "Context-Bridge",
        "path": "engines/context-bridge",
        "install": "pip install -r requirements.txt",
        "start": "python main.py",
        "port": 8002
    }
]

def run_command(command, cwd):
    """Run a command in the specified directory."""
    print(f"[{cwd}] Running: {command}")
    try:
        subprocess.check_call(command, shell=True, cwd=cwd)
    except subprocess.CalledProcessError as e:
        print(f"Error running command '{command}' in '{cwd}': {e}")
        sys.exit(1)

def install_dependencies():
    """Install dependencies for all services."""
    print("📦 Installing dependencies for all services...")
    for service in SERVICES:
        print(f"\n--- {service['name']} ---")
        run_command(service["install"], service["path"])
    print("\n✅ All dependencies installed successfully!")

def start_services():
    """Start all services in separate terminal windows."""
    print("🚀 Starting all services...")
    
    current_os = platform.system()
    base_dir = Path(__file__).parent.absolute()

    for service in SERVICES:
        service_path = base_dir / service["path"]
        command = service["start"]
        title = service["name"]
        
        print(f"Starting {title} in {service_path}...")

        if current_os == "Windows":
            # Start in a new command prompt window
            # /k keeps the window open even if the command fails/exits
            full_command = f'start "{title}" cmd /k "cd /d {service_path} && {command}"'
            subprocess.Popen(full_command, shell=True)
        elif current_os == "Darwin": # macOS
            # Use osascript to tell Terminal to open a new tab/window
            script = f'''
                tell application "Terminal"
                    do script "cd '{service_path}' && {command}"
                end tell
            '''
            subprocess.Popen(["osascript", "-e", script])
        elif current_os == "Linux":
            # Try common terminal emulators
            terminals = ["gnome-terminal", "x-terminal-emulator", "xterm"]
            started = False
            for term in terminals:
                try:
                    # gnome-terminal specific syntax
                    if term == "gnome-terminal":
                        subprocess.Popen([term, "--", "bash", "-c", f"cd '{service_path}'; {command}; exec bash"])
                    else:
                        subprocess.Popen([term, "-e", f"bash -c \"cd '{service_path}'; {command}; exec bash\""])
                    started = True
                    break
                except FileNotFoundError:
                    continue
            
            if not started:
                print(f"⚠️  Could not find a supported terminal emulator to start {title}.")

    print("\n✨ All services launched! Check the new terminal windows.")

def main():
    parser = argparse.ArgumentParser(description="NeuroWeave Unified CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Install command
    subparsers.add_parser("install", help="Install dependencies for all modules")

    # Start command
    subparsers.add_parser("start", help="Start all services in new windows")

    # Check command
    subparsers.add_parser("check", help="Check prerequisites")

    args = parser.parse_args()

    if args.command == "install":
        install_dependencies()
    elif args.command == "start":
        start_services()
    elif args.command == "check":
        print("🔍 Checking system prerequisites...")
        print(f"OS: {platform.system()} {platform.release()}")
        print(f"Python: {sys.version.split()[0]}")
        try:
            subprocess.check_call(["node", "--version"], shell=True)
        except:
            print("❌ Node.js not found!")
        try:
            subprocess.check_call(["npm", "--version"], shell=True)
        except:
            print("❌ npm not found!")
        print("✅ Check complete.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
