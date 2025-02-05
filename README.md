# Monorepo

This is a monorepo containing multiple projects. Each project is managed independently with its own dependencies using `uv`.

## Prerequisites

- Python 3.12
- [uv](https://github.com/astral-sh/uv) - Fast Python package installer and resolver

## Structure

```
.
└── projects/
   ├── .env                 # Environment variables (not tracked)
   ├── crewai/              # CrewAI related projects
   │   ├── src/             # Source code
   │   │   └── main.py      # Main application
   │   ├── pyproject.toml   # Project configuration
   └── [other-projects]/    # Future projects
      ├── src/
      ├── pyproject.toml
        
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. Navigate to your desired project:
   ```bash
   cd projects/[project-name]
   ```

3. Create a virtual environment and activate it:
   ```bash
   uv venv
   source .venv/bin/activate  # On Unix/macOS
   # or
   .venv\Scripts\activate     # On Windows
   ```

4. Install dependencies:
   ```bash
   uv pip install .
   ```

## Adding New Dependencies

To add a new dependency to a project:

1. Make sure you're in the project directory and virtual environment is activated
2. Install the package:
   ```bash
   uv pip install package_name
   ```
3. Update the dependency files:
   ```bash
   uv pip compile --upgrade requirements.txt pyproject.toml
   ```

## Creating a New Project

1. Create a new directory under `projects/`:
   ```bash
   mkdir projects/new-project
   cd projects/new-project
   ```

2. Initialize a new Python project:
   ```bash
   # Create basic project structure
   mkdir src
   touch src/__init__.py
   touch README.md
   ```

3. Create a pyproject.toml:
   ```toml
   [project]
   name = "your-project-name"
   version = "0.1.0"
   description = "Your project description"
   requires-python = ">=3.8"

   [build-system]
   requires = ["hatchling"]
   build-backend = "hatchling.build"
   ```

4. Set up the virtual environment and install initial dependencies:
   ```bash
   uv venv
   source .venv/bin/activate  # On Unix/macOS
   # or
   .venv\Scripts\activate     # On Windows
   ```

5. Create initial requirements files:
   ```bash
   uv pip compile --generate-hashes requirements.txt pyproject.toml
   ```

## Code Style

We use [Ruff](https://github.com/astral-sh/ruff) for code formatting and linting. Ruff is an extremely fast Python linter and formatter written in Rust.

You can run Ruff from the project directory:
```bash
# Format code
ruff format .

# Run linter and auto-fix issues
ruff check . --fix
```