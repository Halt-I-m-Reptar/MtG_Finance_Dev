def read_in_set_file_data():
    from .set_release_date_funcions import return_file_path

    release_date_file_path = return_file_path()
    release_date_data_from_file = open( f'./{release_date_file_path}' )

    return release_date_data_from_file.read()


def check_if_set_exists( set_release_dates_from_url ) :
    set_data_from_file = read_in_set_file_data()
    data_to_write = []

    for set_release_data in set_release_dates_from_url:
        set_name = set_release_data.split(': ')
        if set_name[0] not in set_data_from_file:
            data_to_write.append( f'{set_name[0]}: {set_name[1]}' )

    return data_to_write
