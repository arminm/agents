import argparse
from dotenv import load_dotenv
from pathlib import Path
from crewai import Agent, Crew, Task

load_dotenv()

researcher = Agent(
    role='Researcher',
    goal='Research topics thoroughly and gather accurate information',
    backstory='Expert researcher with experience in gathering and analyzing information from multiple sources'
)
writer = Agent(
    role='Writer',
    goal='Write engaging blog posts based on research',
    backstory='Professional blog writer with expertise in creating compelling content'
)

publisher = Agent(
        role='Publisher',
        goal='Publish content to social media platforms',
        backstory='Social media expert with experience in content distribution',
        # tools=[self.publish_to_linkedin]
        # output_file='blog-posts/new_post.md'
    )

def create_content(topic):
    # Define tasks
    research_task = Task(
        description=f"Research the topic: {topic}. Gather comprehensive information from reliable sources.",
        agent=researcher,
        expected_output="A detailed report on the topic with key insights and references."
    )

    writing_task = Task(
        description="Write an engaging blog post based on the research provided. Include key insights and maintain a professional tone.",
        agent=writer,
        expected_output="A well-written blog post with a clear structure and engaging content."
    )

    publishing_task = Task(
        description="Review and publish the blog post to appropriate social media channels.",
        agent=publisher,
        expected_output="A confirmation of the blog post being published to the social media channels."
    )

    # Create crew
    content_crew = Crew(
        agents=[researcher, writer, publisher],
        tasks=[research_task, writing_task, publishing_task],
        verbose=True
    )

    # Kick off the crew's work
    result = content_crew.kickoff()
    print(result)
    # # Research phase
    # research_data = await researcher.research_topic(topic)
    
    # # Writing phase
    # blog_post = await writer.create_blog_post(research_data)
    
    # # Save draft
    # draft_path = Path('output/drafts') / f"{topic.replace(' ', '_')}.md"
    # draft_path.parent.mkdir(parents=True, exist_ok=True)
    # draft_path.write_text(blog_post)
    
    # return draft_path

def publish_content(draft_id):
    draft_path = Path('output/drafts') / f"{draft_id}.md"
    
    if not draft_path.exists():
        raise FileNotFoundError(f"Draft {draft_id} not found")
    
    content = draft_path.read_text()
    # result = publisher.publish_content(content)
    # return result

def main():
    parser = argparse.ArgumentParser(description='AI Content Creation System')
    parser.add_argument('--topic', type=str, help='Topic to research and write about')
    # parser.add_argument('--publish', action='store_true', help='Publish the content')
    # parser.add_argument('--draft-id', type=str, help='Draft ID to publish')
    
    args = parser.parse_args()

    if args.topic:
        create_content(args.topic)
        # print(f"Draft created: {draft_path}")
    # elif args.publish and args.draft_id:
    #     result = asyncio.run(publish_content(args.draft_id))
    #     print(f"Publishing results: {result}")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
