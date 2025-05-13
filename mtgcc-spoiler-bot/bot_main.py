def check_for_new_spoilers():
    from modules.generic.open_url import open_and_read_target_url
    from modules.spoiler_modules.set_file_creation_funcions import check_for_new_set_file
    from modules.spoiler_modules.html_processing import gather_set_data, gather_card_images_urls

    html_to_process = open_and_read_target_url( "https://mythicspoiler.com/" )
    set_name_data = gather_set_data( html_to_process )
    file_exists = check_for_new_set_file( set_name_data )
    card_data_object = gather_card_images_urls( set_name_data, html_to_process )

    if not file_exists:
        print( 'new file created' )

        return set_name_data, card_data_object
    else:
        from modules.spoiler_modules.check_if_exists import check_if_card_exists

        print( 'file exists' )

        set_name_data, data_to_write = check_if_card_exists( set_name_data, card_data_object )

        return set_name_data, data_to_write


def check_for_new_set_release_date():
    from modules.generic.open_url import open_and_read_target_url
    from modules.set_release_dates.html_processing import gather_and_process_set_data
    from modules.set_release_dates.check_if_exists import check_if_set_exists

    html_to_process = open_and_read_target_url( "https://aetherhub.com/Card/Set")
    set_release_dates = gather_and_process_set_data( html_to_process )
    set_release_datas_to_write = check_if_set_exists( set_release_dates )

    return set_release_datas_to_write
