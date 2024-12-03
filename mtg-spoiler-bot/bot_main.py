from modules.time_functions import get_curr_datetime
from modules.open_mythicspoier import open_and_read_target_url
from modules.set_file_creation_funcions import check_for_new_set_file
from modules.html_processing import gather_set_data, gather_card_images_urls

get_curr_datetime()
"""
    TODO:
        remove the comments from the gather_set_data() function so that it reaches out for mythic spoiler data
"""
html_to_process = open_and_read_target_url()
set_name_data = gather_set_data( html_to_process )
file_exists = check_for_new_set_file( set_name_data )
card_data_object = gather_card_images_urls( set_name_data, html_to_process )

if not file_exists:
    from modules.set_file_creation_funcions import write_card_data_to_file

    print( 'new file created' )
    write_card_data_to_file( set_name_data, card_data_object )
    """
        TODO:
            output the card_data_object to discord
    """
else:
    from modules.read_set_file import check_if_card_exists

    print( 'file exists' )
    check_if_card_exists( set_name_data, card_data_object )
    """
        TODO:
            run comparison of found keys/values against existing and identify the new ones
            output to discord
    """

