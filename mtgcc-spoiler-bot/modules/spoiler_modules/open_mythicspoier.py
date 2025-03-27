def open_and_read_target_url():
    from bs4 import BeautifulSoup
    import requests

    url_to_open = "https://mythicspoiler.com/"
    request_content = requests.get(url_to_open)
    soup = BeautifulSoup(request_content.content, 'html.parser')

    return soup

