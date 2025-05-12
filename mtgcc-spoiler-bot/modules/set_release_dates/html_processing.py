def gather_and_process_set_data( html_to_process ):
    tr_list = html_to_process.find_all('tr')
    set_release_dates_object = []

    for elem in tr_list:
        td_elem = elem.find_all('td')
        set_release_json = ''
        for index, td in enumerate(td_elem):
            text = td.text
            if text:
                if index == 1:
                    set_release_json = f'{text}: '
                    continue
                set_release_json += f'{text}'
        if set_release_json:
            set_release_dates_object.append( set_release_json )

    return set_release_dates_object
