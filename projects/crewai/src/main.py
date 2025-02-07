import argparse
import os
import yaml
from pathlib import Path

from crewai import Agent, Crew, Task
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

# Initialize Groq LLM
llm = ChatGroq(
    model_name="groq/gemma2-9b-it",
    temperature=0.7,
    api_key=os.getenv("GROQ_API_KEY"),
    max_retries=2,
    timeout=10,
)

# Define file paths for YAML configurations
config_path = 'src/config/agents_and_tasks.yaml'
configs = {}

# Load configurations from YAML files
with open(config_path, 'r') as file:
    configs = yaml.safe_load(file)

# Assign loaded configurations to specific variables
agents_config = configs['agents']
tasks_config = configs['tasks']


def create_content(topic):
    researcher = Agent(
        config=agents_config['researcher'],
        llm=llm,
    )

    writer = Agent(
        config=agents_config['writer'],
        llm=llm,
    )

    publisher = Agent(
        config=agents_config['publisher'],
        llm=llm,
    )

    # Define tasks
    research_task = Task(
        config=tasks_config['researching'],
        agent=researcher,
    )

    draft_id = topic.replace(' ', '_')
    draft_path = Path("output/drafts") / f"{draft_id}.md"
    writing_task = Task(
        config=tasks_config['writing'],
        agent=writer,
        output_file=draft_path,
    )

    publishing_task = Task(
        config=tasks_config['publishing'],
        agent=publisher,
    )

    # Create crew
    content_crew = Crew(
        agents=[researcher, writer, publisher],
        tasks=[research_task, writing_task, publishing_task],
        verbose=True,
    )

    # Kick off the crew's work
    result = content_crew.kickoff({
        'topic': topic,
    })
    return draft_id

def publish_content(draft_id):
    draft_path = Path("output/drafts") / f"{draft_id}.md"

    if not draft_path.exists():
        raise FileNotFoundError(f"Draft {draft_id} not found")

    content = draft_path.read_text()

    # TODO: publish!

def main():
    parser = argparse.ArgumentParser(description="AI Content Creation System")
    parser.add_argument("--topic", type=str, help="Topic to research and write about")
    parser.add_argument('--publish', action='store_true', help='Publish the content')
    parser.add_argument('--draft-id', type=str, help='Draft ID to publish')

    args = parser.parse_args()

    if args.topic:
        draft_id = create_content(args.topic)
        print(f"Draft created: {draft_id}")
    elif args.publish and args.draft_id:
        print("Publishing content is not yet implemented.")
        # result = asyncio.run(publish_content(args.draft_id))
        # print(f"Publishing results: {result}")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
