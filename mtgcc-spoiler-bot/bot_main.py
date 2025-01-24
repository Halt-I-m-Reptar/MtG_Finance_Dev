from modules.open_mythicspoier import open_and_read_target_url
from modules.set_file_creation_funcions import check_for_new_set_file
from modules.html_processing import gather_set_data, gather_card_images_urls


def bot_main():

    html_to_process = open_and_read_target_url()
    set_name_data = gather_set_data( html_to_process )
    file_exists = check_for_new_set_file( set_name_data )
    card_data_object = gather_card_images_urls( set_name_data, html_to_process )

    if not file_exists:
        print( 'new file created' )

        return  set_name_data, card_data_object
    else:
        from modules.read_set_file import check_if_card_exists

        print( 'file exists' )

        set_name_data, data_to_write = check_if_card_exists( set_name_data, card_data_object )

        return set_name_data, data_to_write
