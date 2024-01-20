def summarize_position_prompt(text: str):
    return f"""
Summarize the position provided below in one sentence. Point out all technological skills that are absolutely required for this position and these that are nice to have.
Job position description:
{text}
"""

def summarize_cv_prompt(text: str):
  return f"""
Please read the provided CV text carefully. First, create a concise summary in two sentences that encapsulates the candidate's most recent software development experience and their highest educational achievement. Then, identify and list all the candidate's technical skills, tools, programming languages, technologies, methodologies, operating systems, databases, and language proficiencies. Present these in a bullet-point format, ensuring that each category is addressed separately and all relevant details from the CV are included
The resume document:
'''
{text}
'''
"""
