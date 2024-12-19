def return_file_path( set_name_data ):
    set_code = set_name_data['set_code']
    set_files_dir = 'set_data'

    return f'./{set_files_dir}/{set_code}.json'


def check_for_new_set_file( set_name_data ):
    from pathlib import Path

    set_file_path = return_file_path( set_name_data )
    file_exists = Path( set_file_path ).exists()

    if not file_exists:
        Path( set_file_path ).touch()

    return file_exists


async def write_card_data_to_file( set_name_data, card_data_object ):
    from pathlib import Path

    set_file_path = return_file_path( set_name_data )

    with Path( set_file_path ).open('a') as file_to_write_to:
        for card_data in card_data_object:
            file_to_write_to.write( f'{card_data}\n' )
