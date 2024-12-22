def gather_set_data( html_to_process ):
    set_location = 3
    li_list = html_to_process.find_all('li')[set_location]
    set_name = li_list.find('a').text.split()
    set_url = li_list.find('a').attrs.get('href').split('/')
    set_naming_data = { 'set_name': set_name[0].lower(), 'set_code': set_url[0] }

    return set_naming_data


def gather_card_images_urls( set_name_data, html_to_process ):
    card_link_list = html_to_process.find_all('img')
    card_image_object = []
    set_code = set_name_data['set_code']

    for card_image_link in card_link_list:
        link_href = card_image_link.attrs.get('src')
        if f'{set_code}/cards/' in link_href:
            card_image_url = link_href
            card_name = link_href.split('/')[2].split('.')[0]
            card_object = f'{card_name}: {card_image_url}'

            card_image_object.append( card_object )

    return card_image_object
