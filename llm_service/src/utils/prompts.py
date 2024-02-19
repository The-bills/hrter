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
  return f"""
Carefully review the candidate's resume and identify all listed skills. For each skill, based on the commercial information provided in the resume, assign a rating on a scale from 0 to 10. The score should be based on the overall practice time.
- Scores from 0 to 2 should be given if the candidate has no commercial experience in the given skill.
- Scores from 3 to 5 should be given if the candidate has 1-5 years of commercial experience in the given skill.
- Scores from 6 to 8 should be given if the candidate has 6-10 years of commercial experience in the given skill.
- Scores from 9 to 10 should be given if the candidate has more than 10 years of commercial experience in the given skill.

Example of how to format the extracted data into a JSON object:
'{{"Python Programming": 8, "Project Management": 7, "Customer Service": 5, "Digital Marketing": 6, "Data Analysis": 7}}'

Cv content:
```
{text}
```
Note: Ensure that the ratings are objective and reflect the candidate's actual competencies as evident from their resume. Attach only the scoring ratings in the JSON format as shown above.
"""

def score_position_prompt(text: str):
  return f"""
Carefully review the job offer and identify all listed skills required for this position. For each skillassign a rating on a scale from 0 to 10. Score should be based on overall required commercial experience.
Examples:
scores from 0 to 2 shold be given if the job offer has no cpommercial experience in the given skill
scores from 3 to 5 should be given if the job offer has 1-5 years of commercial experience in the given skill
scores from 6 to 8 should be given if the job offer has 6-10 years of commercial experience in the given skill
scores from 9 to 10 should be given if the job offer has 10+ years of commercial experience in the given skill

Example of how to format the extracted data into a JSON object:
'{{"Python Programming": 8, "Project Management": 7, "Customer Service": 5, "Digital Marketing": 6, "Data Analysis": 7}}'

Cv content:
```
{text}
```

Note: Ensure that the ratings are objective and reflect the candidate's actual competencies as evident from their resume. Attach only the scoring ratings in the JSON format as shown above.
"""

def get_position_summarize_query(text: str):
    return f"""
    Which of the candidates will be the best for the job offer presented below? Match the CV to the job offer, based on the given informations in the position summary and answer the following question:
    Which candidate is the best fit for the given position?
    Return an array of the names of potential candidates with a short reason why along with "doc_id" of the resume.
    Example response:
    ```
    [
      {{"name": "First Candidate", "reason": "Some reason", "doc_id": "some_doc_id"}},
      {{"name": "Second Candidate", "reason": "Some other reason", "doc_id": "some_other_doc_id"}},
    ]
    ```

    Position summary:
    ```
    {text}
    ```
"""