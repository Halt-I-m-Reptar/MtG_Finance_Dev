def read_in_set_file_data( set_name_data ):
    from pathlib import Path
    from .set_file_creation_funcions import return_file_path
    import yaml

    set_file_path = return_file_path( set_name_data )

    with Path( f'./{set_file_path}' ).open('r') as file_to_read:
        set_data_from_file = yaml.safe_load(file_to_read)

    return set_data_from_file


def check_if_card_exists( set_name_data, cards_to_check_list ):
    set_data_from_file = read_in_set_file_data( set_name_data )
    data_to_write = []

    for card_to_check in cards_to_check_list:
        cards_data_cleaned = card_to_check.split(': ')
        is_card_in_file = cards_data_cleaned[0] in set_data_from_file
        if not is_card_in_file:
            data_to_write.append( f'{cards_data_cleaned[0]}: {cards_data_cleaned[1]}' )

    if len(data_to_write):
        print( 'writing out cards' )
        return set_name_data, data_to_write

    return False, False
