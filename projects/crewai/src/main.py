import argparse
import os
import yaml
from pathlib import Path

from crewai import Agent, Crew, Task
from crewai_tools import CSVSearchTool, FileReadTool


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
    max_tokens=8192,
    # rate_limiter=1000,
)

# Define file paths for YAML configurations
# config_path = 'src/config/agents_and_tasks.yaml'
config_path = 'src/config/mass_spec_agents_and_tasks.yaml'
configs = {}

# Load configurations from YAML files
with open(config_path, 'r') as file:
    configs = yaml.safe_load(file)

# Assign loaded configurations to specific variables
agents_config = configs['agents']
tasks_config = configs['tasks']

def analyze_data():
    # Initialize agents
    file_read_tool = FileReadTool(file_path='src/config/combined_protein.csv')
    csv_read_tool = CSVSearchTool(csv='src/config/combined_protein.csv')

    data_analyst = Agent(
        config=agents_config['data-analyst'],
        # llm=llm,
        tools=[file_read_tool, csv_read_tool],
        # max_tokens=12800
    )
    
    mass_spec_expert = Agent(
        config=agents_config['mass-spec-expert'],
        # tools=[file_read_tool],
        # max_tokens=12800
        # llm=llm,
    )
    
    bioinformatician = Agent(
        config=agents_config['bioinformatician'],
        # max_tokens=12800
        # llm=llm,
    )

    # Define tasks
    data_processing_task = Task(
        config=tasks_config['data_processing'],
        agent=data_analyst,
    )

    diff_analysis_task = Task(
        config=tasks_config['differential_analysis'],
        agent=bioinformatician,
        output_file='output/analysis.md'
    )

    # Create crew
    analysis_crew = Crew(
        agents=[data_analyst, mass_spec_expert, bioinformatician],
        tasks=[data_processing_task, diff_analysis_task],
        verbose=True,
    )

    # Kick off the crew's work
    analysis_crew.kickoff({
    })



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
    draft_path = f"output/drafts/{draft_id}.md"
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
    content_crew.kickoff({
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
    parser.add_argument('--analyze', action='store_true',, help='Analyze Data')

    args = parser.parse_args()

    if args.topic:
        draft_id = create_content(args.topic)
        print(f"Draft created: {draft_id}")
    elif args.publish and args.draft_id:
        print("Publishing content is not yet implemented.")
        # result = asyncio.run(publish_content(args.draft_id))
        # print(f"Publishing results: {result}")
    elif args.analyze:
        analyze_data()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
