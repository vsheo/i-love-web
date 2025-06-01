import markdown
from markdown.treeprocessors import Treeprocessor
from markdown.extensions import Extension
from bs4 import BeautifulSoup
import json

# Markdown naar JSON converteren
def markdown_to_json(markdown_text):
    html = markdown.markdown(markdown_text)
    soup = BeautifulSoup(html, 'html.parser')
    
    def parse_element(element):
        if element.name == 'h1' or element.name == 'h2' or element.name == 'h3':  # Headers
            return {
                "type": "paragraph",
                "header": element.text,
                "text": []
            }
        elif element.name == 'p':  # Paragraaf
            return {
                "type": "paragraph",
                "header": "",
                "text": [element.text]
            }
        elif element.name == 'ul':  # Lijst
            items = []
            for li in element.find_all('li'):
                items.append({
                    "text": li.text
                })
            return {
                "type": "puntenlijst",
                "header": "",
                "text": items
            }
        elif element.name == 'a':  # Link
            return {
                "text": element.text,
                "href": element.get('href')
            }
        return {}

    # Start met de inhoud van de HTML
    content = []
    
    for el in soup.find_all(['h1', 'h2', 'h3', 'p', 'ul']):
        if el.name == 'ul':
            content.append(parse_element(el))
        else:
            content.append(parse_element(el))

    return json.dumps({
        "data": [
            {
                "slug": "sprint-1",
                "semesterClass": "semester-1-midterm",
                "articles": [
                    {
                        "sprint": "a-inline",
                        "title": "test",
                        "date": "4/9/24",
                        "content": content
                    }
                ]
            }
        ]
    }, indent=4)

# Voorbeeld Markdown tekst
markdown_text = """
# Wat heb ik vandaag gedaan?

Vandaag heb ik een breakdown schets gemaakt. Dat is een schets van de website die ik wil bouwen, met daarin elementen die ik zou kunnen gebruiken.

## Wat wil ik nog uitzoeken:

- Als ik hover over tekst wil ik een pop-up laten verschijnen. In die pop-up wil ik uitleggen hoe ik de programmeertaal heb geleerd.
- Ik wil nog werken aan de layout van de pagina.

[Link naar mijn project](https://www.google.com/)

## Wat heb ik nog niet gedaan?

- Prototype omzetten naar HTML.
- One column layout maken.
"""

# Oproep van de functie
json_result = markdown_to_json(markdown_text)
print(json_result)
