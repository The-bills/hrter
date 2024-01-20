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

def score_cv_prompt(text: str):
    return f""""
Carefully review the candidate's resume and identify all listed skills. For each skill, based on the commercial  information provided in the resume assign a rating on a scale from 0 to 10. Score should be based on overall practice time.
Examples:
scores from 0 to 2 shold be given if the candidate has no cpommercial experience in the given skill
scores from 3 to 5 should be given if the candidate has 1-5 years of commercial experience in the given skill
scores from 6 to 8 should be given if the candidate has 6-10 years of commercial experience in the given skill
scores from 9 to 10 should be given if the candidate has 10+ years of commercial experience in the given skill

Create an object in JSON format where the key is the skill name and the value is the assigned rating. Example of the object:
On completion, format the extracted data into a JSON object.
CV Content:
```
{text}
```

Example:
{{
  "Python Programming": 8,
  "Project Management": 7,
  "Customer Service": 5,
  "Digital Marketing": 6,
  "Data Analysis": 7,
  "// Add more skills and their ratings"
}}

Ensure that the ratings are objective and reflect the candidate's actual competencies as evident from their resume.
Do not attach full resume on response, only object mentioned above
"""

def score_position_prompt(text: str):
  return f"""
Carefully review the job offer and identify all listed skills required for this position. For each skillassign a rating on a scale from 0 to 10. Score should be based on overall required commercial experience.
Examples:
scores from 0 to 2 shold be given if the job offer has no cpommercial experience in the given skill
scores from 3 to 5 should be given if the job offer has 1-5 years of commercial experience in the given skill
scores from 6 to 8 should be given if the job offer has 6-10 years of commercial experience in the given skill
scores from 9 to 10 should be given if the job offer has 10+ years of commercial experience in the given skill

Create an object in JSON format where the key is the skill name and the value is the assigned rating. Example of the object:
On completion, format the extracted data into a JSON object.
CV Content:
```
{text}
```

Example:
{{
  "Python Programming": 8,
  "Project Management": 7,
  "Customer Service": 5,
  "Digital Marketing": 6,
  "Data Analysis": 7,
  "// Add more skills and their ratings"
}}

Ensure that the ratings are objective and reflect the skill actually required for this position.
Do not attach full job offer on response, only object mentioned above. Do not returin enything but the json object
"""