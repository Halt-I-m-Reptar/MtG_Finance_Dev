def open_and_read_target_url():
    from bs4 import BeautifulSoup
    import requests

    url_to_open = "https://mythicspoiler.com/"

    r = requests.get(url_to_open)
    soup = BeautifulSoup(r.content, 'html.parser')

    return soup

