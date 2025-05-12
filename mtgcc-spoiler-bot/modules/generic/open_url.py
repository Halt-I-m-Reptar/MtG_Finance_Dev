def open_and_read_target_url( url ):
    from bs4 import BeautifulSoup
    import requests

    url_to_open = url
    request_content = requests.get(url_to_open)
    soup = BeautifulSoup(request_content.content, 'html.parser')

    return soup

