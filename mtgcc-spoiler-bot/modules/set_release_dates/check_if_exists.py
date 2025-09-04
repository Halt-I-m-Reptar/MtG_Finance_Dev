def read_in_set_file_data():
    from .set_release_date_funcions import return_file_path

    release_date_file_path = return_file_path()
    release_date_data_from_file = open( f'./{release_date_file_path}' )

    return release_date_data_from_file.read()


def check_if_set_exists( set_release_dates_from_url ):
    set_data_from_file = read_in_set_file_data()
    data_to_write = []

    for set_release_data in set_release_dates_from_url:
        set_name_raw = set_release_data.split(': ')

        set_name = return_clean_set_name( set_name_raw )
        set_date = set_name_raw[-1:][0]

        if set_name not in set_data_from_file:
            data_to_write.append( f'{set_name}: {set_date}' )

    return data_to_write


#Did not account for sets that use a colon in the name and now need to merge the name parts back together
def return_clean_set_name( set_name_raw ):
    set_name_clean = clean_set_name(set_name_raw[0])

    if len(set_name_raw) > 2:
        set_name_clean = clean_set_name ( merge_names( set_name_raw ) )

    return set_name_clean


def merge_names( set_name_parts ):
    return ': '.join(set_name_parts[:-1])


def clean_set_name( set_name ):
    # In time this might need to be more robust
    import re

    return re.sub("×", "x", set_name.encode("utf-8").decode("utf-8"))
