async def return_astral_channel():
    import os

    channel_id = os.getenv('ASTRAL_CHANNEL')

    return int(channel_id)


async def return_channel_list():
    import os

    channel_list_str = os.getenv('CHANNEL_LIST')
    channel_list_arr = list(map(int, channel_list_str.split(',')))

    return channel_list_arr
