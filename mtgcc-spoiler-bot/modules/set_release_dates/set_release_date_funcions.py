def return_file_path():
    file_name = 'set_release_dates'
    set_files_dir = 'set_release_dates'

    return f'./{set_files_dir}/{file_name}.json'


async def write_set_data_to_file( set_release_dates ):
    from pathlib import Path

    release_date_file_path = return_file_path()

    with Path( release_date_file_path ).open('a') as release_date_file_path:
        for release_date in set_release_dates:
            release_date_file_path.write( f'{release_date}\n' )
